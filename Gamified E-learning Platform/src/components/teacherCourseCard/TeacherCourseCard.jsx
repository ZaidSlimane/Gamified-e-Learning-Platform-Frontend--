import React, {useEffect, useState} from 'react';
import './TeacherCourseCard.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const TeacherCourseCard = ({ courseId, courseName, numberOfEnrollments, startColor, endColor, onClick }) => {
    console.log(onClick); // Check if onClick function is passed

    const gradientStyle = {
        background: `linear-gradient(45deg, ${startColor}, ${endColor})`,
    };



    return (
        <div
            className="card mb-3 size shadow1 gradiant-background card-hover teacher-course-card-container d-flex flex-column"
            style={gradientStyle}
            onClick={() => onClick(courseId)}
        >
            <div className="row g-0 teacher-course-card-top-content">
                <div className="col-md-12 d-flex justify-content-between align-items-start">
                    <p className="text-start teacher-course-name">{courseName}</p>
                    <img className="ms-auto mt-2 me-2" src="../../../public/ellipsis-v%202.svg" alt="options"/>
                </div>
            </div>
            <p className="text-end mb-3 me-4 mt-auto text-white teacher-number-enrollements">{numberOfEnrollments} students</p>
        </div>
    );
};


export default TeacherCourseCard;
