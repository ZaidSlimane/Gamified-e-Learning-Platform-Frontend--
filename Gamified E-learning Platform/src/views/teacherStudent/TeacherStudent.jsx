import React, {useEffect, useState} from 'react';
import RootContainer from "../../utils/rootContainerModule.jsx";
import TeacherSideNavBar from "../../components/teacherSideNavBar/TeacherSideNavBar.jsx";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import './TeacherStudent.css';

function TeacherStudent() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState('');
    const [loggedIn, setLoggedIn] = useState('');
    const [students, setStudents] = useState([]);
    const [course, setCourse] = useState('');
    const {courseId} = useParams();

    const getToken = () => {
        return localStorage.getItem('token');
    };

    async function fetchStudents() {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/courses/${courseId}/students`);
            setStudents(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching students:', error);
            setStudents([]);
        }
    }

    async function fetchCourse() {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/courses/${courseId}/`);
            setCourse(response.data);
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    }

    async function checkLoggedIn() {
        try {
            const token = getToken();
            const roleResponse = await axios.get('http://127.0.0.1:8000/api/home', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = roleResponse.data;
            if (data.user.groups.length > 0) {
                setUserData(data);
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
                navigate('/login');
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response && error.response.status === 401) {
                setLoggedIn(false);
                navigate('/login');
            }
        }
    }

    const gradientStyle = {
        background: `linear-gradient(45deg,#F99ECF , #FF00C7)`,
    };

    useEffect(() => {
        checkLoggedIn();
        fetchCourse();
        fetchStudents();
    }, []);

    const handleStudentClick = (studentId) => {
        navigate(`${studentId}`);
    }
    return (
        <div className="root-no-right-margin mb-xxl-5 ">
            <RootContainer>
                <TeacherSideNavBar/>
                <div className="content" style={{marginLeft: '160px', marginRight: '250px'}}>
                    <div className="mt-4 d-flex align-items-center justify-content-between">
                        {userData && (
                            <div>
                                <p className="text-white st_username">Hi, {userData.user.first_name + " " + userData.user.last_name}</p>
                            </div>
                        )}
                        <div className="d-flex align-items-center">
                            <SearchBar width={"100%"}/>
                            <img
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                className="st-profile" alt="profile"
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        {course && (
                            <div style={gradientStyle} className="teacher-s-course-title-div text-white">
                                <p className="mb-0">{course.courseName}</p>
                            </div>
                        )}
                    </div>
                </div>


                <div className="custom-row" style={{marginLeft: loggedIn ? "100px" : "0px", marginRight: "20px"}}>
                    {students.length > 0 ? students.map((student, index) => (
                        <div key={student.id}
                             className="custom-col d-flex shadow bg-white pt-4 pb-4 align-items-center mt-5 ps-3 card-hover"
                             onClick={() => handleStudentClick(student.user.id)} style={{cursor:"pointer"}}>

                            <img
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                style={{height: "100px"}} className="student-card-image"/>
                            <p className="ms-4 student-name">{student.user.first_name} {student.user.last_name}</p>
                        </div>
                    )) : (
                        <p>No students found for this course.</p>
                    )}
                </div>


            </RootContainer>
        </div>
    );
}

export default TeacherStudent;
