import React from "react";
import { FaSearch } from 'react-icons/fa'; // Import search icon from Font Awesome
import "./SearchBar.css"; // Import CSS file for styling

function SearchBar({ width }) {
    const containerStyle = {
        width: width ? width : "50%" // If width prop is provided, use it; otherwise, use "auto"
    };

    return (
        <div className="search-container shadow rounded-4" style={containerStyle}>
            <div className="search-icon">
                <FaSearch/>
            </div>
            <input type="text" className="search-bar" placeholder="Search..." />
        </div>
    );
}

export default SearchBar;
