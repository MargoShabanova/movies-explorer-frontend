import logo from "../../images/logo.svg";
import { Route, Link } from "react-router-dom";
import './Logo.css';

export default function Logo() {
  return (
    <div className="logo">
      <Route path="/">
        <Link className="logo__link" to="/">
          <img className="logo__img" src={logo} alt="Лого" />
        </Link>
      </Route>
    </div>
  );
}
