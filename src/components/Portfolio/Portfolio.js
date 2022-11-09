import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__items">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/MargoShabanova/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            <h2 className="portfolio__site-name">Статичный сайт</h2>
            <div className="portfolio__link-icon"></div>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/MargoShabanova/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            <h2 className="portfolio__site-name">Адаптивный сайт</h2>
            <div className="portfolio__link-icon"></div>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/MargoShabanova/react-mesto-api-full"
            target="_blank"
            rel="noreferrer"
          >
            <h2 className="portfolio__site-name">Одностраничное приложение</h2>
            <div className="portfolio__link-icon"></div>
          </a>
        </li>
      </ul>
      {/* <h2 className="portfolio__link">Статичный сайт</h2>
      <h2 className="portfolio__link">Адаптивный сайт</h2>
      <h2 className="portfolio__link">Одностраничное приложение</h2> */}
    </section>
  );
}
