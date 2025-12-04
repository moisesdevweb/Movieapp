# 🎬 Movie App

Aplicación web para explorar películas, guardar favoritos y comentar. Construida con React, Tailwind CSS y Supabase.

## ✨ Características

- 🔐 Sistema de autenticación (login y registro)
- 🎥 Catálogo de películas con información completa de TMDB
- ⭐ Películas populares y tendencias de la semana
- 💬 Sistema de comentarios
- ❤️ Guardar películas como favoritas
- 👤 Panel de edición de perfil de usuario

## 🛠️ Tecnologías

- **Frontend**: React 18 + Vite
- **Estilos**: Tailwind CSS
- **Backend**: Supabase (Auth + Database)
- **API**: The Movie Database (TMDB)

## 🚀 Instalación
```
1. Clona el repositorio:
git clone https://github.com/moisesdevweb/Movieapp.git
cd frontend
```

2. Instala las dependencias:
```
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto y configura tus variables de entorno:
```
VITE_TMDB_API_KEY=tu_api_key_de_tmdb
VITE_TMDB_ACCESS_TOKEN=tu_token_de_tmdb
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase                   
```
4. Inicia el servidor de desarrollo:

5. Abre tu navegador en `http://localhost:5173`

## 📦 Dependencias Principales

### Producción
```
{
"react": "^18.3.1",
"react-dom": "^18.3.1",
"@supabase/supabase-js": "^2.x",
"@supabase/auth-ui-react": "^0.4.x",
"@supabase/auth-ui-shared": "^0.1.x"
}
```

### Desarrollo
```
{
"vite": "^5.x",
"tailwindcss": "^3.x",
"postcss": "^8.x",
"autoprefixer": "^10.x"
}
```

## 🔑 Obtener API Keys

### TMDB API
1. Regístrate en [The Movie Database](https://www.themoviedb.org/)
2. Ve a Settings → API
3. Solicita una API key (Developer)
4. Copia tu API Key y Access Token

### Supabase
1. Crea una cuenta en [Supabase](https://supabase.com/)
2. Crea un nuevo proyecto
3. Ve a Settings → API
4. Copia tu Project URL y la clave `anon/public`

## 📁 Estructura del Proyecto
```
movie-app/
├── src/
│ ├── components/ # Componentes reutilizables
│ │ ├── Navbar.jsx
│ │ ├── MovieCard.jsx
│ │ ├── HeroBanner.jsx
│ │ └── Footer.jsx
│ ├── pages/ # Páginas principales
│ │ ├── Home.jsx
│ │ └── Login.jsx
│ ├── services/ # Servicios de API
│ │ ├── tmdbApi.js
│ │ └── supabaseClient.js
│ ├── App.jsx
│ └── main.jsx
├── .env # Variables de entorno (no subir a git)
├── .gitignore
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎯 Roadmap

- [x] Configuración inicial del proyecto
- [x] Integración con TMDB API
- [x] Diseño de interfaz básica
- [ ] Sistema de autenticación completo
- [ ] Página de detalles de película
- [ ] Sistema de comentarios
- [ ] Funcionalidad de favoritos
- [ ] Panel de edición de perfil


## 👤 Autor

 [@moisesdevweb](https://github.com/moisesdevweb)

## 🙏 Agradecimientos

- [TMDB](https://www.themoviedb.org/) por su increíble API gratuita
- [Supabase](https://supabase.com/) por facilitar el backend
- La comunidad de React por los recursos y tutoriales
