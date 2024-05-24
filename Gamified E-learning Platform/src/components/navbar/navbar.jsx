import React, {useEffect, useState} from 'react';
import './navbar.css'
import {useNavigate} from "react-router-dom";
import axios from "axios"; // Import useNavigate

const Navbar = () => {
    const [userData, setuserData] = useState('');
    const [loggedIn, setloggedIn] = useState('');

    const getToken = () => {
        return localStorage.getItem('token');
    };


    async function checkloggedIn() {
        try {
            const token = getToken()
            const roleResponse = await axios.get('http://127.0.0.1:8000/api/home', {
                headers: {
                    Authorization: `Bearer ${token}` // Send token as bearer code
                }
            });
            const data = roleResponse.data;
            console.log(data.user.id)
            if (data.user.groups.length > 0) {
                setuserData(data);
                setloggedIn(true);
            } else {

                setloggedIn(false);
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response && error.response.status === 401) {
                setloggedIn(false);
            }
            return false
        }
    }

    const navigate = useNavigate(); // Initialize useNavigate
    useEffect(() => {
        checkloggedIn()

    }, []);
    const handleHomeClick = () => {
        if (loggedIn) {
            navigate("/student");
        } else{
            navigate("/");}
    }
    const handleCoursesClick = () => {
        navigate("/courses"); // Navigate to /login when Sign in is clicked
    }
    const handleLeaderboardClick = () => {
        navigate("/Leaderboard"); // Navigate to /login when Sign in is clicked
    }
    const handleReviewsClick = () => {
        navigate("/reviews"); // Navigate to /login when Sign in is clicked
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
                        <a className="nav-link" onClick={handleReviewsClick}>Reviews</a>
                    </li>

                </ul>
            </nav>
        </>
    );
};


export default Navbar;
