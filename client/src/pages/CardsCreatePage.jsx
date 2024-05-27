import { FormControl, FormLabel, Input, Button, Box, FormErrorMessage } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const CardsCreatePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await fetch(import.meta.env.VITE_BACKEND_URL + '/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() => {
      alert('Carte créée avec succès');
      window.location.href = '/cards';
    }).catch((error) => {
      alert('Erreur lors de la création de la carte');
      window.location.href = '/cards'
      console.error(error);
    });
    
  };
  return (
    <Box maxW="md" mx="auto" mt={5} p={5} borderWidth={1} borderRadius="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.question} mb={4}>
          <FormLabel>Question</FormLabel>
          <Input
            type='text'
            placeholder='Entrez votre question'
            {...register('question', { required: 'La question est obligatoire' })}
          />
          <FormErrorMessage>
            {errors.question && errors.question.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.answer} mb={4}>
          <FormLabel>Réponse</FormLabel>
          <Input
            type='text'
            placeholder='Entrez votre réponse'
            {...register('answer', { required: 'La réponse est obligatoire' })}
          />
          <FormErrorMessage>
            {errors.answer && errors.answer.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.tag} mb={4}>
          <FormLabel>Tag</FormLabel>
          <Input
            type='text'
            placeholder='Entrez votre tag'
            {...register('tag')}
          />
          <FormErrorMessage>
            {errors.tag && errors.tag.message}
          </FormErrorMessage>
        </FormControl>

        <Button mt={4} colorScheme="blue" type="submit">
          Créer
        </Button>
      </form>
    </Box>
  );
};

export default CardsCreatePage;