import React, { useState } from "react";
import SearchResults from "../SearchResults/SearchResults";
import logo from "../../images/tmdb.svg";
import searchIcon from "../../images/search.svg";

import styles from "./Search.module.css";

const Search = ({ propsSearchResults, setSearchType, setQuery, loading }) => {
  const [searchValue, setSearchValue] = useState("");

  let searchResults = null;

  if (searchValue) {
    searchResults = (
      <SearchResults
        results={propsSearchResults}
        setQuery={setQuery}
        setSearchValue={setSearchValue}
        setSearchType={setSearchType}
        loading={loading}
      />
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.container}>
      <div className={styles.colOne}>
        <img src={logo} alt="The Movie Database" />
      </div>

      <div className={styles.colTwo}>
        <form onSubmit={handleSubmit}>
          <button type="submit">
            <img src={searchIcon} alt="Search" />
          </button>
          <input
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setQuery(e.target.value);
              setSearchType("search");
            }}
            type="text"
            placeholder="Search Movie Title..."
          />
          {searchResults}
        </form>
      </div>
    </div>
  );
};

export default Search;
