import React, { useEffect, useState } from 'react';
import RootContainer from "../../utils/rootContainerModule.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TeacherSideNavBar from "../../components/teacherSideNavBar/TeacherSideNavBar.jsx";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import LineChart from "../../components/lineChart/LineChart.jsx";
import QuestionCard from "../../components/questionCard/QuestionCard.jsx";

function TeacherStatsPage() {
    const { studentId, courseId } = useParams();
    const [studentData, setStudentData] = useState('');
    const [course, setCourse] = useState('');
    const navigate = useNavigate();
    const [userData, setUserData] = useState('');
    const [loggedIn, setLoggedIn] = useState('');
    const [statisticsData, setStatisticsData] = useState(null);
    const [totalPassedChapters, setTotalPassedChapters] = useState(0);
    const [totalChapters, setTotalChapters] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [notAnsweredQuestions, setNotAnsweredQuestions] = useState([]);

    const fetchTotalPassedChapters = async () => {
        if (statisticsData && statisticsData.length > 0) {
            const enrollmentId = statisticsData[0].enrollment;
            const response = await axios.get(`http://127.0.0.1:8000/api/enrollments/${enrollmentId}`);
            setTotalPassedChapters(response.data.passed_chapter);
        }
    };

    const fetchTotalChapters = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/api/courses/${courseId}/chapters`);
        setTotalChapters(response.data.length);
    };

    const fetchStudent = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/students/${studentId}/`);
            setStudentData(response.data);
        } catch (error) {
            console.error('Error fetching student:', error);
        }
    };

    const fetchCourse = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/courses/${courseId}/`);
            setCourse(response.data);
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    };

    const fetchStatistics = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/statistics/course/${courseId}/student/${studentId}`);
            setStatisticsData(response.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    const getToken = () => {
        return localStorage.getItem('token');
    };

    const checkLoggedIn = async () => {
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
    };

    const gradientStyle = {
        background: `linear-gradient(45deg,#F99ECF , #FF00C7)`,
    };

    useEffect(() => {
        checkLoggedIn();
        fetchCourse();
        fetchStudent();
        fetchStatistics();
    }, [courseId, studentId]);

    useEffect(() => {
        if (statisticsData) {
            fetchTotalPassedChapters();
        }
    }, [statisticsData]);

    useEffect(() => {
        fetchTotalChapters();
    }, [courseId]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/questions/answered/student/${studentId}/course/${courseId}`)
            .then(res => {
                setAnsweredQuestions(res.data);
            })
            .catch(err => console.log(err));

        axios.get(`http://127.0.0.1:8000/api/questions/notAnswered/student/${studentId}/course/${courseId}`)
            .then(res => {
                setNotAnsweredQuestions(res.data);
            })
            .catch(err => console.log(err));
    }, [courseId, studentId]);

    const lineChartData = statisticsData && {
        labels: statisticsData.slice(-10).map(item => item.date),
        datasets: [
            {
                label: 'Points',
                data: statisticsData.slice(-10).map(item => item.points),
                borderColor: '#63ABFD',
            },
        ]
    };

    const chapterProgressData = statisticsData && {
        labels: statisticsData.slice(-10).map(item => item.date),
        datasets: [
            {
                label: 'Passed Chapters',
                data: statisticsData.slice(-10).map(item => item.passed_chapters),
                borderColor: '#E697FF',
            },
        ]
    };

    return (
        <div className="root-no-right-margin mb-xxl-5">
            <RootContainer>
                <TeacherSideNavBar />
                <div className="content" style={{ marginLeft: '160px', marginRight: '250px' }}>
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
                    <div className="d-flex justify-content-center mt-4">
                        {course && totalChapters > 0 && (
                            <div style={gradientStyle} className="teacher-s-course-title-div text-white">
                                <p className="mb-0">{course.courseName} &nbsp;&nbsp;&nbsp;&nbsp;({Math.round(totalPassedChapters / totalChapters * 100)}% completed)</p>
                            </div>
                        )}
                    </div>
                </div>
                <div style={{ marginRight: "250px" }}>
                    <div className="d-flex justify-content-center" style={{ marginLeft: loggedIn ? "100px" : "0px" }}>
                        {studentData &&
                            <div key={studentData.user.id}
                                 className="d-flex shadow bg-white pt-4 pb-4 align-items-center mt-5 ps-3 pe-4 ms-5">
                                <img
                                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                    style={{ height: "100px" }} className="student-card-image" />
                                <p className="ms-4 student-name">{studentData.user.first_name} {studentData.user.last_name}</p>
                            </div>
                        }
                    </div>
                </div>
                <div className="d-flex align-items-center" style={{ marginLeft: "100px", marginRight: "100px" }}>
                    <div className="shadow light-grey-bg mt-5 chart-container">
                        {lineChartData && <LineChart data={lineChartData} />}
                        <p className="text-white text-center st-days1-font">Points progress</p>
                    </div>
                    <div className="shadow light-grey-bg mt-5 chart-container ms-5">
                        {chapterProgressData && <LineChart data={chapterProgressData} />}
                        <p className="text-white text-center st-days1-font">Chapters progress</p>
                    </div>
                </div>
                <div className="d-flex me-5 mb-xxl-5">
                    <div className="mt-xl-5 ms-xxl-5 questions-container">
                        <h3 className="text-white ms-4 mb-3">Not Answered</h3>
                        <div className="shadow bg-white ps-4 pe-4 pb-5 pt-4">
                            {notAnsweredQuestions.map(question =>
                                <QuestionCard key={question.id} questionId={question.id} />
                            )}
                        </div>
                    </div>
                    <div className="mt-xl-5 ms-xxl-5 questions-container">
                        <h3 className="text-white ms-4 mb-3">Answered</h3>

                        <div className="shadow bg-white ps-4 pe-4 pb-5 pt-4">
                            {answeredQuestions.map(question =>
                                <QuestionCard key={question.id} questionId={question.id} />
                            )}
                        </div>
                    </div>
                </div>
            </RootContainer>
        </div>
    );
}

export default TeacherStatsPage;
