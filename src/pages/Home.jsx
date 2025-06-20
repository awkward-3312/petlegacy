import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Home() {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("mascotas")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error cargando mascotas:", error);
      else setMascotas(data);
    })();
  }, []);

  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Box pt="80px" minH="100vh" bgGradient="linear(to-b, pink.50, purple.50, blue.50)" px={6} py={16}>
      <Box maxW="5xl" mx="auto" textAlign="center">
        <Heading
          as="h1"
          size="2xl"
          mb={4}
          bgGradient="linear(to-r, pink.400, purple.400)"
          bgClip="text"
        >
          🐾 Mascotas en PetLegacy
        </Heading>
        <Text color="gray.600" mb={10}>
          Conoce a los miembros más adorables de nuestra comunidad
        </Text>

        {mascotas.length === 0 ? (
          <Text color="gray.500" fontStyle="italic">
            Aún no hay mascotas registradas.
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {mascotas.map((m) => (
              <Stack
                key={m.id}
                bg={cardBg}
                borderRadius="xl"
                boxShadow="lg"
                overflow="hidden"
                _hover={{ transform: "scale(1.02)" }}
                transition="0.2s"
              >
                <Image
                  src={m.foto_url || "/placeholder-pet.jpg"}
                  alt={m.nombre}
                  objectFit="cover"
                  maxH="200px"
                  onError={(e) => (e.target.src = "/placeholder-pet.jpg")}
                />
                <Box p={4}>
                  <Heading as="h3" size="md" color="purple.500">
                    {m.nombre}
                  </Heading>
                  <Text fontSize="sm" color="gray.600" mt={2}>
                    {m.descripcion || "Sin descripción disponible."}
                  </Text>
                </Box>
              </Stack>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}
