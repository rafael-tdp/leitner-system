import { Flex, Heading, keyframes, Link } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex
      w="full"
      justifyContent="space-between"
      alignItems="center"
      minH={20}
      px={8}
    >
        <>
            <Flex
            alignItems="center"
            display="flex"
            flex={1}
            justifyContent="end"
            ml="auto"
            >
            <Heading
                as={Link}
                href="/cards"
                fontSize={'lg'}
                textTransform="uppercase"
            >
                Liste des fiches
            </Heading>
            </Flex>

            <Flex
            alignItems="center"
            display="flex"
            flex={1}
            justifyContent="end"
            ml="auto"
            >
            <Heading
                as={Link}
                href="/cards/create"
                fontSize={'lg'}
                textTransform="uppercase"
            >
                Créer une fiche
            </Heading>
            </Flex>
            <Flex
            alignItems="center"
            display="flex"
            flex={1}
            justifyContent="end"
            ml="auto"
            >
            <Heading
                as={Link}
                href="/cards/quizz"
                fontSize={'lg'}
                textTransform="uppercase"
            >
                Faire le quiz du jour
            </Heading>
            </Flex>
        </>
    </Flex>
  );
};

export default Header;