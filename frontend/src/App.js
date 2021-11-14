import "./index.css";
//import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";
import settings from "./settings";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";

import Login from "./login-page/Login";
import Homepage from "./home-page/homepage";
import AboutPage from "./about-page/about-page";
import MyListings from "./my-listings-page/my-listings";
import AccountInfo from "./account-info/account-info";
import ProductPage from "./product-page/product-page";
import NavBar from "./navigation-buttons/navigation-buttons";
import CreateListing from "./my-listings-page/create-listing";
import MyListingsListing from "./listings/myListingsListing";

function App() {
  const [userData, setUserData] = useState(null);
  const [validCreateListing, setValidCreateListing] = useState(false);
  const [sucDelete, setSucDelete] = useState(false);

  async function checkLogin() {
    const LSUserData = JSON.parse(localStorage.getItem("userData"));
    if (LSUserData) {
      await axios
        .get(
          settings.URLBase.concat("/user/").concat(LSUserData["_id"].toString())
        )
        .then((response) => {
          if (response.status === 201) {
            localStorage.setItem("userData", JSON.stringify(response.data));
            setUserData(response.data);
          } else {
            localStorage.removeItem("userData");
            setUserData(null);
          }
        });
    } else {
      localStorage.removeItem("userData");
      setUserData(null);
    }
  }

  function logout() {
    localStorage.removeItem("userData");
    setUserData(null);
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          {userData ? (
            <Redirect to="/" />
          ) : (
            <Login userData={userData} setUserData={setUserData} />
          )}
        </Route>
        <Route exact path="/my-listings">
          {!userData ? (
            <Redirect to="/login" />
          ) : (
            <div>
              <NavBar userData={userData} />
              <MyListings userData={userData} />
            </div>
          )}
        </Route>

        <Route exact path={"/my-listings/listing/:id"}>
          {sucDelete ? (
              <Redirect to={"/my-listings"}/>
          ) : (
              <div>
                <NavBar userData={userData}/>
                <MyListingsListing setSucDelete={setSucDelete}/>
              </div>
            )
          }

        </Route>

        <Route exact path="/about-page">
          <NavBar userData={userData} />
          <AboutPage />
        </Route>
        <Route exact path="/account-info">
          {!userData ? (
            <Redirect to="/login" />
          ) : (
            <div>
              <NavBar userData={userData} />
              <AccountInfo logout={logout} />
            </div>
          )}
        </Route>
        <Route exact path="/product-page">
          <NavBar userData={userData} />
          <ProductPage />
        </Route>
        <Route exact path="/create-listing">
          {validCreateListing ? (
            () => {
              console.log("Reading as true...");
              setValidCreateListing(false);
              return <Redirect to={"/my-listings"} />;
            }
          ) : (
            <div>
              <NavBar userData={userData} />
              <CreateListing
                setValidCreateListing={setValidCreateListing}
                userData={userData}
              />
            </div>
          )}
        </Route>
        <Route exact path="/">
          {/* homepage */}
          <NavBar userData={userData} />
          <Homepage />
        </Route>
        <Route path="/">
          {/* 404 page not found */}
          <NavBar userData={userData} />
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
