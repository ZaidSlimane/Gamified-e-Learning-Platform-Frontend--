import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from "../homeIcon/HomeIcon.jsx";
import EnrolledIcon from "../enrolledIcon/EnrolledIcon.jsx";
import MessagesIcon from "../messagesIcon/MessagesIcon.jsx";
import LogoutIcon from "../logoutIcon/LogoutIcon.jsx";
import './TeacherSideNavBar.css';

const TeacherSideNavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { id: 'teachercourses', icon: <EnrolledIcon fill={location.pathname === '/teacher/courses' ? '#01F401' : '#868686'} />, text: 'Courses', path: '/teacher/courses' },
        { id: 'teacherquestions', icon: <EnrolledIcon fill={location.pathname === '/teacher/questions' ? '#01F401' : '#868686'} />, text: 'Questions', path: '/teacher/questions' },
        { id: 'teachermessages', icon: <MessagesIcon fill={location.pathname === '/teacher/messages' ? '#01F401' : '#868686'} />, text: 'Messages', path: '/teacher/messages' },
        { id: 'logout', icon: <MessagesIcon fill={location.pathname === '/logout' ? '#01F401' : '#868686'} />, text: 'Logout', path: '/logout' },
    ];

    const handleNavItemClick = (path) => {
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
                    {location.pathname === item.path && <div className="selecting-icon"><img src="../../../public/selectingicon.svg" alt="Selecting icon" /></div>}
                </div>
            ))}
        </div>
    );
};

export default TeacherSideNavBar;
