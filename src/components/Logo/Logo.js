import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import "./Logo.css";

export default function Logo() {
  const location = useLocation();
  const authForms =
    location.pathname === "/signup" || location.pathname === "/signin";

  return (
    <div className={`${authForms && "logo__auth"}`}>
      <Link className="logo__link" to="/">
        <img className="logo__img" src={logo} alt="Лого" />
      </Link>
    </div>
  );
}
