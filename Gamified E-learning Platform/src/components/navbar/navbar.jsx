import React from 'react';
import './navbar.css'

const Navbar =  () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light nav_bg">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#">Courses</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#">Universities</a>
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
