import React, {useState, useEffect} from "react";
import TextInput from "../../components/textInput/textInput.jsx";
import "./CoursesPage.css";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import Navbar from "../../components/navbar/navbar.jsx";
import CourseToJoinCard from "../../components/courseToJoinCard/courseToJoinCrad.jsx";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import {useNavigate} from "react-router-dom";
import RootContainer from "../../utils/rootContainerModule.jsx";

async function fetchReviews(courseId) {
    const response = await fetch(`http://127.0.0.1:8000/api/course/${courseId}/reviews`);
    const reviews = await response.json();
    const totalStars = reviews.reduce((total, review) => total + review.stars, 0);
    if (totalStars == 0) {
        return Math.random() * (5 - 2) + 2
    } else
        return totalStars / reviews.length;
}

async function fetchEnrollments(courseId) {
    const response = await fetch(`http://127.0.0.1:8000/api/course/${courseId}/enrollments`);
    const enrollments = await response.json();
    const totalEnrollments = enrollments.length;
    return totalEnrollments;
}


function CoursesPage() {
    const navigate = useNavigate(); // Initialize useNavigate
    const [courses, setCourses] = useState([]);
    const [displayCount, setDisplayCount] = useState(6);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/courses/')
            .then(response => response.json())
            .then(async (courses) => {
                for (let course of courses) {
                    course.stars = await fetchReviews(course.id);
                    course.enrollments = await fetchEnrollments(course.id);
                }
                setCourses(courses);
            });
    }, []);

    const handleSignInClick = () => {
        navigate("/login"); // Navigate to /login when Sign in is clicked
    }
    const handleSignUpClick = () => {
        navigate("/SignUp"); // Navigate to /login when Sign in is clicked
    }
    return (
        <>
            <RootContainer>
                <div className="row g-0 navigation-header justify-content-between align-items-center mt-5"
                     style={{marginBottom: '100px'}}>
                    <div className="col-auto">
                        <img src="../../../public/logo.svg"/>
                    </div>
                    <div className="col-auto">
                        <Navbar></Navbar>
                    </div>
                    <div className="col-auto d-flex align-items-center" style={{marginLeft:"-60px"}}>
                        <PixelatdButton className="btn btn-primary me-2" type="submit" text="Register" onClick={handleSignUpClick}></PixelatdButton>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <PixelatdButton className="btn btn-primary" type="submit"text="Sign in" onClick={handleSignInClick} ></PixelatdButton>
                    </div>
                </div>
                <div className={"mb-5  d-flex justify-content-center"} style={{marginRight: "20px"}}>
                    <SearchBar></SearchBar>
                </div>
                <div className={"row row-cols-3"} style={{marginRight: "20px"}}>
                    {courses.slice(0, displayCount).map((course) => (
                        <div className="col d-flex justify-content-center">
                            <CourseToJoinCard
                                imageUrl={course.imglink}
                                courseName={course.courseName}
                                stars={course.stars}
                                summary={course.courseSummary}
                                enrollments={course.enrollments}
                                id = {course.id}
                            />
                        </div>
                    ))}
                </div>
                <div className={"mt-3 mb-5 d-flex justify-content-center"}>
                    <PixelatdButton text={isExpanded ? "SHOW LESS" : "VIEW MORE"} onClick={() => {
                        if (isExpanded) {
                            setDisplayCount(6);
                        } else {
                            setDisplayCount(courses.length);
                        }
                        setIsExpanded(!isExpanded);
                    }}/>
                </div>
            </RootContainer>
        </>);
}

export default CoursesPage;
