import AuthForm from "../AuthForm/AuthForm";

export default function Register({ handleRegister, isError, isErrorMessage }) {

  return (
    <AuthForm
      name="register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      link="/signin"
      linkText="Войти"
      handleRegister={handleRegister}
      isError={isError}
      isErrorMessage={isErrorMessage}
      />
  )
}
