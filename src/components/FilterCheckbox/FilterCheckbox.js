import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <>
    <label className="checkbox">
      <input type="checkbox" className="checkbox__invisible" />
      <span className="checkbox__visible" />
      <p className="checkbox__title">Короткометражки</p>
    </label>
    {/* <div className="checkbox__line" /> */}
    </>
  )
}