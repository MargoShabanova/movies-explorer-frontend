import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { WINDOW_WIDTH, SHOW_CARDS, LOADING_CARDS } from "../../utils/constants";

export default function MoviesCardList({
  visibleCards,
  savedCards,
  onAddCard,
  onDeleteCard,
}) {
  const [cardsArray, setCardsArray] = useState([]);
  const [isShowCards, setIsShowCards] = useState([]);
  const [showMoreCards, setShowMoreCards] = useState({ render: 12, load: 3 });

  const handleResize = () => window.innerWidth;
  const [isWindowWidth, setIsWindowWidth] = useState(handleResize());

  useEffect(() => {
    function handleTimeout() {
      setTimeout(() => setIsWindowWidth(handleResize()), 1000);
    }
    window.addEventListener("resize", handleTimeout);
    return () => window.removeEventListener("resize", handleTimeout);
  }, []);

  useEffect(() => {
    setShowMoreCards({
      render:
        isWindowWidth >= WINDOW_WIDTH.table
          ? SHOW_CARDS.desktop
          : isWindowWidth < WINDOW_WIDTH.table &&
            isWindowWidth > WINDOW_WIDTH.mobile
          ? SHOW_CARDS.table
          : SHOW_CARDS.mobile,
      load:
        isWindowWidth > WINDOW_WIDTH.table
          ? LOADING_CARDS.desktop
          : LOADING_CARDS.table,
    });
  }, [isWindowWidth]);

  const history = useHistory();

  const moviesPage = history.location.pathname === "/movies";

  useEffect(() => {
    Array.isArray(visibleCards)
      ? setCardsArray(visibleCards)
      : setCardsArray([]);
  }, [visibleCards]);

  useEffect(() => {
    if (cardsArray.length) {
      setIsShowCards(cardsArray.filter((item, i) => i < showMoreCards.render));
    }
  }, [cardsArray, showMoreCards.render]);

  function handleShowMoreCards() {
    const moreCards = cardsArray.length - isShowCards.length;

    if (moreCards > 0) {
      const newCards = cardsArray.slice(
        isShowCards.length,
        isShowCards.length + showMoreCards.load
      );
      setIsShowCards([...isShowCards, ...newCards]);
    }
  }

  const getSavedMovie = (arr, movie) => {
    return arr.find((item) => {
      return item.movieId === movie.id;
    });
  };

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">
        {moviesPage
          ? isShowCards.map((item) => (
              <MoviesCard
                key={item.id}
                card={item}
                savedCard={getSavedMovie(savedCards, item)}
                onAddCard={onAddCard}
                onDeleteCard={onDeleteCard}
              />
            ))
          : visibleCards.map((item) => (
              <MoviesCard
                key={item._id}
                card={item}
                onDeleteCard={onDeleteCard}
              />
            ))}
      </ul>
      <div className="movies-card-list__show-more">
        {isShowCards.length >= showMoreCards.render &&
          isShowCards.length < cardsArray.length && (
            <button
              type="button"
              className="movies-card-list__button"
              onClick={handleShowMoreCards}
            >
              Ещё
            </button>
          )}
      </div>
    </section>
  );
}
