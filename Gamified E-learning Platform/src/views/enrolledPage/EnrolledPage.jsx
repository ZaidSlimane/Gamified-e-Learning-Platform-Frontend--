import React, {useEffect, useState} from "react";
import RootContainer from "../../utils/rootContainerModule.jsx";
import SideNavBar from "../../components/sideNavBar/SideNavBar.jsx";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import axios from "axios";
import CourseToJoinCard from "../../components/courseToJoinCard/courseToJoinCrad.jsx";
import {useNavigate} from "react-router-dom";


function StudentDashboard() {
    const [userData, setUserData] = useState('');
    const [loggedIn, setLoggedIn] = useState('');
    let [enrolledCourses, setEnrolledCourses] = useState([]);
    const navigate = useNavigate();




    useEffect(() => {
        checkLoggedIn()
    }, []);
    const getToken = () => {
        return localStorage.getItem('token');
    };

    async function checkLoggedIn() {
        try {
            const token = getToken();
            const roleResponse = await axios.get('http://127.0.0.1:8000/api/home', {
                headers: {
                    Authorization: `Bearer ${token}` // Send token as bearer code
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

    async function fetchEnrollments(courseId) {
        const response = await fetch(`http://127.0.0.1:8000/api/course/${courseId}/enrollments`);
        const enrollments = await response.json();
        const totalEnrollments = enrollments.length;
        return totalEnrollments;
    }

    async function fetchReviews(courseId) {
        const response = await fetch(`http://127.0.0.1:8000/api/course/${courseId}/reviews`);
        const reviews = await response.json();
        const totalStars = reviews.reduce((total, review) => total + review.stars, 0);
        if (totalStars == 0) {
            return Math.random() * (5 - 2) + 2
        } else
            return totalStars / reviews.length;
    }

    async function fetchCourses(studentId) {
        const response = await fetch(`http://127.0.0.1:8000/api/student/${studentId}/courses`);
        const enrollments = await response.json();

        const coursesWithDetails = await Promise.all(enrollments.map(async (course) => {
            const stars = await fetchReviews(course.id);
            const enrollments = await fetchEnrollments(course.id);
            return { ...course, stars, enrollments };
        }));

        setEnrolledCourses(coursesWithDetails);
        return enrollments.length;
    }

    return(
        <>
            <RootContainer>
                <SideNavBar/>
                <div className="content" style={{marginLeft: '200px'}}>
                    <div className="mt-4 d-flex align-items-center justify-content-between">
                        {userData && (
                            <div>
                                <p className="text-white st_username">Hi, {userData.user.first_name + " " + userData.user.last_name}</p>
                            </div>)}
                        <div className="d-flex align-items-center">
                            <SearchBar width={"100%"}/>
                            <img
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                className="st-profile"/>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={"row row-cols-3 mt-5"} style={{marginRight: "20px", marginLeft:"100px"}}>
                        {enrolledCourses.map((course) => (
                            <div className="col d-flex justify-content-center">
                                <CourseToJoinCard
                                    imageUrl={course.imglink}
                                    courseName={course.courseName}
                                    stars={course.stars}
                                    summary={course.courseSummary}
                                    enrollments={course.enrollments}
                                    id={course.id}
                                    buttonText={"CONTINUE"}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </RootContainer>
        </>
    )
}

export default StudentDashboard;