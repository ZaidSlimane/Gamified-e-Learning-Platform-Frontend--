import RootContainer from "../../utils/rootContainerModule.jsx";
import React, {useEffect, useState} from "react";
import TextInput from "../../components/textInput/textInput.jsx";
import "./EnrollPage.css";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import CourseInfoCard from "../../components/courseInfoCard/courseInfoCard.jsx";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import {useParams} from "react-router-dom";

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
    const {courseId} = useParams();
    const [course, setCourse] = useState(null);
    const [supervisor, setSupervisor] = useState(null);
    const [supervisorJob, setSupervisorJob] = useState(null);
    const [chapters, setChapters] = useState([]);

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
    }, []);

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
                            <p className="mt-3 description-text">
                                {course && course.courseLongSummary}

                            </p>
                            <h4>Recompenses : </h4>
                            <p className="description-text">
                                {course && course.recompense}   LEGOS
                            </p>
                        </div>
                        <div className="text-white ps-4 ms-4" style={{width: "40%"}}>
                            <h4>Course Content</h4>
                            <div className="shadow white-border  course-content pt-4 ps-4 chapters">
                                <div className="no-shadow pe-4">
                                    {chapters.map((chapter) => (
                                        <p className="ps-2 text-start">· {chapter.chapterName}</p>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-4 mb-5">
                    <PixelatdButton text="ENROLL"></PixelatdButton>
                </div>

            </RootContainer>
        </>);
}

export default EnrollPage;
