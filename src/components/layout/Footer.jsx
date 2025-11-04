import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: "Inicio", href: "/" },
    { name: "Películas", href: "/movies" },
    { name: "Series", href: "/series" },
    { name: "Nosotros", href: "/about" },
  ];

  const socialLinks = [
    { 
      name: "Facebook", 
      href: "https://facebook.com", 
      icon: Facebook 
    },
    { 
      name: "Instagram", 
      href: "https://instagram.com", 
      icon: Instagram 
    },
    { 
      name: "YouTube", 
      href: "https://youtube.com", 
      icon: Youtube 
    },
  ];

  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          
          {/* Enlaces de navegación */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white font-semibold transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Redes sociales */}
          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-500 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm text-center">
            © {currentYear} MovieApp — Tradición digital, estilo moderno 🎬
          </p>
        </div>
      </div>
    </footer>
  );
}