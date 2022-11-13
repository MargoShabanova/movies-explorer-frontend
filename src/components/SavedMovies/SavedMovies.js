import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";
import { savedMovies } from "../../utils/constants";

export default function SavedMovies() {
  return (
    <main className="saved-movies">
      <MoviesCardList cards={savedMovies}/>
    </main>
  );
}
