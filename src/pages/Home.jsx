import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("mascotas")
        .select("*")
        .order("fecha_creacion", { ascending: false });

      if (error) console.error("Error cargando mascotas:", error);
      else setMascotas(data);
    })();
  }, []);

  return (
    <main className="pt-20 min-h-screen bg-gradient-to-b from-pastel-lilac via-pastel-pink/40 to-pastel-aqua/40 dark:from-brand-dark dark:via-brand-dark dark:to-brand-dark px-6 py-16">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-pastel-peach dark:text-pastel-blue mb-4 drop-shadow">
          🐾 Mascotas en PetLegacy
        </h1>
        <p className="text-brand-dark/80 dark:text-pastel-blue/80 text-lg mb-10">
          Conoce a los miembros más adorables de nuestra comunidad
        </p>

        {mascotas.length === 0 ? (
          <p className="text-brand-dark/60 dark:text-white/60 italic">
            Aún no hay mascotas registradas.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mascotas.map((m) => (
              <article
                key={m.id}
                className="bg-white/60 dark:bg-brand-dark/60 backdrop-blur-xs border border-white/30 dark:border-white/10 rounded-xl shadow-glass p-4 hover:scale-[1.02] transition-transform"
              >
                <img
                  src={m.foto_url}
                  alt={m.nombre}
                  onError={(e) => (e.target.src = '/placeholder-pet.jpg')}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h2 className="text-xl font-semibold text-pastel-lilac dark:text-pastel-pink">
                  {m.nombre}
                </h2>
                <p className="text-sm text-brand-dark dark:text-white">
                  {m.descripcion || "Sin descripción disponible."}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
