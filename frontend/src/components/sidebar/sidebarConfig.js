import { 
  Home, 
  TrendingUp, 
  PartyPopper, 
  Settings, 
  LogOut,
  ListVideo // Icono nuevo para lista de seguimiento
} from 'lucide-react';

// Menú Principal
export const mainMenuItems = [
  { 
    id: 'inicio', 
    icon: Home, 
    label: 'Inicio',
    path: '/' 
  },
  { 
    id: 'tendencias', 
    icon: TrendingUp, 
    label: 'Tendencias',
    path: '/tendencias' 
  },
  { 
    id: 'actores', 
    icon: PartyPopper , 
    label: 'Actores', 
    path: '/trending-persons' 
  },
  { 
    // NUEVO ÍTEM: Solo para usuarios logueados
    id: 'watchlist', 
    icon: ListVideo, 
    label: 'Mi Lista', 
    path: '/watchlist',
    authRequired: true // <--- Esta es la clave mágica
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
    path: null
  },
];