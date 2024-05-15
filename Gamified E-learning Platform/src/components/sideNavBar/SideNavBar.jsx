import React, { useState } from 'react';
import HomeIcon from "../homeIcon/HomeIcon.jsx";
import EnrolledIcon from "../enrolledIcon/EnrolledIcon.jsx";
import MessagesIcon from "../messagesIcon/MessagesIcon.jsx";
import LogoutIcon from "../logoutIcon/LogoutIcon.jsx";
import './SideNavBar.css';

const SideNavBar = () => {
    const [selected, setSelected] = useState('home');

    const navItems = [
        { id: 'home', icon: <HomeIcon fill={selected === 'home' ? '#01F401' : '#868686'} />, text: 'Home' },
        { id: 'enrolled', icon: <EnrolledIcon fill={selected === 'enrolled' ? '#01F401' : '#868686'} />, text: 'Enrolled' },
        { id: 'messages', icon: <MessagesIcon fill={selected === 'messages' ? '#01F401' : '#868686'} />, text: 'Messages' },
        { id: 'logout', icon: <MessagesIcon fill={selected === 'logout' ? '#01F401' : '#868686'} />, text: 'Logout' },
    ];

    return (
        <div className="side-nav side-nav-container shadow">
            {navItems.map(item => (
                <div
                    key={item.id}
                    className={`side-nav-item ${selected === item.id ? 'active' : ''}`}
                    onClick={() => setSelected(item.id)}
                ><div className="side-nav-icon-container">
                    {item.icon}
                    <span className="side-nav-text">{item.text}</span></div>
                    {selected === item.id && <div className="selecting-icon"><img src="../../../public/selectingicon.svg" alt="Selecting icon" /></div>}
                </div>
            ))}
        </div>
    );
};

export default SideNavBar;
