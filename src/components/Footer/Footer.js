import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__copyright">
        <p className="footer__year">© 2020</p>
        <nav className="footer__links">
          <a className="footer__link" href="https://practicum.yandex.ru/">
            Яндекс.Практикум
          </a>
          <a className="footer__link" href="https://github.com/">
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
}
