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
                    <a href="#" id="about-page" ontouchstart class="user-page-link" title="about">
                        <span class="material-icons icon">image</span>
                        &emsp;
                    </a>
                </Link>
                <Link to="/my-listings">
                    <a href="#" id="my-listings-page" ontouchstart class="user-page-link" title="my listings">
                        <span class="material-icons icon">format_list_bulleted</span>
                        &emsp;&emsp;My Listings
                    </a>
                </Link>
                <Link to={user_nav_path}>
                    <a href="#" id="user-page" ontouchstart class="user-page-link" title="account info">
                        <span class="material-icons icon">account_circle</span>
                        &emsp;&emsp;{user_nav_string}
                    </a>
                </Link>
            </div>
            <SearchBar />
        </div>
    );
}

export default NavBar;