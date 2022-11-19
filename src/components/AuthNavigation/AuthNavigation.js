import React from "react";
import { Link } from "react-router-dom";
import './AuthNavigation.css';

export default function AuthNavigation() {
  return (
    <nav className="auth-navigation">
      <Link to="/signup" className="auth-link auth-link__signup">
        Регистрация
      </Link>
      <Link to="/signin" className="auth-link auth-link__signin">
        Войти
      </Link>
    </nav>
  );
}
