import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { Route, Switch } from "react-router-dom";
import Movies from "../Movies/Movies";

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
      </Switch>
    </div>
  );
}

export default App;
