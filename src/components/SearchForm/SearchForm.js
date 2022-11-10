import './SearchForm.css';

export default function SearchForm() {
  return (
    <section className="search">
      <form className="search-form">
        <label className="search-form__container">
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            name="search"
            id="search-movies"
            required
          />
          <button className="search-form__submit" type="submit"></button>
        </label>
      </form>
    </section>
  );
}
