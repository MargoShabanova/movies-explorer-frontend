import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

export default function SearchForm({
  handleSubmit,
  handleChange,
  value,
  onCheckShortMovies,
  checkedShortMovies,
}) {
  return (
    <section className="search">
      <form className="search-form" onSubmit={handleSubmit}>
        <label className="search-form__container">
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            name="search"
            id="search-movies"
            required
            value={value}
            onChange={handleChange}
          />
          <button className="search-form__submit" type="submit"></button>
        </label>
      </form>
      <FilterCheckbox
        onCheckShortMovies={onCheckShortMovies}
        checkedShortMovies={checkedShortMovies}
      />
    </section>
  );
}
