import React from 'react';
import PropTypes from 'prop-types';

const SectionComponent = ({ containerName,title, children }) => {
    return (
        <div className="$containerName}  d-flex flex-column justify-content-center align-items-center" id={containerName}  >
            <div className={title} id={title}>
                <h1>{title}</h1>
            </div>

            <div className="container-content mt-2" id="container-content">
                {children}
            </div>

        </div>

    );
};

SectionComponent.propTypes = {
    children: PropTypes.node.isRequired, // Content inside the container is required
    title: PropTypes.node.isRequired,
    containerName :PropTypes.node.isRequired
};

export default SectionComponent;
