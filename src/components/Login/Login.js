import AuthForm from "../AuthForm/AuthForm";
import { useState } from "react";

export default function Login({ handleLogin }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  function handleSubmit(e) {
    e.preventDefault();

    if (!userData.email || !userData.password) {
      return;
    }
    const { email, password } = userData;
    handleLogin(email, password);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  return (
    <AuthForm
      name="login"
      title="Рады видеть!"
      emailValue={userData.email}
      passwordlValue={userData.password}
      buttonText="Войти"
      onSubmit={handleSubmit}
      question="Ещё не зарегистрированы?"
      link="/signup"
      linkText="Регистрация"
      handleChange={handleChange}
    />
  )
}