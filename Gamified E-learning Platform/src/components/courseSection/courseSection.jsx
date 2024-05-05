import React from "react";
import CourseCard from "../courseCards/courseCard.jsx";
import "./courseSection.css"

function CourseSection() {
    return (
        <div className="courses-container" id="courses-container">
            <div className="background"></div>
            <div className="title" id="title">
                <h1></h1>
                <div className="container-content" id="container-content">
                    <div className="row row-cols-2 gy-1 p-5">
                        <div className="col">
                            <CourseCard courseName={"ALGORITHMS"} startColor={"#78766C"} endColor={"#E3E2E0"} imageUrl={"/algo.svg"}></CourseCard>
                        </div>
                        <div className="col">
                            <CourseCard courseName={"NETWORKING"} startColor={"#3F96E6"} endColor={"#70D1C6"} imageUrl={"/algo.svg"}></CourseCard>
                        </div>
                        <div className="col">
                            <CourseCard courseName={"DATABASES"} endColor={"#FAA474"} startColor={"#D170B6"} imageUrl={"/algo.svg"}></CourseCard>
                        </div>
                        <div className="col">
                            <CourseCard courseName={"WEB DEV"} imageUrl={"/algo.svg"}></CourseCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseSection;
