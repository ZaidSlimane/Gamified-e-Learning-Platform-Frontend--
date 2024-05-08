import RootContainer from "../../utils/rootContainerModule.jsx";
import React, {useEffect, useState} from "react";
import TextInput from "../../components/textInput/textInput.jsx";
import "./EnrollPage.css";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import CourseInfoCard from "../../components/courseInfoCard/courseInfoCard.jsx";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";


async function fetchReviews(courseId) {
    const response = await fetch(`http://127.0.0.1:8000/api/course/${courseId}/reviews`);
    const reviews = await response.json();
    const totalStars = reviews.reduce((total, review) => total + review.stars, 0);
    if (totalStars == 0) {
        return Math.floor(Math.random() * (5 - 1)) + 2;
    } else
        return totalStars / reviews.length;
}

async function fetchTeacher(teacherId) {
    const response = await fetch(`http://127.0.0.1:8000/api/teachers/${teacherId}`);
    const teacher = await response.json();
    return teacher;
}

async function fetchChapters(courseId) {
    const response = await fetch(`http://127.0.0.1:8000/api/courses/${courseId}/chapters`);
    const chapters = await response.json();
    return chapters;
}

function EnrollPage() {
    const navigate = useNavigate();

    const {courseId} = useParams();
    const [course, setCourse] = useState(null);
    const [supervisor, setSupervisor] = useState(null);
    const [supervisorJob, setSupervisorJob] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [enrolled, setEnrolled] = useState(null);


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/courses/${courseId}`)
            .then(response => response.json())
            .then(async (course) => {
                course.stars = await fetchReviews(course.id);
                const teacher = await fetchTeacher(course.teacher_id);
                setSupervisor(teacher.user.username);
                if (teacher.grade == 'Pr')
                    teacher.grade = 'Professor'
                setSupervisorJob(teacher.grade);
                const chapters = await fetchChapters(course.id);
                setChapters(chapters);
                setCourse(course);
            });
        checkloggedIn();

    }, []);




    const getToken = () => {
        return localStorage.getItem('token');
    };
    const [userData, setuserData] = useState('');
    const [loggedIn, setloggedIn] = useState('');

    async function checkloggedIn() {
        try {
            const token = getToken()
            const roleResponse = await axios.get('http://127.0.0.1:8000/api/home', {
                headers: {
                    Authorization: `Bearer ${token}` // Send token as bearer code
                }
            });
            const data = roleResponse.data;
            if (data.user.groups.length > 0) {
                setuserData(data);
                setloggedIn(true);
                checkEnrolled(data.user.id)
            } else {
                setloggedIn(false);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(true);
            return false
        }
    }


    async function checkEnrolled(id) {
            try {
                const token = getToken();
                const enrollmentsResponse = await axios.get(`http://127.0.0.1:8000/api/student/${id}/enrollments`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Send token as bearer code
                    }
                });
                const enrollments = enrollmentsResponse.data;
                console.log(enrollments)
                const isEnrolled = enrollments.some(enrollment => Number(enrollment.course) === Number(courseId));

                setEnrolled(isEnrolled);
                if (isEnrolled)
                    navigate('/')
            } catch (error) {

                console.error('Enrollment check error:', error);
                return false;

        }
    }

    async function enroll(courseId, studentId) {
        try {
            const token = getToken();
            const response = await axios.post('http://127.0.0.1:8000/api/enrollments/', {
                course: courseId,
                student: studentId
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // Send token as bearer code
                }
            });

            if (response.status === 201) {
                console.log("Enrollment successful");
                setEnrolled(true);
            } else {
                console.log("Enrollment failed");
            }
        } catch (error) {
            console.error('Enrollment error:', error);
        }
    }


    const handleEnrollOnClick = () => {
        if (loggedIn) {

        } else {
            navigate("/login")
        }
        enroll(courseId, userData.user.id);
    }


    return (
        <>
            <RootContainer>
                <div className="row g-0 navigation-header justify-content-between align-items-center mt-5 mb-5"
                >
                    <div className="col-auto">
                        <img src="../../../public/logo.svg"/>

                    </div>
                    <div className={"col  d-flex justify-content-center"} style={{marginRight: "20px"}}>
                        <SearchBar></SearchBar>
                    </div>

                </div>
                <div className={"d-flex justify-content-center"}>
                    {course && (
                        <CourseInfoCard
                            imageUrl={course.imglink}
                            courseTitle={course.courseName}
                            courseSummary={course.courseSummary}
                            stars={course.stars}
                            supervisor={supervisor}
                            supervisorJob={supervisorJob}
                        />
                    )}
                </div>
                <div className={"main-component mt-xl-5"}>
                    <div className="row pb-xxl-5">
                        <div className="text-white course-decription" style={{width: "55%"}}>
                            <h4>Course Summary</h4>
                            <p className="mt-3 description-text paragraph">
                                {course && course.courseLongSummary}

                            </p>
                            <h4>Recompenses : </h4>
                            <p className="description-text  paragraph">
                                {course && course.recompense} LEGOS
                            </p>
                        </div>
                        <div className="text-white ps-4 ms-4" style={{width: "40%"}}>
                            <h4>Course Content</h4>
                            <div className="shadow white-border  course-content pt-4 ps-4 chapters">
                                <div className="no-shadow pe-4">
                                    {chapters.map((chapter, index) => (
                                        <p key={index} className="ps-2 text-start  paragraph">· {chapter.chapterName}</p>
                                    ))}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-4 mb-5">
                    <PixelatdButton text="ENROLL" onClick={handleEnrollOnClick}></PixelatdButton>
                </div>

            </RootContainer>
        </>);
}

export default EnrollPage;
