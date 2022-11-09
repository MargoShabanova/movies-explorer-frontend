import "./AboutProject.css";

export default function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h3 className="about-project__title">О проекте</h3>
      <div className="about-project__content-container">
        <div className="about-project__column">
          <h2 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h2>
          <p className="about-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__column">
          <h2 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h2>
          <p className="about-project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__scale">
        <div className="about-project__backend">
          <div className="about-project__backend-scale">1 неделя</div>
          <p className="about-project__part-name">Back-end</p>
        </div>
        <div className="about-project__frontend">
          <div className="about-project__frontend-scale">4 недели</div>
          <p className="about-project__part-name">Front-end</p>
        </div>
      </div>
    </section>
  );
}
