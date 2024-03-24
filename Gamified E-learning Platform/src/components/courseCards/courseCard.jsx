import React from 'react';
import PropTypes from 'prop-types';


const CourseCard = ({ imageUrl, courseName }) => {
    return (
        <div className="card mb-3 size">
            <div className="row g-0">
                <div className="col-md-8 d-flex justify-content-center align-items-center">
                    <p className="text-center">Course name</p>
                </div>
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <div className="image-placeholder">
                        <svg
                            className="bd-placeholder-img img-fluid rounded-start"
                            width="100%"
                            height="120"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="Placeholder: Image"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                        >
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#868e96"></rect>
                            <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image</text>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CourseCard;
