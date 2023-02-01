import { useLocation } from "react-router-dom";
import { BEATFILM_URL } from "../../utils/constants";
import "./MoviesCard.css";

export default function MoviesCard({
  card,
  onDeleteCard,
  onAddCard,
  savedCard,
}) {
  const location = useLocation();
  const savedMoviesPage = location.pathname === "/saved-movies";

  // const [isLiked, setIsLiked] = useState(false);

  // function handleLikeClick() {
  //   !isLiked
  //     ? setIsLiked(true) && onAddCard(card)
  //     : setIsLiked(false) && onDeleteCard(savedCard);
  // }

  // function handleDeleteClick() {
  //   setIsLiked(false);
  //   onDeleteCard(card._id);
  // }

  // useEffect(() => {
  //   setIsLiked(isLiked)
  // }, [isLiked]);

  function handleLikeClick() {
    onAddCard(card);
  }

  function handleDislikeClick() {
    onDeleteCard(savedCard);
  }

  function handleDeleteClick() {
    onDeleteCard(card);
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

  // const likeButtonClassName = `movies-card__button ${
  //   !isLiked
  //     ? "movies-card__button-like"
  //     : "movies-card__button-like_active"
  // }`;

  return (
    <li className={`movies-card ${savedMoviesPage && "movies-card__saved"}`}>
      <a className="movies-card__link" href={card.trailerLink}>
        <img
          className="movies-card__image"
          src={savedMoviesPage ? card.image : `${BEATFILM_URL}${card.image.url}`}
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
        {!savedMoviesPage && (
          <button
            className={`movies-card__button
            ${
              savedCard
                ? "movies-card__button-like_active"
                : "movies-card__button-like"
            }
          `}
            type="button"
            onClick={savedCard ? handleDislikeClick : handleLikeClick}
          ></button>
        )}
        {savedMoviesPage && (
          <button
            className="movies-card__button movies-card__button-delete"
            type="button"
            onClick={handleDeleteClick}
          ></button>
        )}
      </div>
    </li>
  );
}
