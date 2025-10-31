// Configuración del Sidebar y definición de los ítems del menú
import { 
  // Íconos de lucide-react 
  Home, 
  Heart, 
  TrendingUp, 
  Calendar, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut 
} from 'lucide-react';

// Menú Principal
export const mainMenuItems = [
  { 
    // EL ID debe ser único
    id: 'inicio', 
    // Ícono importado
    icon: Home, 
    // Etiqueta del ítem
    label: 'Inicio',
    //path del ítem
    path: '/' 
  },
  { 
    id: 'favoritos', 
    icon: Heart, 
    label: 'Favoritos', 
    // Ejemplo de badge vacío
    badge: '',
    path: '/favoritos' 
  },
  { 
    id: 'tendencias', 
    icon: TrendingUp, 
    label: 'Tendencias',
    path: '/tendencias' 
  },
  { 
    id: 'proximamente', 
    icon: Calendar, 
    label: 'Próximamente', 
    badge: '',
    path: '/proximamente' 
  },
];

// Menú Social
export const socialMenuItems = [
  { 
    id: 'comunidad', 
    icon: Users, 
    label: 'Comunidad',
    path: '/comunidad' 
  },
  { 
    id: 'social', 
    icon: MessageSquare, 
    label: 'Social', 
    badge: '3',
    path: '/social' 
  },
];

// Menú Inferior
export const bottomMenuItems = [
  { 
    id: 'configuracion', 
    icon: Settings, 
    label: 'Configuración',
    path: '/configuracion' 
  },
  { 
    id: 'logout', 
    icon: LogOut, 
    label: 'Cerrar sesión',
    path: null // No tiene path porque es una acción
  },
];