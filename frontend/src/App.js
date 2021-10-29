import './index.css';
import './App.css';
import {useState} from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from "./login-page/Login";
import Homepage from "./home-page/homepage";
import MyListings from "./my-listings-page/my-listings";
import NavBar from "./navigation-buttons/navigation-buttons";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [email, setEmail] = useState("");
  /*return (
    <div className="App">
      <Login
          email={email} setEmail={setEmail}
          loggedIn={loggedIn} setLoggedIn={setLoggedIn}
      />
    </div>
  );*/
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login
            email={email} setEmail={setEmail}
            loggedIn={loggedIn} setLoggedIn={setLoggedIn}
          />
        </Route>
        <Route path="/">
          <NavBar loggedIn={loggedIn} />
          <Homepage />
        </Route>
        <Route path="/my-listings">
          <NavBar loggedIn={loggedIn} />
          <MyListings />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
