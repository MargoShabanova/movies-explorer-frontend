import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ cards }) {

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

// import "./MoviesCardList.css";
// import MoviesCard from "../MoviesCard/MoviesCard";
// import {
//   WINDOW_WIDTH,
//   AMOUNT_CARDS,
//   LOADING_CARDS,
// } from "../../utils/constants";
// import { useState } from "react";
// import { useEffect } from "react";

// export default function MoviesCardList({
//   movies,
//   onDeleteCard,
//   onAddCard,
//   savedCards,
// }) {
//   const handleResize = () => window.innerWidth;

//   const [isWindowWidth, setIsWindowWidth] = useState(handleResize());
//   const [cardRender, setCardRender] = useState({ render: 12, load: 3 });
//   const [visibleCards, setVisibleCards] = useState([]);
//   const [cardsArray, setCardsArray] = useState([]);

//   useEffect(() => {
//     function handleTimeout() {
//       setTimeout(() => setIsWindowWidth(handleResize()), 1000);
//     }
//     window.addEventListener("resize", handleTimeout);
//     return () => window.removeEventListener("resize", handleTimeout);
//   }, []);

//   function handleClickMore() {
//     const moreMovies = cardsArray.length - visibleCards.length;
//     if (moreMovies > 0) {
//       const newCards = cardsArray.slice(
//         visibleCards.length,
//         visibleCards.length + cardRender.load
//       );
//       setVisibleCards([...visibleCards, ...newCards]);
//     }
//   }

//   useEffect(() => {
//     Array.isArray(movies) ? setCardsArray(movies) : setCardsArray([]);
//   }, [movies]);

//   useEffect(() => {
//     if (cardsArray.length) {
//       setVisibleCards(cardsArray.filter((item, i) => i < cardRender.render));
//     }
//   }, [cardsArray, cardRender.render]);

//   useEffect(() => {
//     setCardRender({
//       render:
//         isWindowWidth >= WINDOW_WIDTH.desktop &&
//         isWindowWidth < WINDOW_WIDTH.desktop &&
//         isWindowWidth > WINDOW_WIDTH.table
//           ? AMOUNT_CARDS.desktop
//           : isWindowWidth < WINDOW_WIDTH.table &&
//             isWindowWidth > WINDOW_WIDTH.mobile
//           ? AMOUNT_CARDS.table
//           : AMOUNT_CARDS.mobile,
//       load:
//         isWindowWidth > WINDOW_WIDTH.table
//           ? LOADING_CARDS.desktop
//           : LOADING_CARDS.table,
//     });
//   }, [isWindowWidth]);

//   const getSavedCard = (arr, movie) => {
//     return arr.find((item) => {
//       return item.movieId === movie.id;
//     });
//   };

//   return (
//     <section className="movies-card-list">
//       {movies.length === 0 ? (
//         <p className="movies-card-list__error">Ничего не найдено</p>
//       ) : (
//         <ul className="movies-card-list__container">
//           {movies.map((item) => (
//             <MoviesCard
//               key={item.id || item._id}
//               card={item}
//               onDeleteCard={onDeleteCard}
//               onAddCard={onAddCard}
//               savedCard={getSavedCard(savedCards, item)}
//             />
//           ))}
//         </ul>
//       )}
//       {/* // {isSearchFormError !== "" && (
//       //   <p className="movies-card-list__error">{isSearchFormError}</p>
//       // )}
//       // {movies.length > isAmountCards && movies.length > isShowCards && ( */}
//       <button
//         type="button"
//         className="movies-card-list__button"
//         onClick={handleClickMore}
//       >
//         Ещё
//       </button>
//       {/* )} */}
//     </section>
//   );
// }
