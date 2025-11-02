import { Sidebar } from "./components/sidebar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Toaster } from "sonner";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  return (
    <div
      className={`min-h-screen bg-gray-900 ${
        isLoginPage ? "flex items-center justify-center" : "flex"
      }`}
    >
      {!isLoginPage && <Sidebar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Toaster />
    </div>
  );
}
export default App;
