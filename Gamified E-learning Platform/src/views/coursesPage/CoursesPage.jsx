import React, {useState, useEffect} from "react";
import TextInput from "../../components/textInput/textInput.jsx";
import "./CoursesPage.css";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import Navbar from "../../components/navbar/navbar.jsx";
import CourseToJoinCard from "../../components/courseToJoinCard/courseToJoinCrad.jsx";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import {useNavigate} from "react-router-dom";
import RootContainer from "../../utils/rootContainerModule.jsx";
import axios from "axios";
import SideNavBar from "../../components/sideNavBar/SideNavBar.jsx";
import Spinner from "../../components/spinner/Spinner.jsx";

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
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    let [courses, setCourses] = useState([]);
    const [displayCount, setDisplayCount] = useState(6);
    const [isExpanded, setIsExpanded] = useState(false);

    const getToken = () => {
        return localStorage.getItem('token');
    };
    const [userData, setuserData] = useState('');
    const [loggedIn, setloggedIn] = useState('');

    async function checkloggedIn() {
        try {
            const token = getToken()
            const roleResponse = await axios.get('http://127.0.0.1:8000/api/home/', {
                headers: {
                    Authorization: `Bearer ${token}` // Send token as bearer code
                }

            });
            const data = roleResponse.data;
            if (data.user.groups.length > 0) {
                setuserData(data);
                setloggedIn(true);
                setLoading(false);
                const response = await fetch(`http://127.0.0.1:8000/api/student/${data.user.id}/notenrolled`);
                let enrollments = await response.json();
                for (let course of enrollments) {
                    course.stars = await fetchReviews(course.id);
                    course.enrollments = await fetchEnrollments(course.id);
                }
                console.log(enrollments)
                setCourses(enrollments);

            } else {
                setloggedIn(false);
                setLoading(false);
            }
        } catch
            (error) {
            if (error.response && error.response.status === 401) {
                setloggedIn(false);
                console.log("ASDgfasdgf")
                setLoading(false);
            }
            console.error('Login error:', error);
            setError(true);
            setloggedIn(false)
            setLoading(false);
            return false
        }
    }

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/courses/')
            .then(response => response.json())
            .then(async (courses) => {
                for (let course of courses) {
                    course.stars = await fetchReviews(course.id);
                    course.enrollments = await fetchEnrollments(course.id);
                }
                setCourses(courses);
                return checkloggedIn();  // Move the checkloggedIn call here
            })
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
                {loading ? (
<Spinner/>                ) : (
                    <>
                {loggedIn ? (
                    <div className="mb-xxl-5">
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

                    </div>
                ) : (
                    <>
                        <div className="row g-0 navigation-header justify-content-between align-items-center mt-5"
                             style={{marginBottom: '100px'}}>
                            <div className="col-auto">
                                <img src="../../../public/logo.svg"/>
                            </div>
                            <div className="col-auto">
                                <Navbar></Navbar>
                            </div>
                            <div className="col-auto d-flex align-items-center" style={{marginLeft: "-60px"}}>
                                <PixelatdButton className="btn btn-primary me-2" type="submit" text="Register"
                                                onClick={handleSignUpClick}></PixelatdButton>
                                <p>      </p>
                                <PixelatdButton className="btn btn-primary" type="submit" text="Sign in"
                                                onClick={handleSignInClick}></PixelatdButton>
                            </div>
                        </div>


                <div className={"mb-5  d-flex justify-content-center"} style={{marginRight: "20px"}}>
                    <SearchBar className="sss"></SearchBar>
                </div></>
                )}
                <div className={"row row-cols-3"} style={{marginLeft: loggedIn ? "100px" : "0px", marginRight:"20px"}}>
                    {courses.slice(0, displayCount).map((course) => (
                        <div className="col d-flex justify-content-center">
                            <CourseToJoinCard
                                imageUrl={course.imglink}
                                courseName={course.courseName}
                                stars={course.stars}
                                summary={course.courseSummary}
                                enrollments={course.enrollments}
                                id={course.id}
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
                    </>)}
            </RootContainer>
        </>);
}

export default CoursesPage;
