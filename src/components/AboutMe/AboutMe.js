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
            Я родилась и выросла в городе Сергиев Посад, во время учебы в
            институте переехала в Москву. Училась на дизайнера, но всегда
            хотелось заниматься чем-то другим, так я попала в Практикум и начала
            кодить. В свободное время нравится рисовать, кататься на сноуборде и
            лонгборде, люблю животных и по мере возможности стараюсь помогать
            приютам.
          </p>
          <a
            className="about-me__github-link"
            href="https://github.com/MargoShabanova"
          >
            Github
          </a>
        </div>
      </div>
    </section>
  );
}
