import React from "react";
import numeral from "numeral";
import styles from "./Card.module.css";

const Card = ({ movie, loading, searchType }) => {
  if (loading && searchType === "getById") {
    return <div>Loading</div>;
  }

  let noData = "-";
  const title = movie.original_title;
  const tagline = movie.tagline;
  const overview = movie.overview;
  const genres = movie.genres.map((genre, i) => (
    <span key={genre.id}>
      {genre.name}
      {movie.genres.length - 1 !== i ? ", " : ""}
    </span>
  ));
  let poster = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  const productionCompanies = movie.production_companies.map((company, i) => (
    <span key={company.id}>
      {company.name}
      {movie.production_companies.length - 1 !== i ? ", " : ""}
    </span>
  ));
  const releaseDate = movie.release_date;
  let totalRevenue = movie.revenue;
  let averageVote = movie.vote_average;
  const runtime = movie.runtime;
  let backdrop = "https://image.tmdb.org/t/p/original" + movie.backdrop_path;

  document.body.style.backgroundImage =
    "linear-gradient(rgba(0, 0, 0, 0.85) 15%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 1) 90%), url(" +
    backdrop +
    ")";

  // conditional statements for no data
  if (averageVote === "undefined" || averageVote === 0) {
    averageVote = noData;
  } else {
    averageVote = Math.round(averageVote) + " / 10";
  }

  if (totalRevenue === "undefined" || totalRevenue === 0) {
    totalRevenue = noData;
  } else {
    totalRevenue = numeral(totalRevenue).format("($0,0)");
  }

  if (!poster) {
    poster =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g";
  }

  return (
    <main className={styles.container}>
      <div className={styles.cardImgSection}>
        <img src={poster} alt="Poster" />
      </div>
      <div className={styles.cardMain}>
        <h1>{title}</h1>
        <h3>{tagline}</h3>
        <p>{overview}</p>
        <div className={styles.cardBottom}>
          <h3>{genres}</h3>
          <p>{productionCompanies}</p>
        </div>
        <ul className={styles.ul}>
          <li>
            <p>Orginal Release:</p>
            <p>{releaseDate}</p>
          </li>
          <li>
            <p>Box Office:</p>
            <p>{totalRevenue}</p>
          </li>
          <li>
            <p>Running Time:</p>
            <p>{runtime} mins</p>
          </li>
          <li>
            <p>Vote Average:</p>
            <p>{averageVote}</p>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Card;
