import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useState } from "react";
import { useEffect } from "react";
import Preloader from "../Preloader/Preloader";

export default function SavedMovies({
  isShowCards,
  setIsShowCards,
  savedMovies,
  isSearchFormError,
  setIsSearchFormError,
  isSearchValue,
  setIsSearchValue,
  setIsMoviesSearch,
  isLoading,
  setIsLoading,
  onDeleteCard,
  onAddCard,
  isLiked,
  checkId,
}) {
  const [isShortMovies, setIsShortMovies] = useState(false);

  // useEffect(() => {
  //   setIsShowCards(savedMovies);
  //   setIsSearchFormError("");
  //   setIsSearchValue("");
  // }, []);

  function handleSearchMovies() {
    const filter = savedMovies.filter((item) =>
      item.nameRU.toLowerCase().includes(isSearchValue.toLowerCase())
    );
    filter.length === 0
      ? setIsSearchFormError("Ничего не найдено")
      : setIsShowCards(filter) && setIsMoviesSearch(filter);

    setIsLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    isSearchValue && handleSearchMovies();
  }

  function handleCheckShortMovies() {
    setIsShortMovies(!isShortMovies);
  }

  const visibleMovies = isShortMovies
    ? isShowCards.filter((item) => item.duration < 40)
    : isShowCards;

  function handleChange(e) {
    setIsSearchValue(e.target.value);
    // setIsError(false);
  }

  return (
    <main className="saved-movies">
      <SearchForm
        handleSubmit={handleSubmit}
        value={isSearchValue}
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
          checkId={checkId}
          isLiked={isLiked}
          isSearchFormError={isSearchFormError}
        />
      )}
    </main>
  );
}
