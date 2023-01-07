import { useState } from "react";
import { useLocation } from "react-router-dom";
import { beatfilmUrl } from "../../utils/constants";
import "./MoviesCard.css";

export default function MoviesCard({
  card,
  onDeleteCard,
  onAddCard,
  savedCard
}) {
  const location = useLocation();
  const savedMovies = location.pathname === "/saved-movies";

  const [isLiked, setIsLiked] = useState(false);

  function handleLikeClick() {
    !isLiked
      ? setIsLiked(true) && onAddCard(card)
      : setIsLiked(false) && onDeleteCard(savedCard);
  }

  function handleDeleteClick() {
    setIsLiked(false);
    onDeleteCard(card._id);
  }

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    if (hours === 0) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }

  const likeButtonClassName = `movies-card__button ${
    !isLiked
      ? "movies-card__button-like"
      : "movies-card__button-like_active"
  }`;

  return (
    <li className={`movies-card ${savedMovies && "movies-card__saved"}`}>
      <a className="movies-card__link" href={card.trailerLink}>
        <img
          className="movies-card__image"
          src={`${beatfilmUrl}${card.image.url}`}
          alt="кадр из фильма"
        />
      </a>
      <div className="movies-card__container">
        <div className="movies-card__name-container">
          <h2 className="movies-card__name">{card.nameRU}</h2>
          <h3 className="movies-card__duration">
            {getTimeFromMins(card.duration)}
          </h3>
        </div>
        <button
          className={
            savedMovies
              ? "movies-card__button movies-card__button-delete"
              : likeButtonClassName
          }
          type="button"
          onClick={savedMovies ? handleDeleteClick : handleLikeClick}
        ></button>
      </div>
    </li>
  );
}
