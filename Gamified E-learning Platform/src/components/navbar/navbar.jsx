import React from 'react';
import './navbar.css'
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar =  () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const handleHomeClick = () => {
        navigate("/"); // Navigate to /login when Sign in is clicked
    }
    const handleCoursesClick = () => {
        navigate("/courses"); // Navigate to /login when Sign in is clicked
    }
    const handleLeaderboardClick = () => {
        navigate("/Leaderboard"); // Navigate to /login when Sign in is clicked
    }
    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light nav_bg">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" onClick={handleHomeClick}>Home </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" onClick={handleCoursesClick}>Courses</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" onClick={handleLeaderboardClick}>Leaderboard</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#">Conatct Us</a>
                    </li>

                </ul>
            </nav>
        </>
    );
};


export default Navbar;
