import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Burger.css";

export default function Burger() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenMenu() {
    setIsOpen(true);
  }

  return (
    <>
      <button type="button" className="burger" onClick={handleOpenMenu}>
        <span />
      </button>
    </>
    // <div
    //     className={`burger__navigation ${
    //       isOpen && "burger__navigation_opened"
    //     }`}
    //   >
    //     <div className="burger__navigation-container">
    //       <NavLink
    //         to="/"
    //         className="navigation__link"
    //         activeClassName="navigation-link_active"
    //       >
    //         Главная
    //       </NavLink>
    //       <NavLink
    //         to="/movies"
    //         className="navigation__link"
    //         activeClassName="navigation-link_active"
    //       >
    //         Фильмы
    //       </NavLink>
    //       <NavLink
    //         to="/saved-movies"
    //         className="navigation__link"
    //         activeClassName="navigation-link_active"
    //       >
    //         Сохранённые фильмы
    //       </NavLink>
    //       <Link to="/profile" className="navigation__account">
    //         <p className="navigation__account-link">Аккаунт</p>
    //         <div className="navigation__account-icon" />
    //       </Link>
    //     </div>
    //   </div>
    // </>
  );
}
