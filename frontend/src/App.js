import "./index.css";
//import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./login-page/Login";
import Homepage from "./home-page/homepage";
import AboutPage from "./about-page/about-page";
import MyListings from "./my-listings-page/my-listings";
import AccountInfo from "./account-info/account-info";
import ProductPage from "./product-page/product-page";
import NavBar from "./navigation-buttons/navigation-buttons";
import CreateListing from "./my-listings-page/create-listing";

const URLBase = "http://localhost:5000/";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  async function checkLogin() {
    const loggedInEmail = localStorage.getItem("email");
    if (loggedInEmail) {
      await axios
        .get(URLBase.concat("login/").concat(loggedInEmail.toString()))
        .then((response) => {
          if (response.status === 201) {
            setEmail(loggedInEmail);
            setLoggedIn(true);
          } else {
            setEmail("");
            setLoggedIn(false);
            localStorage.removeItem("email");
          }
        });
    } else {
      setEmail("");
      setLoggedIn(false);
      localStorage.removeItem("email");
    }
  }

  function logout() {
    localStorage.removeItem("email");
    setEmail("");
    setLoggedIn(false);
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login
            email={email}
            setEmail={setEmail}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        </Route>
        <Route exact path="/my-listings">
          {!loggedIn ? (
            <Redirect to="/login" />
          ) : (
            <div>
              <NavBar loggedIn={loggedIn} />
              <MyListings />
            </div>
          )}
        </Route>
        <Route exact path="/about-page">
          <NavBar loggedIn={loggedIn} />
          <AboutPage />
        </Route>
        <Route exact path="/account-info">
          {!loggedIn ? (
            <Redirect to="/login" />
          ) : (
            <div>
              <NavBar loggedIn={loggedIn} />
              <AccountInfo logout={logout} />
            </div>
          )}
        </Route>
        <Route exact path="/product-page">
          <NavBar loggedIn={loggedIn} />
          <ProductPage />
        </Route>
        <Route exact path="/create-listing">
          <NavBar loggedIn={loggedIn}/>
          <CreateListing/>
        </Route>
        <Route exact path="/">
          {" "}
          {/* homepage */}
          <NavBar loggedIn={loggedIn} />
          <Homepage />
        </Route>
        <Route path="/">
          {" "}
          {/* 404 page not found */}
          <NavBar loggedIn={loggedIn} />
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

function PageNotFound() {
  return (
    <div id="pg404">
      <center>
        <span>404</span>
        Page not found
      </center>
    </div>
  );
}

export default App;
export default URLBase;