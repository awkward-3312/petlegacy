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

  // Sesión actual + listener
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUsuario(data.user));
    supabase.auth.onAuthStateChange((_evt, sess) =>
      setUsuario(sess?.user || null),
    );
  }, []);

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
    setMenuAbierto(false);
  };

  /* ---------- UI ---------- */
  return (
    <nav className="fixed inset-x-0 top-0 z-50 backdrop-blur-xs bg-white/60 dark:bg-brand-dark/60 shadow-glass ring-1 ring-black/5 dark:ring-white/10 text-brand-dark dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold hover:opacity-90"
        >
          <FaPaw className="text-pastel-peach text-2xl" />
          <span className="hidden sm:block">PetLegacy</span>
        </Link>

        {/*Hamburger*/}
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="sm:hidden p-2 rounded-lg hover:bg-pastel-pink/40 focus:ring-2 focus:ring-pastel-pink"
          aria-label="Menú"
        >
          {menuAbierto ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>

        {/*Links*/}
        <div
          className={`${
            menuAbierto ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row gap-2 sm:gap-4 absolute sm:static top-full left-0 w-full sm:w-auto bg-white/90 dark:bg-brand-dark/90 sm:bg-transparent sm:dark:bg-transparent p-4 sm:p-0`}
          onClick={() => setMenuAbierto(false)}
        >
          <NavItem to="/" icon={<FaHome />} text="Inicio" />
          <NavItem to="/perfil" icon={<FaDog />} text="Perfil Mascota" />
          <NavItem to="/memorial" icon={<FaBook />} text="Memorial" />

          {usuario ? (
            <>
              <span className="flex items-center gap-1 text-xs sm:text-sm px-3 py-2 rounded">
                <FaUserCircle />{" "}
                <span className="hidden sm:inline">{usuario.email}</span>
              </span>
              <button
                onClick={cerrarSesion}
                className="flex items-center gap-1 px-3 py-2 rounded hover:bg-pastel-pink/40 focus:ring-2 focus:ring-pastel-pink"
              >
                <FaSignOutAlt /> Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <NavItem to="/login" icon={<FaSignInAlt />} text="Iniciar sesión" />
              <NavItem
                to="/registro"
                icon={<FaUserPlus />}
                text="Registrarse"
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

/* ---------- Sub-componente ---------- */
function NavItem({ to, icon, text }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-1 px-3 py-2 rounded hover:bg-pastel-pink/40 focus:ring-2 focus:ring-pastel-pink transition-colors text-sm"
    >
      {icon} <span>{text}</span>
    </Link>
  );
}
