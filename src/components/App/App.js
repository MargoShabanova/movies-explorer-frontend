import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { Route, Switch } from "react-router-dom";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header loggedIn={false} />
          <Main />
          <Footer />
        </Route>
        <Route exact path="/movies">
          <Header loggedIn={true} />
          <Movies />
          <Footer />
        </Route>
        <Route exact path="/saved-movies">
          <Header loggedIn={true} />
          <SavedMovies />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
