import React from "react";
import SearchBar from "./search-bar";
import { Link } from "react-router-dom";

function NavBar(props) {
  let name = props.userData ? props.userData.name : null;
  let user_nav_path = name ? "/account-info" : "/login";
  let user_nav_string = name ? "Account Info" : "Log In";
  let user_nav_icon = name ? (
    <img
      className="icon"
      src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
      alt="avatar"
    />
  ) : (
    <span className="material-icons icon">account_circle</span>
  );
  return (
    <div id="topbar" className="noselect">
      <div id="user-page-area">
        <Link to="/about-page">
          <span id="about-page" className="user-page-link">
            <span className="material-icons icon">image</span>
            &emsp;
          </span>
        </Link>
        <Link to="/my-listings">
          <span id="my-listings-page" className="user-page-link">
            <span className="material-icons icon">format_list_bulleted</span>
            &emsp;&emsp;My Listings
          </span>
        </Link>
        <Link to={user_nav_path}>
          <span id="user-page" className="user-page-link">
            {user_nav_icon}
            &emsp;&emsp;{user_nav_string}
          </span>
        </Link>
      </div>
      <SearchBar />
    </div>
  );
}

export default NavBar;
