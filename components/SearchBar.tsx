const SearchBar = ({ onSearch }: { onSearch: (term: string) => void }) => {
    return (
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-2 border rounded mt-12 mb-4"
      />
    );
  };
  
  export default SearchBar;
  