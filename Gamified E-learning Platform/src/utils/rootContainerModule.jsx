import React from 'react';
import PropTypes from 'prop-types';
import './rootContainerCssModule.css';

const RootContainer = ({ children }) => {
    return (
        <div className="root-container mb-5">
            {children}
        </div>
    );
};

RootContainer.propTypes = {
    children: PropTypes.node.isRequired, // Content inside the container is required
};

export default RootContainer;
