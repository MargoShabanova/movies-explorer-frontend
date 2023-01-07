import "./FilterCheckbox.css";

export default function FilterCheckbox({ onCheckShortMovies, checkedShortMovies }) {
  return (
    <>
      <label className="checkbox">
        <input
          type="checkbox"
          name="checkbox"
          className="checkbox__invisible"
          id="checkbox"
          onChange={onCheckShortMovies}
          checked={checkedShortMovies}
        />
        <span className="checkbox__visible" />
        <p className="checkbox__title">Короткометражки</p>
      </label>
    </>
  );
}
