import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Search, Bell } from "lucide-react";
import { slides } from "./DataSlide";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((i) => (i + 1) % slides.length);
  const prev = () => setCurrent((i) => (i === 0 ? slides.length - 1 : i - 1));

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative w-full h-[45vh] text-white overflow-hidden  shadow-lg">
      {/* NAVBAR */}
      <nav className="absolute top-0 w-full flex items-center justify-between px-5 md:px-10 py-4 bg-black/40 backdrop-blur-sm z-20 text-sm md:text-base">
        <div className="flex items-center gap-6 md:gap-10 font-semibold">
          <a href="#" className="hover:text-purple-400 transition">
            Películas
          </a>
          <a href="#" className="hover:text-purple-400 transition">
            Series
          </a>
          <a href="#" className="hover:text-purple-400 transition">
            Documentales
          </a>
        </div>
        <div className="flex items-center gap-3 md:gap-5">
          <Search className="w-5 h-5 cursor-pointer hover:text-purple-400 transition" />
          <Bell className="w-5 h-5 cursor-pointer hover:text-purple-400 transition" />
          <button
            className="bg-purple-600 hover:bg-purple-700 px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-semibold text-xs md:text-sm transition cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión
          </button>
        </div>
      </nav>

      {/* CARRUSEL */}
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
          {/* Degradado */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

          {/* Contenido */}
          <div className="absolute bottom-6 left-5 md:bottom-10 md:left-10">
            <h1 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
              {s.title}
            </h1>
            <p className="text-gray-300 text-xs md:text-sm mb-3">
              {s.year} | {s.genre}
            </p>
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <button className="bg-purple-600 hover:bg-purple-700 px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-semibold text-xs md:text-sm transition">
                Ver ahora
              </button>
              <button className="flex items-center gap-1.5 border border-white/60 px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-white/10 transition text-xs md:text-sm">
                <Star size={14} /> Añadir a favoritos
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Flechas */}
      <button
        onClick={prev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-1.5 md:p-2 rounded-full z-20"
      >
        <ChevronLeft className="text-white w-4 h-4 md:w-5 md:h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-1.5 md:p-2 rounded-full z-20"
      >
        <ChevronRight className="text-white w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-20">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full cursor-pointer transition-all ${
              current === i ? "bg-white" : "bg-gray-400/60"
            }`}
          />
        ))}
      </div>
    </header>
  );
}
