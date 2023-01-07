import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../utils/validation";
import "./Profile.css";

export default function Profile({ onUpdateUser, handleLogOut }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
      console.log(currentUser);
    }
  }, [currentUser, resetForm]);

  const checkedValidity =
    !isValid ||
    (currentUser.name === values.name && currentUser.email === values.email);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(values);
  }

  const buttonDisabled = checkedValidity ? true : false;

  return (
    <main className="profile">
      <form className="profile__form" noValidate onSubmit={handleSubmit}>
        <h2 className="profile__form-title">{`Привет, ${currentUser.name}!`}</h2>
        <fieldset className="profile__form-container">
          <label className="profile__input-container">
            <span className="profile__placeholder">Имя</span>
            <input
              value={values.name || ""}
              onChange={handleChange}
              className="profile__input"
              type="text"
              name="name"
              id="user-name"
              minLength="2"
              maxLength="40"
              required
            />
            <span
              className={`profile__error ${
                errors.name && "profile__error_active"
              }`}
            >
              {errors.name}
            </span>
          </label>
          <label className="profile__input-container">
            <span className="profile__placeholder">E-mail</span>
            <input
              value={values.email || ""}
              onChange={handleChange}
              className="profile__input"
              type="email"
              name="email"
              id="user-email"
              required
            />
            <span
              className={`profile__error profile__error-email ${
                errors.email && "profile__error_active"
              }`}
            >
              {errors.email}
            </span>
          </label>
          <button
            type="submit"
            className={`profile__form-button profile__form-button-submit ${
              checkedValidity && "profile__form-button-submit_disable"
            }`}
            disabled={buttonDisabled}
          >
            Редактировать
          </button>
          <button
            type="button"
            className="profile__form-button profile__form-button-exit"
            onClick={handleLogOut}
          >
            Выйти из аккаунта
          </button>
        </fieldset>
      </form>
    </main>
  );
}
