import React from "react";
import styles from "./SearchResults.module.css";

const SearchResults = ({
  results,
  setQuery,
  setSearchValue,
  setSearchType,
  loading,
}) => {
  if (loading) {
    return <div>Loading</div>;
  }

  let li = results.map((movie) => (
    <li onClick={() => handleClick(movie.id)} key={movie.id}>
      <span>{movie.title}</span>
      <span>
        {movie.release_date ? movie.release_date.substring(0, 4) : ""}
      </span>
    </li>
  ));

  if (results.length === 0) {
    li = <li>No results found</li>;
  }

  function handleClick(id) {
    setSearchValue("");
    setSearchType("getById");
    setQuery(id);
  }

  return (
    <div className={styles.container}>
      <ul className={styles.ul}>{li}</ul>
    </div>
  );
};

export default SearchResults;
