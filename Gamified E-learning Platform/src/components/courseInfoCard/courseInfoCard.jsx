import React from 'react';
import './courseInfoCrad.css';
import starImage from "../../../public/star.svg"

const CourseInfoCrad = ({ imageUrl, courseTitle, courseSummary, stars, supervisor, supervisorJob }) => {
    // Generate an array of stars
    const renderStars = (stars) => {
        const starArray = [];
        for (let i = 0; i < stars; i++) {
            starArray.push(<img key={i} src="../../../public/star.svg" alt="Star"/>);
        }
        return starArray;
    };

    return (
        <div className="card p-2 card-size3 shadow rounded-4">
            <div className="row g-1">
                <div className="col-md-4" style={{ width:"40%"}}>
                    <div className="image-container">
                        <img src={imageUrl} className={"image"}/>
                    </div>
                </div>
                <div className="col-md-8 ps-3" style={{ width:"60%"}}>
                    <div className="row mt-3 mb-2">
                        <div className="col">
                            <h2 className="course-title montserrat-font">{courseTitle}</h2>
                        </div>
                        <div className="col text-end me-3 ">
                            <h5 className={"course-duration montserrat-font mb-2"}>6 Hours</h5>
                        </div>
                    </div>
                    <p className={"montserrat-font description"}>
                        {courseSummary}
                    </p>
                    <div className="rating-container">
                        {renderStars(stars)}
                    </div>
                    <div className="powered-container mt-1 mb-2">
                        <p className={"supervised title"}>Supervised by:</p>
                        <p className={"supervised"}>{supervisor}</p>
                        <p className={"supervised"}>{supervisorJob}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseInfoCrad;
