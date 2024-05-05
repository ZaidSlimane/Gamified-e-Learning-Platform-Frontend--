import React from 'react';
import './courseToJoinCrad.css';
import PixelatdButton from "../pixelatedButton/pixelatedButton.jsx";

const CourseToJoinCard = () => {
    return (
        <div className="card p-3 card-size shadow">
            <div className="card-body">
                <div className="image-container image-size">
                    <img src="../../../public/courseToJoinImg.svg"/>
                </div>
                <div className="row mt-1">
                    <div className="col NTIC">NTIC</div>
                    <div className="col text-end stars"><img src="../../../public/star.svg"/><img src="../../../public/star.svg"/><img src="../../../public/star.svg"/><img src="../../../public/star.svg"/><img src="../../../public/star.svg"/></div>
                </div>
                <div className="row mt-2">
                    <div className="col">
                        <h5 className={"course-title"}>Game Development Programming with Java</h5>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col">
                        <p className={"course-to-join-card-p"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
                <div className="row mt-2 d-flex justify-content-center align-items-center">
                    <div className="col">
                        <PixelatdButton text={"JOIN"} className="btn btn-primary" type="submit">Join</PixelatdButton>
                    </div>
                    <div className="col text-end enrolled-text">
                        2500 Enrolled
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseToJoinCard;
