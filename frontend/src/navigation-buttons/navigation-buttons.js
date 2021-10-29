import React from 'react';
import SearchBar from './search-bar';
import {Link} from "react-router-dom";

function NavBar(props) {
    let user_nav_path = props.loggedIn ? "/account-info" : "/login";
    let user_nav_string = props.loggedIn ? "Account Info" : "Log In";
    return (
        <div id="topbar" class="noselect">
            <div id="user-page-area">
                <Link to='/'>
                    <span id="about-page" ontouchstart class="user-page-link" title="about">
                        <span class="material-icons icon">image</span>
                        &emsp;
                    </span>
                </Link>
                <Link to="/my-listings">
                    <span id="my-listings-page" ontouchstart class="user-page-link" title="my listings">
                        <span class="material-icons icon">format_list_bulleted</span>
                        &emsp;&emsp;My Listings
                    </span>
                </Link>
                <Link to={user_nav_path}>
                    <span id="user-page" ontouchstart class="user-page-link" title="account info">
                        <span class="material-icons icon">account_circle</span>
                        &emsp;&emsp;{user_nav_string}
                    </span>
                </Link>
            </div>
            <SearchBar />
        </div>
    );
}

export default NavBar;