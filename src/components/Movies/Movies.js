import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
// import { allMovies } from '../../utils/constants';

export default function Movies({ allMovies }) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList cards={allMovies} />
    </main>
  )
}