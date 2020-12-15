import React, { useState, useEffect } from "react";
import Search from "./components/Search/Search";
import Card from "./components/Card/Card";
import useFetchMovies from "./components/utils/useFetchMovies";
import "./App.css";

function App() {
  const randomMovieArray = [550, 263115, 299534, 10634, 1677, 808, 450465, 289];
  const [randomMovie, setRandomMovie] = useState(null);
  const [searchType, setSearchType] = useState("getById");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (randomMovie === null) {
      const randomId =
        randomMovieArray[Math.floor(Math.random() * randomMovieArray.length)];
      setRandomMovie(randomId);
      setQuery(randomId);
    }
  }, [randomMovie, randomMovieArray]);

  const { movie, loading, searchResults } = useFetchMovies(query, searchType);

  return (
    <div className="container">
      <Search
        propsSearchResults={searchResults}
        setQuery={setQuery}
        setSearchType={setSearchType}
        loading={loading}
      />
      <Card movie={movie} loading={loading} searchType={searchType} />
    </div>
  );
}

export default App;
