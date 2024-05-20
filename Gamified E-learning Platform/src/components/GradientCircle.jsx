import React from 'react';

function GradientCircle({ imageUrl }) {
    const circleContainerStyle = {
        width: '400px',  // Diameter of the circle
        height: '400px', // Diameter of the circle
        position: 'relative', // Ensures the image can be absolutely positioned if needed
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',  // Prevents any overflow from the circle
        borderRadius: '50%'  // Makes the container a circle
    };

    // Style for the gradient background
    const backgroundStyle = {
        background: 'linear-gradient(to top, #01F401 0%, transparent 66%)',
        filter: 'blur(30px)', // Applying blur
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%'  // Ensures the background is also clipped as a circle
    };

    // Style for the image to ensure it is clipped as a circle and covers the area
    const imageStyle = {
        width: '100%',       // Makes the image fully cover the circle's width
        height: '100%',      // Makes the image fully cover the circle's height
        objectFit: 'cover',  // Ensures the image covers the area without distortion
        position: 'absolute', // Positions the image absolutely within the circle
        borderRadius: '50%'  // Clips the image as a circle
    };

    return (
        <div style={circleContainerStyle}>
            <div style={backgroundStyle}></div>
            <img src={imageUrl} alt="Circle Content" style={imageStyle}/>
        </div>
    );
}

export default GradientCircle;