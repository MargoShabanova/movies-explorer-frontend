import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      <FilterCheckbox />
    </main>
  )
}