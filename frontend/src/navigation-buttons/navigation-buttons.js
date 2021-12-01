import React from "react";
import SearchBar from "./search-bar";
import { Link } from "react-router-dom";
import pg_icon from "../pg_icon.png";

function NavBar(props) {
  let name = props.userData ? props.userData.name : null;
  let user_nav_path = name ? "/account-info" : "/login";
  let user_nav_string = name ? "" : "Log In";
  let user_page_id = name ? "account-info-page-link" : "user-page-link";
  let user_nav_icon = name ? (
    <img
      className="icon"
      src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
      alt="avatar"
    />
  ) : (
    <span className="material-icons icon">account_circle</span>
  );
  let my_listings_link = name ? (
    <Link to="/my-listings">
      <span id="my-listings-page-link" className="user-page-link">
        <span className="material-icons icon">format_list_bulleted</span>
        My Listings
      </span>
    </Link>
  ) : (
    <div></div>
  );
  return (
    <div id="topbar" className="noselect">
      <Link to="/about-page">
        <span id="about-page-link" className="user-page-link">
          <img className="icon" src={pg_icon} alt="app icon" />
        </span>
      </Link>
      <Link to="/">
        <span id="homepage-link" className="user-page-link">
          <span className="material-icons icon">home</span>
          Home
        </span>
      </Link>
      {my_listings_link}
      <SearchBar
        setSearchValue={props.setSearchValue}
        selectedCats={props.selectedCats}
        setSelectedCats={props.setSelectedCats}
        filterByName={props.filterByName}
        setFilterByName={props.setFilterByName}
      />
      <Link to={user_nav_path}>
        <span id={user_page_id} className="user-page-link">
          {user_nav_icon}
          {user_nav_string}
        </span>
      </Link>
    </div>
  );
}

export default NavBar;
