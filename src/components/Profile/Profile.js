import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Profile.css";

export default function Profile({ userData, onUpdateUser }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      email,
    });
  }

  function handleLogOut() {
    setName("");
    setEmail("");
    history.push("/");
  }

  return (
    <main className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
      <h2 className="profile__form-name">{`Привет, ${userData.name}!`}</h2>
        <fieldset className="profile__form-container">
          <label className="profile__input-container">
            <span className="profile__placeholder">Имя</span>
            <input
              value={userData.name}
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
              value={userData.email}
              onChange={handleChangeEmail}
              className="profile__input"
              type="email"
              name="email"
              id="user-email"
              required
            />
          </label>
          <button type="submit" className="profile__form-submit">
            Редактировать
          </button>
          <button type="button" className="profile__form-exit" onClick={handleLogOut}>
            Выйти из аккаунта
          </button>
        </fieldset>
      </form>
    </main>
  );
}
