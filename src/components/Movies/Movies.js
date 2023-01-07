// import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import SearchForm from "../SearchForm/SearchForm";
// import { allMovies } from '../../utils/constants';

// export default function Movies() {
//   return (
//     <main className="movies">
//       <SearchForm />
//       <MoviesCardList cards={allMovies} />
//     </main>
//   )
// }

import { useEffect } from "react";
import { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies({
  movies,
  searchValue,
  handleChangeSearchValue,
  setIsSearchValue,
  isSearchFormError,
  setIsSearchFormError,
  setIsMoviesSearch,
  isLoading,
  setIsLoading,
  onClick,
  onDeleteCard,
  onAddCard,
  savedCards
}) {
  const [isShortMovies, setIsShortMovies] = useState(false);


  function handleSubmit(e) {
    e.preventDefault();

    setIsSearchFormError("");
    setIsMoviesSearch([]);
    setIsLoading(true);
    // isSearchValue ? onClick() : setIsError(true);
    searchValue && onClick();

    localStorage.setItem("short-movies", JSON.stringify(isShortMovies));
    localStorage.setItem("isSearch", searchValue);
  }

  function handleCheckShortMovies() {
    setIsShortMovies(!isShortMovies);
    localStorage.setItem("short-movies", JSON.stringify(!isShortMovies));
  }

  const visibleMovies = isShortMovies
    ? movies.filter((item) => item.duration < 40)
    : movies;

  function handleChange(e) {
    setIsSearchValue(e.target.value);
    // setIsError(false);
  }

  return (
    <main className="movies">
      <SearchForm
        handleSubmit={handleSubmit}
        value={searchValue}
        handleChange={handleChange}
        onCheckShortMovies={handleCheckShortMovies}
        checkedShortMovies={isShortMovies}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movies={visibleMovies}
          onDeleteCard={onDeleteCard}
          onAddCard={onAddCard}
          savedCards={savedCards}
        />
      )}
    </main>
  );
}
