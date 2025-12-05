import { useState } from "react";
import { ArrowLeft, Film, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
// Importamos useLocation para saber de dónde venimos
import { useNavigate, useLocation } from "react-router-dom"; 
import { loginUser, registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para leer el estado de navegación
  const { login } = useAuth();
  
  // MAGIA: Recuperamos la ruta de donde venía el usuario.
  // Si no venía de ninguna parte (directo al login), usamos "/" (Inicio) por defecto.
  const from = location.state?.from?.pathname || "/";

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // --- PROCESO DE LOGIN ---
        const response = await loginUser({ email, password });
        
        // Guardamos sesión en el contexto
        login(response.user, response.token);
        
        toast.success(`¡Bienvenido de vuelta, ${response.user.name}!`);
        
        // REDIRECCIÓN INTELIGENTE:
        // En lugar de ir siempre a "/", vamos a la variable 'from'.
        // replace: true borra el login del historial para que al dar "Atrás" no vuelvas al login.
        navigate(from, { replace: true });

      } else {
        // --- PROCESO DE REGISTRO ---
        await registerUser({ name, email, password });
        toast.success("¡Cuenta creada! Ahora inicia sesión.");
        setIsLogin(true); // Cambiamos a la vista de login
        setPassword("");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 hover:text-purple-500 transition-all duration-300 group cursor-pointer text-gray-600"
      >
        <div className="w-10 h-10 rounded-xl bg-gray-900 border flex items-center justify-center group-hover:border-purple-500 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium hidden sm:inline text-[15px]">
          Volver
        </span>
      </button>

      <div className="w-[550px] max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 mb-4 shadow-[0_0_40px_rgba(168,85,247,0.5)]">
            <Film className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? "Bienvenido" : "Crear Cuenta"}
          </h1>
          <p className="text-gray-400">
            {isLogin
              ? "Ingresa a tu cuenta para continuar"
              : "Regístrate para comenzar"}
          </p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 shadow-[0_0_80px_rgba(0,0,0,0.5)] border border-gray-700 overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Campo Nombre (Solo Registro) */}
            {!isLogin && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
                <Label htmlFor="name" className="text-white">
                  Nombre Completo
                </Label>
                <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                    <Input
                    id="name"
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-900 border border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-purple-500 py-5 pl-10"
                    />
                </div>
              </div>
            )}

            {/* Campo Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-purple-500 py-5"
              />
            </div>

            {/* Campo Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-purple-500 py-5"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 cursor-pointer text-[16px] disabled:opacity-50"
            >
              {loading 
                ? "Cargando..." 
                : (isLogin ? "Iniciar Sesión" : "Registrarse")
              }
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                  setIsLogin(!isLogin);
                  setName("");
                  toast.dismiss();
              }}
              className="text-sm text-gray-400 hover:text-purple-400 transition-colors cursor-pointer"
            >
              {isLogin ? (
                <>
                  ¿No tienes cuenta?{" "}
                  <span className="text-purple-400 font-medium">
                    Regístrate
                  </span>
                </>
              ) : (
                <>
                  ¿Ya tienes cuenta?{" "}
                  <span className="text-purple-400 font-medium">
                    Inicia sesión
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Al continuar, aceptas nuestros términos y condiciones
        </p>
      </div>
    </div>
  );
};

export default Login;