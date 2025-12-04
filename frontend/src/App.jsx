import { Routes, Route, useLocation } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

// Tus páginas
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails";
// Páginas de tus compañeros
import { Celebrity } from "./pages/Celebrity";
import { TrendingCelebrity } from "./pages/TrendingCelebrity";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div
      className={`min-h-screen bg-gray-900 ${
        isLoginPage ? "flex items-center justify-center" : "flex"
      }`}
    >
      {/* Sidebar solo si NO estás en login */}
      {!isLoginPage && <Sidebar />}

      {/* Contenedor principal */}
      <main className={isLoginPage ? "" : "flex-1 relative"}>
        <Routes>
          {/* Rutas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movie/:id" element={<MovieDetails />} />

          <Route path="/actor/:id" element={<Celebrity />} />
          <Route path="/trending-persons" element={<TrendingCelebrity />} />
        </Routes>
          {/* Footer solo si NO estás en login */}
        {!isLoginPage && <Footer />}
      </main>

      <Toaster />
    </div>
  );
}

export default App;