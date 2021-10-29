import './index.css';
import './App.css';
import {useState} from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from "./login-page/Login";
import Homepage from "./home-page/homepage";
import MyListings from "./my-listings-page/my-listings";

function App() {
  /*const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  return (
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
          <Login />
        </Route>
        <Route path="/">
          <Homepage />
        </Route>
        <Route path="/my-listings">
          <MyListings />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
