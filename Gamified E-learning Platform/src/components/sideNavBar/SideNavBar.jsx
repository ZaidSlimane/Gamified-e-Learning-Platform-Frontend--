import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import HomeIcon from "../homeIcon/HomeIcon.jsx";
import EnrolledIcon from "../enrolledIcon/EnrolledIcon.jsx";
import MessagesIcon from "../messagesIcon/MessagesIcon.jsx";
import LogoutIcon from "../logoutIcon/LogoutIcon.jsx";
import './SideNavBar.css';
import axios from "axios";
import CoursesIcon from "../coursesIcon/CoursesIcon.jsx";
import QuestionIcon from "../questionIcon/QuestionIcon.jsx";
import ProfileIcon from "../profileIcon/ProfileIcon.jsx";
import LeaderboardIcon from "../leaderboardIcon/LeaderboardIcon.jsx";

const SideNavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        {
            id: 'home',
            icon: <HomeIcon fill={location.pathname === '/student' ? '#01F401' : '#868686'}/>,
            text: 'Home',
            path: '/student'
        },
        {
            id: 'enrolled',
            icon: <EnrolledIcon fill={location.pathname === '/enrolled' ? '#01F401' : '#868686'}/>,
            text: 'Enrolled',
            path: '/enrolled'
        },
        {
            id: 'courses',
            icon: <CoursesIcon fill={location.pathname === '/courses' ? '#01F401' : '#868686'}/>,
            text: 'Courses',
            path: '/courses'
        },
        {
            id: 'questions',
            icon: <QuestionIcon fill={location.pathname === '/questions' ? '#01F401' : '#868686'}/>,
            text: 'Questions',
            path: '/questions'
        },
        {
            id: 'messages',
            icon: <MessagesIcon fill={location.pathname === '/messages' ? '#01F401' : '#868686'}/>,
            text: 'Messages',
            path: '/messages'
        },
        {
            id: 'profile',
            icon: <ProfileIcon fill={location.pathname === '/updateProfile' ? '#01F401' : '#868686'}/>,
            text: 'Profile',
            path: '/updateProfile'
        },
        {
            id: 'leaderboard',
            icon: <LeaderboardIcon fill={location.pathname === '/leaderBoard' ? '#01F401' : '#868686'}/>,
            text: 'Leaderboard',
            path: '/leaderBoard'
        },
        {
            id: 'logout',
            icon: <LogoutIcon fill={location.pathname === '/logout' ? '#01F401' : '#868686'}/>,
            text: 'Logout',
            path: '/logout'
        },
    ];

    const handleNavItemClick = async (path) => {

        if (path == '/logout') {
            const refresh = localStorage.getItem('refresh');
            const token = localStorage.getItem('token');

            console.log(refresh);
            console.log(token)
            const roleResponse = await axios.post('http://127.0.0.1:8000/api/logout/', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` // Send token as bearer code

                }
            });
            localStorage.removeItem('token')
            localStorage.removeItem('refresh')
            localStorage.removeItem('ROLE')
            navigate('/')

            console.log(roleResponse)

        } else
            navigate(path);
    };

    return (
        <div className="side-nav side-nav-container shadow">
            {navItems.map(item => (
                <div
                    key={item.id}
                    className={`side-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => handleNavItemClick(item.path)}
                >
                    <div className="side-nav-icon-container">
                        {item.icon}
                        <span className="side-nav-text">{item.text}</span>
                    </div>
                    {location.pathname === item.path &&
                        <div className="selecting-icon"><img src="../../../public/selectingicon.svg"
                                                             alt="Selecting icon"/></div>}
                </div>
            ))}
        </div>
    );
};

export default SideNavBar;
