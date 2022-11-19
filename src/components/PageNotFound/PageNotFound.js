import { useHistory } from "react-router-dom";
import "./PageNotFound.css";

export default function PageNotFound() {
  const history = useHistory();

  function goBack() {
    history.goBack();
  }

  return (
    <main className="error">
      <div className="error__container">
        <h1 className="error__number">404</h1>
        <p className="error__name">Страница не найдена</p>
        <button className="error__go-back" onClick={goBack}>
          Назад
        </button>
      </div>
    </main>
  );
}
