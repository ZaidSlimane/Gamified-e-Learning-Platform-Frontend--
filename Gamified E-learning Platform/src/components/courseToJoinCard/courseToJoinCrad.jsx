import React from 'react';
import './courseToJoinCrad.css';
import PixelatdButton from "../pixelatedButton/pixelatedButton.jsx";
import {useNavigate} from "react-router-dom"; // Import useNavigate

const CourseToJoinCard = ({imageUrl, courseName, stars, summary, enrollments, id, buttonText}) => {
    // Function to generate stars based on the number
    const renderStars = (stars) => {
        const starArray = [];
        for (let i = 0; i < stars; i++) {
            starArray.push(<img key={i} src="../../../public/star.svg" alt="Star"/>);
        }
        return starArray;
    };
    const navigate = useNavigate(); // Initialize useNavigate

    return (
        <div className="card p-3 card-size shadow">
            <div className="card-body">
                <div className="image-container image-size">
                    <img src={imageUrl} alt="Course" className="image-size"/>
                </div>
                <div className="row mt-3">
                    <div className="col NTIC">NTIC</div>
                    <div className="col text-end stars">
                        {renderStars(stars)}
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col">
                        <h5 className={"course-title"}>{courseName}</h5>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col summary-text">
                        <p className={"course-to-join-card-p"}>{summary}</p>
                    </div>
                </div>
                <div className="row mt-2 d-flex justify-content-center align-items-center">
                    <div className="col">
                        <PixelatdButton text={buttonText || "JOIN"} className="btn btn-primary" type="submit"
                                        onClick={() => navigate(`/courses/${id}`)}>{buttonText || "Join"}</PixelatdButton>
                    </div>
                    <div className="col text-end enrolled-text">
                        {enrollments} Enrolled
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseToJoinCard;
