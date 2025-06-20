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

      if (error) {
        console.error("Error cargando mascotas:", error);
      } else {
        setMascotas(data);
      }
    }

    cargarMascotas();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-4">🐾 Mascotas en PetLegacy</h1>
        <p className="text-gray-700 text-lg mb-10">
          Aquí puedes ver a las mascotas que forman parte de nuestra comunidad
        </p>

        {mascotas.length === 0 ? (
          <div className="text-gray-600 text-md italic">
            No hay mascotas registradas aún.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mascotas.map((m) => (
              <div
                key={m.id}
                className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-xl p-4 transition hover:scale-[1.02]"
              >
                <img
                  src={m.foto_url}
                  alt={m.nombre}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                  onError={(e) => (e.target.src = "/placeholder-pet.jpg")}
                />
                <h2 className="text-xl font-semibold text-purple-800">{m.nombre}</h2>
                <p className="text-sm text-gray-700">{m.descripcion || "Sin descripción."}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
