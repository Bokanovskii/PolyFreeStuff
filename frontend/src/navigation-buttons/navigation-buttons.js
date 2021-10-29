import React from 'react';
import SearchBar from './search-bar';

function NavBar() {
    return (
        <div id="topbar" class="noselect">
            <div id="user-page-area">
                <a href="#" id="about-page" ontouchstart class="user-page-link" title="about">
                    <span class="material-icons icon">image</span>
                    &emsp;
                </a>
                <a href="#" id="my-listings-page" ontouchstart class="user-page-link" title="my listings">
                    <span class="material-icons icon">format_list_bulleted</span>
                    &emsp;&emsp;My Listings

                </a>
                <a href="#" id="user-page" ontouchstart class="user-page-link" title="account info">
                    <span class="material-icons icon">account_circle</span>
                    &emsp;&emsp;Account Info
                </a>
            </div>
            <SearchBar />
        </div>
    );
}

export default NavBar;