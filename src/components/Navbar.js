import "../styles/Navbar.css";

export default function Navbar({
  query,
  onSearch,
  suggestions,
  onSuggestionSelect,
  onCategoryChange,
}) {
  const handleChange = (e) => {
    const value = e.target.value;
    onSearch(value);
  };

  return (
    <div className="navbar">
      <h2 className="logo">Netflix</h2>

      <div className="nav-links">
        <span onClick={() => onCategoryChange("all")}>Home</span>
        <span onClick={() => onCategoryChange("tv")}>TV Shows</span>
        <span onClick={() => onCategoryChange("movie")}>Movies</span>
        <span onClick={() => onCategoryChange("game")}>Games</span>
      </div>

      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={handleChange}
          className="search"
          autoComplete="off"
        />

        {suggestions?.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((text, index) => (
              <li
                key={`${text}-${index}`}
                onClick={() => onSuggestionSelect(text)}
              >
                {text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
