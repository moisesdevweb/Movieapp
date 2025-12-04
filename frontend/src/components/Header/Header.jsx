import Navbar from "./Navbar";
import Hero from "./Hero";

export default function Header() {
  return (
    // IMPORTANTE: Este div relativo es el que permite que Hero y Navbar se posicionen uno sobre otro
    <header className="relative w-full h-[45vh] overflow-hidden shadow-lg bg-gray-900">
      {/* 1. Ponemos el Hero (Carrusel) al fondo */}
      <Hero />
      
      {/* 2. Ponemos el Navbar encima (tiene z-index más alto en su archivo) */}
      <Navbar />
    </header>
  );
}