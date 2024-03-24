import React from 'react';
import './courseToJoinCrad.css';

const CourseToJoinCard = () => {
    return (
        <div className="card p-3 card-size shadow">
            <div className="card-body">
                <div className="image-container image-size" ></div>
                <div className="row mt-2">
                    <div className="col">Column 1</div>
                    <div className="col text-end">★★★★★</div>
                </div>
                <div className="col mt-2">
                    <h5>Game Development Programming with Java</h5>
                </div>
                <div className="col mt-2">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className="row mt-2 d-flex justify-content-center align-items-center">
                    <div className="col">
                        <button className="btn btn-primary" type="submit">Join</button>
                    </div>
                    <div className="col text-end">
                        100 Enrolled
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseToJoinCard;
