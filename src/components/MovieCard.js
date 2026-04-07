import "../styles/MovieCard.css";

const getMovieTitle = (movie) =>
  movie.titleText?.text || movie.title || movie.name || movie.originalTitle || "Untitled";

export default function MovieCard({ movie }) {
  const imageUrl = movie.primaryImage?.url;
  const title = getMovieTitle(movie);

  return (
    <div className="card">
      <img src={imageUrl} alt={title} loading="lazy" />
      <p>{title}</p>
    </div>
  );
}
