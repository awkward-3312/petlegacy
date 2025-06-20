import { useColorMode, useColorModeValue } from '@chakra-ui/react';

export default function App() {
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("black", "white");

  return (
    <Box minH="100vh" bg={bg} color={color} p={10}>
      <Heading mb={4}>PetLegacy</Heading>
      <Text fontSize="xl">¡Bienvenido a tu red social de mascotas!</Text>
      <Button mt={4} onClick={toggleColorMode}>
        Cambiar modo
      </Button>
    </Box>
  );
}
