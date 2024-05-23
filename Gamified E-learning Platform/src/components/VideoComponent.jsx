import React from 'react';

const VideoComponent = ({ videoSrc, alt }) => {
    const videoContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',
    };

    const styledVideoStyle = {
        width: '100%',
        maxWidth: '600px',  // Adjust as needed
        borderRadius: '15px',  // Adjust the border radius as needed
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Optional: Add a shadow for better visuals
    };

    return (
        <div style={videoContainerStyle}>
            <video style={styledVideoStyle} autoPlay loop muted>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {alt && <p>{alt}</p>}
        </div>
    );
};

export default VideoComponent;