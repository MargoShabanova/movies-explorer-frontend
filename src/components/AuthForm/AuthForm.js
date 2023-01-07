import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFormWithValidation } from "../../utils/validation";
import "./AuthForm.css";

export default function AuthForm({
  name,
  title,
  buttonText,
  question,
  link,
  linkText,
  handleRegister,
  handleLogin,
  isError,
  isErrorMessage
}) {

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const location = useLocation();
  const registerRoute = location.pathname === "/signup";

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    if (registerRoute) {
      handleRegister(values.name, values.email, values.password);
    } else {
      handleLogin(values.email, values.password);
    }
  }

  return (
    <main className={`auth auth_type_${name}`}>
      <form className={`form form_type_${name}`} onSubmit={handleSubmit}>
        <h2 className="form__title">{title}</h2>
        <fieldset className="form__container">
          {registerRoute && (
            <label className="form__input-container">
              <span className="form__span-placeholder">Имя</span>
              <input
                value={values.name || ""}
                onChange={handleChange}
                className={`form__input ${errors.name && "form__input-error"}`}
                type="text"
                name="name"
                id="name"
                minLength="2"
                maxLength="40"
                pattern="[A-Za-z А-Яа-яёЁ]{2,40}"
                required
              />
              <span
                className={`form__span-error name-input-error ${
                  errors.name && "form__span-error_active"
                }`}
              >
                {errors.name}
              </span>
            </label>
          )}
          <label className="form__input-container">
            <span className="form__span-placeholder">E-mail</span>
            <input
              value={values.email || ""}
              onChange={handleChange}
              className={`form__input ${errors.email && "form__input-error"}`}
              type="email"
              name="email"
              id="email"
              required
            />
            <span
              className={`form__span-error name-input-error ${
                errors.email &&
                "form__span-error_active form__span-error_active-email"
              }`}
            >
              {errors.email}
            </span>
          </label>
          <label className="form__input-container">
            <span className="form__span-placeholder">Пароль</span>
            <input
              value={values.password || ""}
              onChange={handleChange}
              className={`form__input ${
                errors.password && "form__input-error"
              }`}
              type="password"
              name="password"
              id="password"
              maxLength="10"
              required
            />
            <span
              className={`form__span-error name-input-error ${
                errors.password && "form__span-error_active"
              }`}
            >
              {errors.password}
            </span>
          </label>
        </fieldset>
        <button
          className={`form__submit ${!isValid && "form__submit_disable"}`}
          type="submit"
          disabled={!isValid}
        >
          <span
            className={`form__error ${isError && "form__error_active"}`}
          >
            {isErrorMessage}
          </span>
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
