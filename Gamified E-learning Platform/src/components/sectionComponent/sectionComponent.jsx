import React from 'react';
import PropTypes from 'prop-types';
import '../../fonts/fonts.css'; // Import the fonts.css file

const SectionComponent = ({ containerName, title, children }) => {
    return (
        <div className={`${containerName} mt-5 d-flex flex-column justify-content-center align-items-center`} id={containerName}>
            <div className={title} id={title} style={{ color: 'white', fontFamily: 'Pixel' }}>
                <h1 style={{color: '#01F401'}} >{title}</h1>
            </div>

            <div className="container-content mt-2" id="container-content" style={{ fontFamily: 'Pixel' }}>
                {children}
            </div>
        </div>
    );
};

SectionComponent.propTypes = {
    children: PropTypes.node.isRequired, // Content inside the container is required
    title: PropTypes.string.isRequired,
    containerName: PropTypes.string.isRequired
};

export default SectionComponent;