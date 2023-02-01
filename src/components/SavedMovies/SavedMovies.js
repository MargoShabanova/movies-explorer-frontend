import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useEffect, useState } from "react";
import { NOT_FOUND_ERROR, DURATION } from "../../utils/constants";
import "../Movies/Movies.css";

export default function SavedMovies({ savedMovies, onDeleteCard }) {
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isError, setIsError] = useState("");
  const [visibleMovies, setVisibleMovies] = useState(savedMovies);
  const [searchValue, setSearchValue] = useState("");
  const [notFound, setNotFound] = useState(false);

  function searchMovie(movies, keyWord) {
    const movieFromSearch = movies.filter((item) => {
      const nameRu = item.nameRU.toString().toLowerCase();
      const nameEn = item.nameEN.toString().toLowerCase();
      const finalMovie = keyWord.toLowerCase();
      return (
        nameRu.indexOf(finalMovie) !== -1 || nameEn.indexOf(finalMovie) !== -1
      );
    });
    return movieFromSearch;
  }

  function filterCheckbox(movies) {
    return Array.isArray(movies)
      ? movies.filter((item) => item.duration < DURATION)
      : movies;
  }

  useEffect(() => {
    if (visibleMovies.length === 0) {
      setNotFound(true);
      setIsError(NOT_FOUND_ERROR);
    } else {
      setNotFound(false);
      setIsError("");
    }
  }, [visibleMovies]);

  useEffect(() => {
    const cardList = searchMovie(savedMovies, searchValue);
    setVisibleMovies(isShortMovies ? filterCheckbox(cardList) : cardList);
  }, [isShortMovies, searchValue, savedMovies]);

  function handleSearchClick(keyWord) {
    setSearchValue(keyWord);
  }

  function handleCheckShortMovies() {
    setIsShortMovies(!isShortMovies);
  }

  return (
    <main className="saved-movies">
      <SearchForm
        handleSearch={handleSearchClick}
        onCheckShortMovies={handleCheckShortMovies}
        checkedShortMovies={isShortMovies}
      />
      {notFound ? (
        <p className="movies__error">{isError}</p>
      ) : (
        <MoviesCardList
          visibleCards={visibleMovies}
          savedCards={savedMovies}
          onDeleteCard={onDeleteCard}
        />
      )}
    </main>
  );
}
