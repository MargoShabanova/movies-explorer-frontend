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
import { moviesApi } from "../../utils/MoviesApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState("");

  const [movies, setMovies] = useState([]);

  const history = useHistory();
  const location = useLocation();

  const handleRegister = (name, email, password) => {
    mainApi
      .signUp(name, email, password)
      .then((res) => {
        if (res.ok) {
          setLoggedIn(true);
          history.push("/movies");
        } else {
          setIsError(true);
          if (res.status === 409) {
            setIsErrorMessage("Данный email уже существует.");
          } else if (res.status === 500) {
            setIsErrorMessage("На сервере произошла ошибка");
          } else if (res.status === 400) {
            setIsErrorMessage("Переданы некорректные данные.");
          } else {
            setIsErrorMessage("Произошла ошибка, попробуйте еще раз.");
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
          history.push("/movies");
        } else {
          setIsError(true);
          if (res.status === 500) {
            setIsErrorMessage("На сервере произошла ошибка");
          } else if (res.status === 400) {
            setIsErrorMessage("Переданы некорректные данные.");
          } else {
            setIsErrorMessage("Произошла ошибка, попробуйте еще раз.");
          }
        }
      })
      .catch((err) => console.log(err));
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

  useEffect(() => {
    Promise.all([mainApi.getProfile(), moviesApi.getMovies()])
      .then(([currentUser, allMovies]) => {
        setLoggedIn(true);
        setCurrentUser(currentUser);
        setMovies(allMovies);
        localStorage.setItem("location", sessionStorage);
        history.push(location);
      })
      .catch((err) => {
        console.log(err);
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
      });
  }, [loggedIn, history]);

  const handleUpdateUser = (data) => {
    mainApi
      .editProfile(data.name, data.email)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
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
              movies={movies}
              // isSearchValue={isSearchValue}
              // setIsSearchValue={setIsSearchValue}
              // isSearchFormError={isSearchFormError}
              // setIsSearchFormError={setIsSearchFormError}
              // setIsMoviesSearch={setIsMoviesSearch}
              // isLoading={isLoading}
              // setIsLoading={setIsLoading}
              // onClick={handleSearchClick}
              // onDeleteCard={handleDeleteCard}
              // onAddCard={handleAddCard}
              // checkId={checkId}
              // isLiked={checkLike}
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
            // isShowCards={isShowCards}
            // setIsShowCards={setIsShowCards}
            // savedMovies={isSavedMovies}
            // isSearchFormError={isSearchFormError}
            // setIsSearchFormError={setIsSearchFormError}
            // isSearchValue={isSaveSearchValue}
            // setIsSearchValue={setIsSaveSearchValue}
            // setIsMoviesSearch={setIsSavedMoviesSearch}
            // isLoading={isLoading}
            // setIsLoading={setIsLoading}
            // onDeleteCard={handleDeleteCard}
            // onAddCard={handleAddCard}
            // isLiked={checkLike}
            // checkId={checkId}
            // isLiked={checkLike}

            // setMovies={setIsMovieSave}
            // isMovieSearch={isMovieSaveSearch}
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
