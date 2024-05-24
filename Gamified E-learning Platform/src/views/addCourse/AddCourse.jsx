import React, { useState, useEffect } from "react";
import RootContainer from "../../utils/rootContainerModule.jsx";
import TextInput from "../../components/textInput/textInput.jsx";
import './AddCourse.css';
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function AddCourse() {
    const [course, setCourse] = useState({
        courseName: "",
        courseSummary: "",
        courseLongSummary: "",
        recompense: 0,
        terms: "",
        imglink: "",
        teacher: ""
    });
    const [teachers, setTeachers] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/teachers/')
            .then(response => response.json())
            .then(data => setTeachers(data))
            .catch(error => console.error('Error fetching teachers:', error));
    }, []);

    const handleCourseChange = (e, field) => {
        setCourse({ ...course, [field]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCourse = {
            courseName: course.courseName,
            courseSummary: course.courseSummary,
            courseLongSummary: course.courseLongSummary,
            recompense: course.recompense,
            terms: course.terms,
            imglink: course.imglink,
            teacher: parseInt(course.teacher)  // Ensure teacher ID is an integer
        };

        fetch('http://127.0.0.1:8000/api/courses/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCourse)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                const response5 = axios.post('http://127.0.0.1:8000/api/chatrooms/',{
                    'room_name':data.courseName,
                    'course': data.id
                })
            })
            .catch(error => {
                console.error('Error:', error);
            });
        navigate('/specialist')

    };

    const handleSaveOnClick = () => {
        navigate('/specialist')
    }
    return (
        <RootContainer>
            <br />
            <br />
            <form onSubmit={handleSubmit} className="mt-5 d-flex flex-column align-items-center pb-4">
                <div>
                    <p style={{ color: "#01F401", marginLeft: "8px" }}><b>Course Name:</b></p>
                    <TextInput
                        className="grey-bg question ps-3 pe-3 pt-2"
                        value={course.courseName}
                        onChange={(e) => handleCourseChange(e, 'courseName')}
                    />
                </div>
                <div className="mt-5">
                    <p style={{ color: "#01F401", marginLeft: "8px" }}><b>Course Description:</b></p>
                    <textarea
                        className="grey-bg chapter-content question ps-3 pe-3 pt-2"
                        value={course.courseSummary}
                        onChange={(e) => handleCourseChange(e, 'courseSummary')}
                    />
                </div>
                <div className="mt-5">
                    <p style={{ color: "#01F401", marginLeft: "8px" }}><b>Course Summary:</b></p>
                    <textarea
                        className="grey-bg chapter-content question ps-3 pe-3 pt-2"
                        value={course.courseLongSummary}
                        onChange={(e) => handleCourseChange(e, 'courseLongSummary')}
                    />
                </div>
                <div className="mt-5">
                    <p style={{ color: "#01F401", marginLeft: "8px" }}><b>Recompense:</b></p>
                    <TextInput
                        className="grey-bg question ps-3 pe-3 pt-2"
                        type="number"
                        value={course.recompense}
                        onChange={(e) => handleCourseChange(e, 'recompense')}
                    />
                </div>
                <div className="mt-5">
                    <p style={{ color: "#01F401", marginLeft: "8px" }}><b>Terms:</b></p>
                    <TextInput
                        className="grey-bg question ps-3 pe-3 pt-2"
                        value={course.terms}
                        onChange={(e) => handleCourseChange(e, 'terms')}
                    />
                </div>
                <div className="mt-5">
                    <p style={{ color: "#01F401", marginLeft: "8px" }}><b>Image Link:</b></p>
                    <TextInput
                        className="grey-bg question ps-3 pe-3 pt-2"
                        value={course.imglink}
                        onChange={(e) => handleCourseChange(e, 'imglink')}
                    />
                </div>
                <div className="mt-5">
                    <p style={{ color: "#01F401", marginLeft: "8px" }}><b>Teacher:</b></p>
                    <select
                        className="grey-bg text-white ps-3 pe-3 select-answer"
                        value={course.teacher}
                        onChange={(e) => handleCourseChange(e, 'teacher')}
                    >
                        <option value="" disabled>Select a teacher</option>
                        {teachers.map(teacher => (
                            <option key={teacher.user.id} value={teacher.user.id}>
                                {teacher.user.first_name} {teacher.user.last_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-5">
                    <PixelatdButton type="submit" className="btn btn-success" text="Save Course"></PixelatdButton>
                </div>
            </form>
        </RootContainer>
    );
}

export default AddCourse;




