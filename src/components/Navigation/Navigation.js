import { NavLink, Link } from "react-router-dom";
import { Burger } from "../Burger/Burger";
import "./Navigation.css";

export default function Navigation({ menuActive, onClick }) {
  return (
    <>
      <nav className="navigation">
        <div className="navigation__movies-links">
          <NavLink
            to="/movies"
            className="navigation__link"
            activeClassName="navigation-link_active"
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="navigation__link"
            activeClassName="navigation-link_active"
          >
            Сохранённые фильмы
          </NavLink>
        </div>
        <Link to="/profile" className="navigation__account">
          <p className="navigation__account-link">Аккаунт</p>
          <div className="navigation__account-icon" />
        </Link>
      </nav>
      <Burger menuActive={menuActive} onClick={onClick} />
    </>
  );
}
