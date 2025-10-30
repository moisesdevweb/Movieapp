export default function MovieCard({ movie }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  
  return (
    <div className="group cursor-pointer transition-transform hover:scale-105">
      <img 
        src={imageUrl} 
        alt={movie.title}
        className="rounded-lg shadow-lg"
      />
      <h3 className="mt-2 text-white font-semibold">{movie.title}</h3>
      <p className="text-yellow-400">⭐ {movie.vote_average.toFixed(1)}</p>
    </div>
  );
}
