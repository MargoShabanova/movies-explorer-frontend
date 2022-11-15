import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { Route, Switch } from "react-router-dom";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";

function App() {
  const currentUSer = {
    name: "Маргарита",
    email: "123@ya.ru",
  };

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
        <Route exact path="/profile">
          <Header loggedIn={true} />
          <Profile userData={currentUSer} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
