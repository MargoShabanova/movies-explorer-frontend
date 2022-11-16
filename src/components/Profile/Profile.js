import { useState, useEffect } from "react";
import "./Profile.css";

export default function Profile({ userData, handleLogOut }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(userData.name || "");
    setEmail(userData.email || "");
  }, [userData]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <main className="profile">
      <form className="profile__form">
        <h2 className="profile__form-name">{`Привет, ${name}!`}</h2>
        <fieldset className="profile__form-container">
          <label className="profile__input-container">
            <span className="profile__placeholder">Имя</span>
            <input
              value={name}
              onChange={handleChangeName}
              className="profile__input"
              type="text"
              name="name"
              id="user-name"
              minLength="2"
              maxLength="40"
              required
            />
          </label>
          <label className="profile__input-container">
            <span className="profile__placeholder">E-mail</span>
            <input
              value={email}
              onChange={handleChangeEmail}
              className="profile__input"
              type="email"
              name="email"
              id="user-email"
              required
            />
          </label>
          <button
            type="submit"
            className="profile__form-button profile__form-button-submit"
            onClick={handleSubmit}
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
