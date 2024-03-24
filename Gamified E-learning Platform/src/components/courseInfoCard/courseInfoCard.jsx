import React from 'react';
import './courseInfoCrad.css';

const CourseInfoCrad = () => {
    return (
        <div className="card p-2 card-size shadow rounded-4">
            <div className="row g-1">
                <div className="col-md-4">
                    <div className="image-container"></div>
                </div>
                <div className="col-md-8">
                    <div className="row mt-3 mb-3">
                        <div className="col">
                            <h5>Linux Fundamentals</h5>
                        </div>
                        <div className="col text-end">
                            <h5>6 Hours</h5>
                        </div>
                    </div>
                    <p>
                        This module covers the fundamentals required to work comfortably with the Linux operating system
                        and shell.
                    </p>
                    <div className="rating-container">
                        <p>★★★★★</p>
                    </div>
                    <div className="powered-container">
                        <p id="title">Supervised by Zaid Slimane</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CourseInfoCrad;
