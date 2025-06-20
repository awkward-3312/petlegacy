import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Obtener usuario actual al cargar el componente
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUsuario(data.user);
    });

    // Escuchar cambios de sesión
    supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user || null);
    });
  }, []);

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
  };

  return (
    <nav className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 shadow-lg ring-1 ring-black/5 dark:ring-white/10 fixed top-0 inset-x-0 z-50 text-gray-800 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center text-xl font-bold px-3 py-2 rounded-md hover:bg-purple-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 transition-colors">
            <FaPaw className="mr-2 text-purple-600" />
            <span className="hidden sm:block">PetLegacy</span>
          </Link>

          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="sm:hidden p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            aria-label="Menú"
          >
            {menuAbierto ? <FaTimes /> : <FaBars />}
          </button>

          <div
            className={`${
              menuAbierto ? "flex" : "hidden"
            } flex-col absolute sm:static top-full left-0 w-full sm:w-auto bg-white/90 dark:bg-gray-900/90 sm:bg-transparent sm:dark:bg-transparent sm:flex sm:flex-row items-center gap-2 sm:gap-4 p-4 sm:p-0 transition-all`}
          >
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium flex items-center hover:bg-purple-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 transition-colors"
              onClick={() => setMenuAbierto(false)}
            >
              <FaHome className="mr-1" /> Inicio
            </Link>
            <Link
              to="/perfil"
              className="px-3 py-2 rounded-md text-sm font-medium flex items-center hover:bg-purple-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 transition-colors"
              onClick={() => setMenuAbierto(false)}
            >
              <FaDog className="mr-1" /> Perfil Mascota
            </Link>
            <Link
              to="/memorial"
              className="px-3 py-2 rounded-md text-sm font-medium flex items-center hover:bg-purple-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 transition-colors"
              onClick={() => setMenuAbierto(false)}
            >
              <FaBook className="mr-1" /> Memorial
            </Link>

            {usuario ? (
              <>
                <span className="px-3 py-2 rounded-md text-xs flex items-center">
                  <FaUserCircle className="mr-1" />
                  <span className="hidden sm:block">{usuario.email}</span>
                </span>
                <button
                  onClick={() => {
                    setMenuAbierto(false);
                    cerrarSesion();
                  }}
                  className="px-3 py-2 rounded-md text-sm font-medium flex items-center hover:bg-purple-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 transition-colors"
                >
                  <FaSignOutAlt className="mr-1" /> Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium flex items-center hover:bg-purple-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 transition-colors"
                  onClick={() => setMenuAbierto(false)}
                >
                  <FaSignInAlt className="mr-1" /> Iniciar sesión
                </Link>
                <Link
                  to="/registro"
                  className="px-3 py-2 rounded-md text-sm font-medium flex items-center hover:bg-purple-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 transition-colors"
                  onClick={() => setMenuAbierto(false)}
                >
                  <FaUserPlus className="mr-1" /> Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
