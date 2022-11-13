import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

export default function MoviesCard({ card, onCardDelete }) {
  const location = useLocation();
  const savedMovies = location.pathname === "/saved-movies";

  const [isLiked, setIsLiked] = useState(false);

  function handleLikeClick() {
    !isLiked ? setIsLiked(true) : setIsLiked(false);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const likeButtonClassName = `movies-card__button ${
    !isLiked ? "movies-card__button-like" : "movies-card__button-like_active"
  }`;

  return (
    <li className="movies-card">
      <img
        className="movies-card__image"
        src={card.image}
        alt="кадр из фильма"
      />
      <div className="movies-card__container">
        <div className="movies-card__name-container">
          <h2 className="movies-card__name">{card.title}</h2>
          <h3 className="movies-card__duration">{card.duration}</h3>
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
