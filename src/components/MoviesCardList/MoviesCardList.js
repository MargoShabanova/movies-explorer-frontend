import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ cards, onCardDelete }) {

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">
        {cards.map((item) => (
          <MoviesCard key={item.id} card={item} />
        ))}
      </ul>
      <button type="button" className="movies-card-list__button">Ещё</button>
    </section>
  );
}