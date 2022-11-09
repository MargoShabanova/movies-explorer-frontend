import "./AboutMe.css";
import StudentPhoto from "../../images/student-photo.png";

export default function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h3 className="about-me__title">Студент</h3>
      <div className="about-me__container">
        <img
          className="about-me__photo"
          src={StudentPhoto}
          alt="Фото студента"
        />
        <div className="about-me__info">
          <h2 className="about-me__name">Маргарита</h2>
          <p className="about-me__about">Фронтенд-разработчик, 31 год</p>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <p className="about-me__github-link">Github</p>
        </div>
      </div>
    </section>
  );
}
