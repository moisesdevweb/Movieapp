import { 
  Home, 
  TrendingUp, 
  PartyPopper, 
  ListVideo 
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
    id: 'watchlist', 
    icon: ListVideo, 
    label: 'Mi Lista', 
    path: '/my-list',
    authRequired: true 
  },
];

export const bottomMenuItems = [];