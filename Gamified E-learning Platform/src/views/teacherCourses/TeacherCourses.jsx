import React, { useEffect, useState } from "react";
import RootContainer from "../../utils/rootContainerModule.jsx";
import TeacherSideNavBar from "../../components/teacherSideNavBar/TeacherSideNavBar.jsx";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TeacherCourseCard from "../../components/teacherCourseCard/TeacherCourseCard.jsx";

function TeacherCourses() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState('');
    const [loggedIn, setLoggedIn] = useState('');
    const [courses, setCourses] = useState([]);

    const getToken = () => {
        return localStorage.getItem('token');
    };

    async function fetchCourses(teacherId) {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/teacher/${teacherId}/courses`);
            const coursesWithEnrollments = await Promise.all(response.data.map(async (course) => {
                const enrollmentResponse = await axios.get(`http://127.0.0.1:8000/api/course/${course.id}/enrollments`);
                return { ...course, numberOfEnrollments: enrollmentResponse.data.length };
            }));
            setCourses(coursesWithEnrollments);
        } catch (error) {
            console.error('Error fetching courses:', error);
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
                fetchCourses(data.user.id);
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
            return false;
        }
    }

    useEffect(() => {
        checkLoggedIn();
    }, []);

    const colors = [["#F99ECF", "#FF5CDB"], ["#70D1C6", "#3F96E6"], ["#70D1C6", "#3F96E6"], ["#F99ECF", "#FF5CDB"]];

    const handleCardClick = (courseId) => {
        navigate(`${courseId}`);
    };

    return (
        <RootContainer>
            <TeacherSideNavBar />
            <div className="content" style={{ marginLeft: '160px' }}>
                <div className="mt-4 d-flex align-items-center justify-content-between">
                    {userData && (
                        <div>
                            <p className="text-white st_username">Hi, {userData.user.first_name + " " + userData.user.last_name}</p>
                        </div>
                    )}
                    <div className="d-flex align-items-center">
                        <SearchBar width={"100%"} />
                        <img
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            className="st-profile" alt="profile"
                        />
                    </div>
                </div>
                <div className="mt-5 d-flex flex-wrap">
                    {courses.map((course, index) => (
                        <div style={{ flex: '0 0 50%' }} key={course.id}>
                            <TeacherCourseCard
                                courseId={course.id}
                                numberOfEnrollments={course.numberOfEnrollments}
                                courseName={course.courseName}
                                startColor={colors[index % colors.length][0]}
                                endColor={colors[index % colors.length][1]}
                                onClick={handleCardClick} // Ensure onClick is passed here
                            />
                        </div>
                    ))}

                </div>
            </div>
        </RootContainer>
    );
}

export default TeacherCourses;
