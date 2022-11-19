import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./AuthForm.css";

export default function AuthForm({
  name,
  title,
  nameValue,
  emailValue,
  passwordlValue,
  buttonText,
  onSubmit,
  question,
  link,
  linkText,
  handleChange
}) {
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const registerRoute = location.pathname === "/signup";

  return (
    <main className={`auth auth_type_${name}`}>
      <form className={`form form_type_${name}`} onSubmit={onSubmit}>
        <h2 className="form__title">{title}</h2>
        <fieldset className="form__container">
          {registerRoute && (
            <label className="form__input-container">
              <span className="form__span-placeholder">Имя</span>
              <input
                value={nameValue}
                onChange={handleChange}
                className={`form__input ${isError && "form__input-error"}`}
                type="text"
                name="name"
                id="name"
                minLength="2"
                maxLength="40"
                required
              />
              <span
                className={`form__span-error name-input-error ${
                  isError && "form__span-error_active"
                }`}
              >
                Что-то пошло не так...
              </span>
            </label>
          )}
          <label className="form__input-container">
            <span className="form__span-placeholder">E-mail</span>
            <input
              value={emailValue}
              onChange={handleChange}
              className={`form__input ${isError && "form__input-error"}`}
              type="email"
              name="email"
              id="email"
              required
            />
            <span
              className={`form__span-error name-input-error ${
                isError && "form__span-error_active"
              }`}
            >
              Что-то пошло не так...
            </span>
          </label>
          <label className="form__input-container">
            <span className="form__span-placeholder">Пароль</span>
            <input
              value={passwordlValue}
              onChange={handleChange}
              className={`form__input ${isError && "form__input-error"}`}
              type="password"
              name="password"
              id="password"
              maxLength="10"
              required
            />
            <span
              className={`form__span-error name-input-error ${
                isError && "form__span-error_active"
              }`}
            >
              Что-то пошло не так...
            </span>
          </label>
        </fieldset>
        <button className="form__submit" type="submit">
          {buttonText}
        </button>
        <p className="form__question">
          {question}
          <Link className="form__link" to={link}>
            {linkText}
          </Link>
        </p>
      </form>
    </main>
  );
}
