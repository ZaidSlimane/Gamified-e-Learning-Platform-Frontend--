import React from "react";
import { FaSearch } from 'react-icons/fa'; // Import search icon from Font Awesome
import "./SearchBar.css"; // Import CSS file for styling

function SearchBar() {
    return (
        <div className="search-container shadow">
            <div className="search-icon">
                <FaSearch/>
            </div>
            <input type="text" className="search-bar" placeholder="Search..." />
        </div>
    );
}

export default SearchBar;
