import { Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Flex, Heading} from '@chakra-ui/react';
const CardsListPage = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cards`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setCards(data);
    };
    fetchCards();
  }, [cards]);
  return (
    <Container maxW={['100%', '100%', '70%']} h="full" p={4}>
        <h1 className='title'>Liste des fiches</h1>
        {/* centre les item de la div avec des espacement */}
        <Flex flexDir="column" justifyContent="center" alignItems="center" gap={8}>
          {cards.map((card) => (
            <Flex key={card.id}  flexDir="column" justifyContent="start" alignItems="start" gap={2}>
              <h2>Fiche : {card.id}</h2>
              <p>Question : {card.question}</p>
              <p>Answer : {card.answer}</p>
              <p>Tag : {card.tag}</p>
              <p>Category : {card.category}</p>
            </Flex>
          ))}
        </Flex>
    </Container>
  );
};

export default CardsListPage;