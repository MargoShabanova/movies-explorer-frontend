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
import { useState, useEffect } from "react";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import { BurgerMenu } from "../Burger/Burger";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  // const [userData, setUserData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  const history = useHistory();

  const handleRegister = (name, email, password) => {
    mainApi
      .signUp(name, email, password)
      .then((res) => {
        if (res.ok) {
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = (email, password) => {
    mainApi
      .signIn(email, password)
      .then((res) => {
        console.log([currentUser]);
        if (res.ok) {
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogOut = () => {
    mainApi
      .signOut()
      .then(() => {
        setCurrentUser({
          name: "",
          email: "",
          password: "",
        });
        setLoggedIn(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getProfile(), moviesApi.getMovies()])
        .then(([currentUser, allMovies]) => {
          setCurrentUser(currentUser);
          setMovies(allMovies);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

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
            <Movies allMovies={movies}/>
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
            <Profile userData={currentUser} handleLogOut={handleLogOut} />
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
