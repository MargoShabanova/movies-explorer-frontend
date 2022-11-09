import { Link } from "react-router-dom";
import profile from "../../images/icon__profile.svg";
import './Navigation.css';

export default function Navigation() {
  return (
    <>
      <nav className="navigation__movies-links">
        <Link to="/movies" className="navigation-link navigation-link__all-movies">Фильмы</Link>
        <Link to="/saved-movies" className="navigation-link navigation-link__saved-movies">Сохранённые фильмы</Link>
      </nav>
      <Link to="/profile" className="navigation-link">
        <p className="navigation-link__profile">Аккаунт</p>
        <img src={profile} className="navigation__img-profile" alt="Профиль" />
      </Link>
    </>
  )
}