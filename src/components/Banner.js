import "../styles/Banner.css";

const getMovieTitle = (movie) =>
  movie.titleText?.text ||
  movie.title ||
  movie.name ||
  movie.originalTitle ||
  "Untitled";

const getMovieYear = (movie) =>
  movie.releaseYear?.year || movie.year || movie.startYear || "Unknown Year";

export default function Banner({ movie }) {
  if (!movie) return null;

  const imageUrl =
    movie.primaryImage?.url ||
    "https://via.placeholder.com/300x450";

  return (
    <div className="banner">
      <div className="banner-inner">
        <img src={imageUrl} alt="poster" className="banner-img" loading="lazy" />

        <div className="banner-content">
          <h1>{getMovieTitle(movie)}</h1>
          <p>{getMovieYear(movie)}</p>
        </div>
      </div>
    </div>
  );
}
