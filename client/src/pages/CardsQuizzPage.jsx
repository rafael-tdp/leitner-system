import { Button, FormControl, FormErrorMessage, FormLabel, Input, Box, Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const CardQuizzPage = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizDate, setQuizDate] = useState('');
  const [isTodayQuiz, setIsTodayQuiz] = useState(true);
  const [quizSelected, setQuizSelected] = useState(false);
  const [dateValidated, setDateValidated] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (quizSelected && (isTodayQuiz || dateValidated)) {
      const fetchCards = async () => {
        try {
          let url = `${import.meta.env.VITE_BACKEND_URL}/cards/quizz`;
          if (!isTodayQuiz && quizDate) {
            url += `?date=${quizDate}`;
          }

          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          console.log(data);
          const dataFiltered = data.filter((card) => card !== null);
          setCards(dataFiltered);
        } catch (error) {
          alert('Erreur lors de la récupération des cartes');
          console.error('Erreur lors de la récupération des cartes', error);
        }
      };

      fetchCards();
    }
  }, [quizSelected, isTodayQuiz, quizDate, dateValidated]);

  const onSubmit = async (data) => {
    const currentCard = cards[currentIndex];
    const answer = await (await fetch(`${import.meta.env.VITE_BACKEND_URL}/cards/${currentCard.id}/answer`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })).json();

    if (answer.isValid) {
      alert('Bonne réponse !');
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        reset();
      } else {
        alert('Vous avez terminé tout le quiz du jour !');
        window.location.href = '/cards';
      }
    } else {
      alert('Mauvaise réponse la bonne réponse était : ' + currentCard.answer + ' réponse donnée : ' + data.answer);
      const result = confirm('Voulez-vous quand même valider la réponse ?');
      if (result) {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/cards/${currentCard.id}/answer`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentCard),
        });
      }
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        reset();
      } else {
        alert('Vous avez terminé tout le quiz du jour !');
        window.location.href = '/cards';
      }
    }
  };

  const handleTodayQuiz = () => {
    setIsTodayQuiz(true);
    setQuizSelected(true);
    setCurrentIndex(0);
    setCards([]);
  };

  const handleOtherDayQuiz = () => {
    setIsTodayQuiz(false);
    setQuizSelected(true);
    setDateValidated(false);
    setCurrentIndex(0);
    setCards([]);
  };

  const handleDateValidation = () => {
    setDateValidated(true);
  };

  const currentCard = cards[currentIndex];

  return (
    <Box maxW="md" mx="auto" mt={5} p={5} borderWidth={1} borderRadius="lg">
      {!quizSelected ? (
        <VStack spacing={4}>
          <Button colorScheme="blue" onClick={handleTodayQuiz}>
            Quiz d'aujourd'hui
          </Button>
          <Button colorScheme="teal" onClick={handleOtherDayQuiz}>
            Quiz d'un autre jour
          </Button>
        </VStack>
      ) : (
        <>
          {!isTodayQuiz && (
            <VStack spacing={4}>
              <FormControl mb={4}>
                <FormLabel>Date du quiz</FormLabel>
                <Input
                  type='date'
                  value={quizDate}
                  onChange={(e) => setQuizDate(e.target.value)}
                />
              </FormControl>
              <Button colorScheme="teal" onClick={handleDateValidation}>
                Valider la date
              </Button>
            </VStack>
          )}
          {cards === null || cards === undefined ? (
            <Text>Chargement...</Text>
          ) : cards.length > 0 ? (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.answer} mb={4}>
                  <FormLabel>{currentCard.question}</FormLabel>
                  <Input
                    type='text'
                    placeholder='Entrez votre réponse'
                    {...register('answer', { required: 'La réponse est obligatoire' })}
                  />
                  <FormErrorMessage>
                    {errors.answer && errors.answer.message}
                  </FormErrorMessage>
                </FormControl>
                <Button mt={4} colorScheme="blue" type="submit">
                  Valider
                </Button>
              </form>
            </>
          ) : (
            <Heading>Pas de quiz pour le moment</Heading>
          )}
        </>
      )}
    </Box>
  );
};

export default CardQuizzPage;
