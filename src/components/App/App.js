import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { mainApi } from "../../utils/MainApi";
import {
  EDIT_PROFILE_SUCCESS,
  TRY_AGAIN_ERROR,
  SERVER_ERROR,
  INCORRECT_DATA_ERROR,
  EMAIL_ERROR,
} from "../../utils/constants";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") || false
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getProfile(), mainApi.getMovies()])
        .then(([currentUser, myMovies]) => {
          setLoggedIn(true);
          setCurrentUser(currentUser);
          setIsLoading(true);
          setSavedMovies(myMovies);
          console.log([myMovies]);
          console.log(loggedIn);
          localStorage.setItem("location", sessionStorage);
          history.push(location);
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
          if (err) {
            setCurrentUser({
              name: "",
              email: "",
              password: "",
            });
            localStorage.clear();
            setLoggedIn(false);
            history.push("/");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const handleRegister = (name, email, password) => {
    mainApi
      .signUp(name, email, password)
      .then((res) => {
        if (res.ok) {
          setLoggedIn(true);
          localStorage.setItem("loggedIn", true);
          history.push("/movies");
        } else {
          setIsError(true);
          if (res.status === 409) {
            setIsErrorMessage(EMAIL_ERROR);
          } else if (res.status === 500) {
            setIsErrorMessage(SERVER_ERROR);
          } else if (res.status === 400) {
            setIsErrorMessage(INCORRECT_DATA_ERROR);
          } else {
            setIsErrorMessage(TRY_AGAIN_ERROR);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = (email, password) => {
    mainApi
      .signIn(email, password)
      .then((res) => {
        if (res.ok) {
          setLoggedIn(true);
          localStorage.setItem("loggedIn", true);
          history.push("/movies");
          localStorage.setItem("location", sessionStorage);
        } else {
          setIsError(true);
          if (res.status === 500) {
            setIsErrorMessage(SERVER_ERROR);
          } else if (res.status === 400) {
            setIsErrorMessage(INCORRECT_DATA_ERROR);
          } else {
            setIsErrorMessage(TRY_AGAIN_ERROR);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const setTimerForMessage = () => {
    setTimeout(() => setIsErrorMessage(""), 5000);
  };

  const handleUpdateUser = (data) => {
    mainApi
      .editProfile(data.name, data.email)
      .then((res) => {
        setCurrentUser(res);
        setIsErrorMessage(EDIT_PROFILE_SUCCESS);
        setTimerForMessage();
      })
      .catch((err) => {
        console.log(err);
        setIsErrorMessage(TRY_AGAIN_ERROR);
        setTimerForMessage();
      });
  };

  const handleLogOut = () => {
    mainApi
      .signOut()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser({
          name: "",
          email: "",
          password: "",
        });
        localStorage.clear();
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggleMenu = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const handleLikeMovie = (movie) => {
    mainApi.addMovie(movie).then((res) => {
      setSavedMovies([...savedMovies, res]);
    });
  };

  const handleDeleteMovie = (movie) => {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((arr) => arr.filter((item) => item._id !== movie._id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/signup">
            <Logo />
            <Register
              handleRegister={handleRegister}
              isError={isError}
              isErrorMessage={isErrorMessage}
            />
          </Route>
          <Route exact path="/signin">
            <Logo />
            <Login
              handleLogin={handleLogin}
              isError={isError}
              isErrorMessage={isErrorMessage}
            />
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
          <ProtectedRoute exact path="/movies" loggedIn={loggedIn}>
            <Header
              loggedIn={loggedIn}
              menuActive={isOpen}
              onClick={handleToggleMenu}
            />
            <Movies
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              onDeleteCard={handleDeleteMovie}
              onAddCard={handleLikeMovie}
              savedMovies={savedMovies}
            />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute exact path="/saved-movies" loggedIn={loggedIn}>
            <Header
              loggedIn={loggedIn}
              menuActive={isOpen}
              onClick={handleToggleMenu}
            />
            <SavedMovies
              savedMovies={savedMovies}
              onDeleteCard={handleDeleteMovie}
            />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile" loggedIn={loggedIn}>
            <Header
              loggedIn={loggedIn}
              menuActive={isOpen}
              onClick={handleToggleMenu}
            />
            <Profile
              onUpdateUser={handleUpdateUser}
              handleLogOut={handleLogOut}
              message={isErrorMessage}
            />
          </ProtectedRoute>
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
