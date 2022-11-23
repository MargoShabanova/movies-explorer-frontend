import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { Route, Switch, useHistory } from "react-router-dom";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Logo from "../Logo/Logo";
import { useState } from "react";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import { BurgerMenu } from "../Burger/Burger";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "Маргарита",
    email: "123@ya.ru",
    password: "",
  });

  const history = useHistory();

  const handleRegister = () => {
    setLoggedIn(true);
    history.push("/");
  };

  const handleLogin = () => {
    setLoggedIn(true);
    history.push("/");
  };

  const handleLogOut = () => {
    setUserData({
      name: "",
      email: "",
      password: "",
    });
    setLoggedIn(false);
    history.push("/");
  };

  const handleToggleMenu = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/signup">
            <Logo />
            <Register handleRegister={handleRegister} />
          </Route>
          <Route exact path="/signin">
            <Logo />
            <Login handleLogin={handleLogin} />
          </Route>
          <Route exact path="/">
            <Header
              loggedIn={loggedIn}
              menuActive={isOpen}
              onClick={handleToggleMenu}
            />
            <Main />
            <Footer />
          </Route>
          <Route exact path="/movies">
            <Header
              loggedIn={loggedIn}
              menuActive={isOpen}
              onClick={handleToggleMenu}
            />
            <Movies />
            <Footer />
          </Route>
          <Route exact path="/saved-movies">
            <Header
              loggedIn={loggedIn}
              menuActive={isOpen}
              onClick={handleToggleMenu}
            />
            <SavedMovies />
            <Footer />
          </Route>
          <Route exact path="/profile">
            <Header
              loggedIn={loggedIn}
              menuActive={isOpen}
              onClick={handleToggleMenu}
            />
            <Profile userData={userData} handleLogOut={handleLogOut} />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        <BurgerMenu isOpen={isOpen} onClose={handleToggleMenu} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
