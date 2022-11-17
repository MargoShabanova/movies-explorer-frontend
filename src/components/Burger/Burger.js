import { NavLink, Link } from "react-router-dom";
import "./Burger.css";

export function Burger({ menuActive, onClick }) {
  return (
    <button type="button" className={`burger ${menuActive && "burger_active"}`} onClick={onClick}>
      <span />
    </button>
  );
}

export function BurgerMenu({ isOpen, onClose }) {
  return (
    <div
      className={`burger__navigation ${isOpen && "burger__navigation_opened"}`}
    >
      <div className="burger__navigation-container">
        <Link
          to="/"
          className="burger__navigation-link"
          onClick={onClose}
        >
          Главная
        </Link>
        <NavLink
          to="/movies"
          className="burger__navigation-link"
          activeClassName="burger__navigation-link_active"
          onClick={onClose}
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className="burger__navigation-link"
          activeClassName="burger__navigation-link_active"
          onClick={onClose}
        >
          Сохранённые фильмы
        </NavLink>
        <Link
          to="/profile"
          className="burger__navigation-account"
          onClick={onClose}
        >
          <p className="burger__navigation-account-link">Аккаунт</p>
          <div className="burger__navigation-account-icon" />
        </Link>
      </div>
    </div>
  );
}
