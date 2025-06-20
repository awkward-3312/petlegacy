import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    async function cargarMascotas() {
      const { data, error } = await supabase
        .from("mascotas")
        .select("*")
        .order("fecha_creacion", { ascending: false });

      if (error) console.error("Error cargando mascotas:", error);
      else setMascotas(data);
    }

    cargarMascotas();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 py-10 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-800 mb-4">
          🐾 Mascotas en PetLegacy
        </h1>
        <p className="text-gray-700 text-lg mb-10">
          Aquí puedes ver a las mascotas que forman parte de nuestra comunidad
        </p>

        {mascotas.length === 0 ? (
          <p className="text-gray-500">No hay mascotas registradas aún.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mascotas.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transition transform hover:scale-[1.03]"
              >
                <img
                  src={m.foto_url}
                  alt={m.nombre}
                  className="h-56 w-full object-cover"
                  onError={(e) => (e.target.src = "/placeholder-pet.jpg")}
                />
                <div className="p-5 text-left">
                  <h2 className="text-2xl font-semibold text-purple-700">{m.nombre}</h2>
                  <p className="text-sm text-gray-600 mt-2">
                    {m.descripcion || "Sin descripción disponible"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
