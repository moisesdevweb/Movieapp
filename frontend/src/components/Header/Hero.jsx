import { useState, useEffect } from "react";
// Agregamos el icono 'Play' para que el botón de la izquierda tenga icono también
import { ChevronLeft, ChevronRight, Star, Play } from "lucide-react";
import { slides } from "./DataSlide";

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((i) => (i + 1) % slides.length);
  const prev = () => setCurrent((i) => (i === 0 ? slides.length - 1 : i - 1));

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* IMÁGENES DEL CARRUSEL */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url(${s.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Capa oscura (Overlay) con gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

          {/* Textos y Botones */}
          <div className="absolute bottom-6 left-5 md:bottom-16 md:left-20 max-w-2xl text-white">
            <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg mb-2 animate-in slide-in-from-left-10 duration-700">
              {s.title}
            </h1>
            <p className="text-gray-300 text-sm md:text-base mb-4 flex items-center gap-3 animate-in slide-in-from-left-10 duration-700 delay-100">
              <span className="bg-white/20 px-2 py-0.5 rounded text-xs backdrop-blur-md border border-white/10">{s.year}</span>
              <span>{s.genre}</span>
            </p>
            
            <div className="flex flex-wrap items-center gap-3 animate-in slide-in-from-bottom-5 duration-700 delay-200">
              {/* BOTÓN 1: VER AHORA (Estilo actualizado tipo Glass) */}
              <button className="flex items-center gap-2 border border-purple-500 bg-purple-600/20 backdrop-blur-md px-6 py-2.5 rounded-xl hover:bg-purple-600/40 transition font-bold text-sm md:text-base hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/10 cursor-pointer text-white">
                <Play size={18} fill="currentColor" /> Ver ahora
              </button>

              {/* BOTÓN 2: FAVORITOS (Estilo original) */}
              <button className="flex items-center gap-2 border border-white/30 bg-black/20 backdrop-blur-sm px-6 py-2.5 rounded-xl hover:bg-white/10 transition font-medium text-sm md:text-base cursor-pointer">
                <Star size={18} /> Añadir a favoritos
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* FLECHAS */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-purple-600/80 backdrop-blur-sm p-3 rounded-full z-20 transition-all border border-white/10 group cursor-pointer"
      >
        <ChevronLeft className="text-white w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-purple-600/80 backdrop-blur-sm p-3 rounded-full z-20 transition-all border border-white/10 group cursor-pointer"
      >
        <ChevronRight className="text-white w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      {/* INDICADORES */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
              current === i ? "w-8 bg-purple-500" : "w-2 bg-gray-500/50 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}