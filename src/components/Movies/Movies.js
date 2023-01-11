import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import { SEARCH_FORM_ERROR, NOT_FOUND_ERROR, DURATION } from "../../utils/constants";
import "./Movies.css";
import { moviesApi } from "../../utils/MoviesApi";

export default function Movies({
  isLoading,
  setIsLoading,
  onDeleteCard,
  onAddCard,
  savedMovies,
}) {
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isError, setIsError] = useState("");
  const [movies, setMovies] = useState([]);
  const [isSearch, setIsSearch] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState([]);

  useEffect(() => {
    const showMovies = JSON.parse(localStorage.getItem("movies"));
    if (localStorage.getItem("movies")) {
      setIsSearch(showMovies);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("short-movies") === "true") {
      setIsShortMovies(true);
    }
  }, [isShortMovies]);

  useEffect(() => {
    setVisibleMovies(isShortMovies ? filterCheckbox(isSearch) : isSearch);
  }, [isSearch, isShortMovies]);

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
      : null;
  }

  function handleSearch(cards, value) {
    const cardList = searchMovie(cards, value);

    if (cardList.length === 0) {
      setNotFound(true);
      setIsError(NOT_FOUND_ERROR);
      setIsSearch(cardList);
    } else {
      setNotFound(
        isShortMovies && filterCheckbox(cardList).length === 0 ? true : false
      );
      setIsError(
        isShortMovies && filterCheckbox(cardList).length === 0
          ? NOT_FOUND_ERROR
          : ""
      );
      setIsSearch(cardList);
    }
    localStorage.setItem("movies", JSON.stringify(cardList));
  }

  function handleSearchClick(keyWord) {
    localStorage.setItem("isSearch", keyWord);

    if (movies.length === 0) {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((res) => {
          setMovies(res);
          handleSearch(res, keyWord);
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setNotFound(true);
          setIsError(SEARCH_FORM_ERROR);
        });
    } else {
      handleSearch(movies, keyWord);
    }
  }

  function handleCheckShortMovies() {
    setIsShortMovies(!isShortMovies);
    localStorage.setItem("short-movies", isShortMovies);

    const movies = JSON.parse(localStorage.getItem("movies"));
    if (!isShortMovies) {
      setIsShortMovies(true);
      setVisibleMovies(filterCheckbox(movies));
      if (Array.isArray(movies) ? filterCheckbox(movies).length === 0 : null) {
        setNotFound(true);
        setIsError(NOT_FOUND_ERROR);
        if (localStorage.getItem("movies") === null) {
          setNotFound(true);
          setIsError(NOT_FOUND_ERROR);
        }
      } else {
        setNotFound(false);
        setIsError("");
      }
    } else {
      setIsShortMovies(false);
      setVisibleMovies(movies);
      if (Array.isArray(movies) ? movies.length === 0 : null) {
        setNotFound(true);
        setIsError(NOT_FOUND_ERROR);
      } else {
        setNotFound(false);
        setIsError("");
      }
    }
    localStorage.setItem("short-movies", !isShortMovies);
  }

  // const visibleMovies = isShortMovies
  //   ? movies.filter((item) => item.duration < 40)
  //   : movies;

  return (
    <main className="movies">
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
          onDeleteCard={onDeleteCard}
          onAddCard={onAddCard}
          savedCards={savedMovies}
        />
      )}
      {isLoading && <Preloader />}
    </main>
  );
}
