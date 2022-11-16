import { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import "./Register.css";

export default function Register({ handleRegister }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  })

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { name, email, password } = userData;
    handleRegister(name, email, password);
  }

  return (
    <AuthForm
      name="register"
      title="Добро пожаловать!"
      nameValue={userData.name}
      emailValue={userData.email}
      passwordlValue={userData.password}
      buttonText="Зарегистрироваться"
      onSubmit={handleSubmit}
      question="Уже зарегистрированы?"
      link="/signin"
      linkText="Войти"
      handleChange={handleChange}
      />
  )
}
