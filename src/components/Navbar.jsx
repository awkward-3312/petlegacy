import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import {
  FaBars,
  FaTimes,
  FaPaw,
  FaHome,
  FaDog,
  FaBook,
  FaUserCircle,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Stack,
  HStack,
  Text,
  Button,
  useColorModeValue,
  Collapse,
} from "@chakra-ui/react";

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);

  /* --------- sesión --------- */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUsuario(data.user));
    supabase.auth.onAuthStateChange((_e, sess) =>
      setUsuario(sess?.user || null)
    );
  }, []);

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
    setMenuAbierto(false);
  };

  /* --------- UI --------- */
  const bg = useColorModeValue("whiteAlpha.800", "gray.800");
  const linkHover = useColorModeValue("purple.50", "gray.700");

  return (
    <Box
      position="fixed"
      top="0"
      w="full"
      zIndex="banner"
      backdropFilter="blur(6px)"
      bg={bg}
      borderBottom="1px solid"
      borderColor={useColorModeValue("blackAlpha.200", "whiteAlpha.200")}
    >
      <Flex
        maxW="7xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        h="16"
        align="center"
        justify="space-between"
      >
        {/* Logo */}
        <HStack as={RouterLink} to="/" spacing={2}>
          <Icon as={FaPaw} boxSize={6} color="pink.300" />
          <Text
            fontWeight="bold"
            fontSize="xl"
            display={{ base: "none", sm: "block" }}
          >
            PetLegacy
          </Text>
        </HStack>

        {/* Hamburguesa */}
        <IconButton
          aria-label="Menú"
          icon={menuAbierto ? <FaTimes /> : <FaBars />}
          display={{ base: "flex", sm: "none" }}
          variant="ghost"
          onClick={() => setMenuAbierto(!menuAbierto)}
        />

        {/* Links desktop */}
        <HStack
          spacing={4}
          display={{ base: "none", sm: "flex" }}
          align="center"
        >
          <NavItem to="/" icon={FaHome} text="Inicio" hover={linkHover} />
          <NavItem to="/perfil" icon={FaDog} text="Perfil Mascota" hover={linkHover} />
          <NavItem to="/memorial" icon={FaBook} text="Memorial" hover={linkHover} />

          {usuario ? (
            <>
              <HStack spacing={1} fontSize="sm">
                <Icon as={FaUserCircle} />
                <Text whiteSpace="nowrap">{usuario.email}</Text>
              </HStack>
              <Button
                size="sm"
                leftIcon={<FaSignOutAlt />}
                onClick={cerrarSesion}
                variant="ghost"
                _hover={{ bg: linkHover }}
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <NavItem to="/login" icon={FaSignInAlt} text="Iniciar sesión" hover={linkHover} />
              <NavItem to="/registro" icon={FaUserPlus} text="Registrarse" hover={linkHover} />
            </>
          )}
        </HStack>
      </Flex>

      {/* Links móviles */}
      <Collapse in={menuAbierto} animateOpacity>
        <Stack
          bg={bg}
          p={4}
          display={{ sm: "none" }}
          spacing={2}
          borderBottom="1px solid"
          borderColor={useColorModeValue("blackAlpha.200", "whiteAlpha.200")}
        >
          <NavItem to="/" icon={FaHome} text="Inicio" hover={linkHover} mobile />
          <NavItem to="/perfil" icon={FaDog} text="Perfil Mascota" hover={linkHover} mobile />
          <NavItem to="/memorial" icon={FaBook} text="Memorial" hover={linkHover} mobile />

          {usuario ? (
            <>
              <HStack spacing={1} fontSize="sm">
                <Icon as={FaUserCircle} />
                <Text>{usuario.email}</Text>
              </HStack>
              <Button
                size="sm"
                leftIcon={<FaSignOutAlt />}
                onClick={cerrarSesion}
                variant="ghost"
                _hover={{ bg: linkHover }}
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <NavItem to="/login" icon={FaSignInAlt} text="Iniciar sesión" hover={linkHover} mobile />
              <NavItem to="/registro" icon={FaUserPlus} text="Registrarse" hover={linkHover} mobile />
            </>
          )}
        </Stack>
      </Collapse>
    </Box>
  );
}

/* ---------- Link reutilizable ---------- */
function NavItem({ to, icon, text, hover, mobile = false }) {
  const Component = mobile ? Stack : HStack;
  return (
    <Component
      as={RouterLink}
      to={to}
      spacing={1}
      px={3}
      py={2}
      borderRadius="md"
      _hover={{ bg: hover }}
      fontSize="sm"
    >
      <Icon as={icon} />
      <Text>{text}</Text>
    </Component>
  );
}
