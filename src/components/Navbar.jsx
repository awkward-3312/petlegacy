import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);

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
    <nav className="bg-purple-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">🐾 PetLegacy</Link>

        <div className="space-x-4 flex items-center">
          <Link to="/" className="hover:underline">Inicio</Link>
          <Link to="/perfil" className="hover:underline">Perfil Mascota</Link>
          <Link to="/memorial" className="hover:underline">Memorial</Link>

          {usuario ? (
            <>
              <span className="text-sm hidden sm:inline">👤 {usuario.email}</span>
              <button onClick={cerrarSesion} className="hover:underline">Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Iniciar sesión</Link>
              <Link to="/registro" className="hover:underline">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
