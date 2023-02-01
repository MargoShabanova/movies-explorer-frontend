import AuthForm from "../AuthForm/AuthForm";

export default function Login({ handleLogin, isError, isErrorMessage }) {

  return (
    <AuthForm
      name="login"
      title="Рады видеть!"
      buttonText="Войти"
      question="Ещё не зарегистрированы?"
      link="/signup"
      linkText="Регистрация"
      handleLogin={handleLogin}
      isError={isError}
      isErrorMessage={isErrorMessage}
    />
  )
}