import React, {useState} from "react";
import CourseCard from "../courseCards/courseCard.jsx";
function CourseSection() {


    return (
        <>
            <div className="courses-container" id="courses-container">
                <div className="title" id="title">
                    <h1></h1>
                    <div className="container-content" id="container-content">
                        <div className="row row-cols-2 gy-1 p-5">
                            <div className="col">
                                <CourseCard></CourseCard>
                            </div>
                            <div className="col"><CourseCard></CourseCard></div>
                            <div className="col"><CourseCard></CourseCard></div>
                            <div className="col"><CourseCard></CourseCard></div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default CourseSection;
