import React from 'react';
import PixelatdButton from "./pixelatedButton/pixelatedButton.jsx";

function Footer() {
    const footerStyle = {
        backgroundColor: '#343a40', // Dark background for the footer
        color: '#ffffff',           // White text color
        padding: '20px',            // Padding around the content
        fontSize: '16px',           // Text size
        position: 'relative',       // Relative positioning
        bottom: '0',                // Anchored to the bottom
        width: '100%',              // Full width
    };

    return (
        <footer style={footerStyle}>
            <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-column">
                    <div>
                        <img src="/logo.png" alt="Left SVG" style={{height: '50px'}}/>
                    </div>
                    <div>
                        <ul style={{listStyleType: 'none', padding: 0}}>
                            <li style={{display: 'inline', margin: '0 10px'}}>
                                <a href="https://www.facebook.com" style={{color: 'white', textDecoration: 'none'}}>
                                    Home
                                </a>
                            </li>
                            <li style={{display: 'inline', margin: '0 10px'}}>
                                <a href="https://www.twitter.com" style={{color: 'white', textDecoration: 'none'}}>
                                    Courses
                                </a>
                            </li>
                            <li style={{display: 'inline', margin: '0 10px'}}>
                                <a href="https://www.instagram.com" style={{color: 'white', textDecoration: 'none'}}>
                                    University
                                </a>
                            </li>
                            <li style={{display: 'inline', margin: '0 10px'}}>
                                <a href="https://www.instagram.com" style={{color: 'white', textDecoration: 'none'}}>
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <p>Get the freshest news from us</p>
                    <div className="d-flex flex-row">
                        <input/>
                        <div style={{width: '20px'}}></div>
                        <PixelatdButton text="Subscribe"></PixelatdButton>
                    </div>
                </div>
            </div>
            <p className="text-center">@2024</p>
        </footer>
    );
}

export default Footer;