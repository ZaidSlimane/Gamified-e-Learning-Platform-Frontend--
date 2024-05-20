import React, {useEffect, useState} from 'react';
import './SpecialistCourseCard.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SpecialistCourseCard = ({ courseId, courseName, startColor, endColor, onClick }) => {
    console.log(onClick); // Check if onClick function is passed

    const gradientStyle = {
        background: `linear-gradient(45deg, ${startColor}, ${endColor})`,
    };
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        const fetchChapters = async () => {
            const response = await axios.get(`http://127.0.0.1:8000/api/courses/${courseId}/chapters`);
            setChapters(response.data);
        };

        fetchChapters();
    }, [courseId]);



    return (
        <div
            className="card mb-3 size shadow1 gradiant-background card-hover specialist-course-card-container d-flex flex-column"
            style={gradientStyle}
            onClick={() => onClick(courseId)}
        >
            <div className="row g-0 specialist-course-card-top-content">
                <div className="col-md-12 d-flex justify-content-between align-items-start">
                    <p className="text-start specialist-course-name mb-0">{courseName}</p>
                    <img className="ms-auto mt-2 me-2" src="../../../public/ellipsis-v%202.svg" alt="options"/>
                </div>
            </div>
            <p className="mb-3 ms-3 me-4 mt-auto text-white specialist-number-enrollements"><em> Chapters: {chapters.length}</em></p>
        </div>
    );
};


export default SpecialistCourseCard;
