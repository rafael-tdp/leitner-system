import { Button, FormControl, FormErrorMessage, FormLabel, Input, Box, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const CardQuizzPage = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cards/quizz`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        // supprimer les cartes qui sont null 
        const dataFiltered = data.filter((card) => card !== null);
        setCards(dataFiltered);
      } catch (error) {
        alert('Erreur lors de la récupération des cartes');
        console.error('Erreur lors de la récupération des cartes', error);
      }
    };

    fetchCards();
  }, []);
  console.log(cards);
  const onSubmit = async (data) => {
    const currentCard = cards[currentIndex];
    const answer =  await (await fetch(`${import.meta.env.VITE_BACKEND_URL}/cards/${currentCard.id}/answer`, {
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
      const result = confirm('Voulez-vous comme même valider la réponse ?');
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

  const currentCard = cards[currentIndex];

  return (
    <Box maxW="md" mx="auto" mt={5} p={5} borderWidth={1} borderRadius="lg">
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
      ): <Heading>Pas de quiz pour le moment</Heading>}
    </Box>
  );
};

export default CardQuizzPage;