export default function SearchBar({
  query,
  setQuery,
  onSearch
}) {
  return (
    <div className="searchBox">
      <input
        type="text"
        placeholder="Search stations..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={onSearch}>
        Search
      </button>
    </div>
  );
}