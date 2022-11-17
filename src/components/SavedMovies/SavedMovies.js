import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";
import { savedMovies } from "../../utils/constants";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies() {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList cards={savedMovies}/>
    </main>
  );
}
