import React from 'react';
import SearchBar from './search-bar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function NavBar() {
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
                <Link to='/login'>
                    <a href="#" id="user-page" ontouchstart class="user-page-link" title="account info">
                        <span class="material-icons icon">account_circle</span>
                        &emsp;&emsp;Account Info
                    </a>
                </Link>
            </div>
            <SearchBar />
        </div>
    );
}

export default NavBar;