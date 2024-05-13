import React from 'react';
import PropTypes from 'prop-types';
import './courseCard.css'; // Import the CSS file
import '@fontsource/inter';

const CourseCard = ({ imageUrl, courseName, startColor, endColor }) => {
    const gradientStyle = {
        background: `linear-gradient(45deg, ${startColor}, ${endColor})`,
    };

    return (
        <div className="card mb-3 size shadow1 gradiant-background card-hover" style={gradientStyle}>
            <div className="row g-0">
                <div className="col-md-8 d-flex justify-content-center align-items-center">
                    <p className="text-center course-name">{courseName}</p>
                    {/* Apply the 'course-name' class */}
                </div>
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <div className="image-placeholder">
                        <img
                            className="img-fluid rounded-start card-imagee"
                            src={imageUrl}
                            alt="Course Image"
                        />
                    </div>
                </div>
            </div>
        </div>

    );
};

CourseCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    courseName: PropTypes.string.isRequired,
    startColor: PropTypes.string.isRequired,
    endColor: PropTypes.string.isRequired,
};

export default CourseCard;
