import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import { useFormWithValidation } from "../../utils/validation";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ENTER_KEYWORD_ERROR } from "../../utils/constants";

export default function SearchForm({
  handleSearch,
  onCheckShortMovies,
  checkedShortMovies,
}) {
  const { values, handleChange, isValid, setIsValid } =
    useFormWithValidation();

  const [isError, setIsError] = useState("");

  const location = useLocation();
  const moviesPage = location.pathname === "/movies";
  const savedMoviesPage = location.pathname === "/saved-movies";

  useEffect(() => {
    if (moviesPage && localStorage.getItem("isSearch")) {
      const value = localStorage.getItem("isSearch");
      values.search = value;
      setIsValid(true);
    }
  }, [moviesPage]);

  useEffect(() => {
    setIsError("");
  }, [isValid]);

  function handleSubmit(e) {
    e.preventDefault();

    if (isValid) {
      if (moviesPage && localStorage.getItem("isSearch")) {
        localStorage.setItem("isSearch", values.search);
      }
      handleSearch(values.search);
    } else {
      if (moviesPage && localStorage.getItem("isSearch")) {
        localStorage.setItem("isSearch", "");
      } else if (savedMoviesPage) {
        handleSearch("");
      }
      setIsError(ENTER_KEYWORD_ERROR);
    }
  }

  return (
    <section className="search">
      <form className="search-form" onSubmit={handleSubmit} noValidate>
        <label className="search-form__container">
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            name="search"
            id="search-movies"
            required
            value={values.search || ""}
            onChange={handleChange}
          />
          <button className="search-form__submit" type="submit"></button>
        </label>
      </form>
      <FilterCheckbox
        onCheckShortMovies={onCheckShortMovies}
        checkedShortMovies={checkedShortMovies}
      />
      <span className="search_form__error">{isError}</span>
    </section>
  );
}
