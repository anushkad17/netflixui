import { useEffect, useState, useMemo, useCallback } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { fetchMovies } from "../services/api";
import Banner from "../components/Banner";
import "../styles/Home.css";

// Debounce
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Fetch movies
  useEffect(() => {
    let isMounted = true;

    fetchMovies().then((data) => {
      if (isMounted) setMovies(data || []);
    });

    return () => (isMounted = false);
  }, []);

  // Lazy loading (for rows expansion)
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50
      ) {
        setVisibleCount((prev) => prev + 10);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search
  const handleSearch = useCallback((query) => {
    if (!query) {
      setFilteredMovies([]);
      setSuggestions([]);
      return;
    }

    const lower = query.toLowerCase();

    const results = movies.filter((m) => {
      const title = m.titleText?.text?.toLowerCase();
      const year = m.releaseYear?.year?.toString();
      const id = m.id?.toLowerCase();

      return (
        title?.includes(lower) ||
        year?.includes(lower) ||
        id?.includes(lower)
      );
    });

    setFilteredMovies(results);
  }, [movies]);

  const debouncedSearch = useMemo(
    () => debounce(handleSearch, 500),
    [handleSearch]
  );

  const handleSearchInput = useCallback(
    (value) => {
      setQuery(value);

      if (!value) {
        setFilteredMovies([]);
        setSuggestions([]);
        return;
      }

      const lower = value.toLowerCase();
      const suggestionList = movies
        .filter((m) => m.titleText?.text?.toLowerCase()?.includes(lower))
        .slice(0, 5)
        .map((m) => m.titleText?.text || "");

      setSuggestions(suggestionList);
      debouncedSearch(value);
    },
    [movies, debouncedSearch]
  );

  const handleSuggestionSelect = useCallback(
    (suggestion) => {
      setQuery(suggestion);
      setSuggestions([]);
      handleSearch(suggestion);
    },
    [handleSearch]
  );

  // Category filter
  const filterByCategory = (list) => {
    if (category === "all") return list;

    if (category === "movie") {
      return list.filter(
        (m) => m.titleType?.text?.toLowerCase() === "movie"
      );
    }

    if (category === "tv") {
      return list.filter(
        (m) => m.titleType?.text?.toLowerCase().includes("tv")
      );
    }

    if (category === "game") {
      return list.filter(
        (m) => m.titleType?.text?.toLowerCase().includes("game")
      );
    }

    return list;
  };

  // Banner movie fix
  const bannerMovie =
    movies.find(
      (m) =>
        m.primaryImage?.url &&
        (m.titleText?.text || m.title || m.name || m.originalTitle)
    ) || movies[0];

  const displayMovies =
    filteredMovies.length > 0 ? filteredMovies : movies;

  return (
    <div className="home">
      <Navbar
        query={query}
        onSearch={handleSearchInput}
        onSuggestionSelect={handleSuggestionSelect}
        suggestions={suggestions}
        onCategoryChange={setCategory}
      />

      {/* Banner */}
      <Banner movie={bannerMovie} />

      {/* ROW 1 */}
      <div className="section">
        <h2>Trending Now</h2>
        <div className="row">
          {filterByCategory(displayMovies)
            .slice(0, visibleCount)
            .map((movie, index) => (
              <MovieCard
                key={movie.id || movie.tconst || index}
                movie={movie}
              />
            ))}
        </div>
      </div>

      {/* ROW 2 */}
      <div className="section">
        <h2>Top Picks</h2>
        <div className="row">
          {displayMovies.slice(10, 30).map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      </div>

      {/* ROW 3 */}
      <div className="section">
        <h2>Popular Shows</h2>
        <div className="row">
          {displayMovies.slice(30, 50).map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}