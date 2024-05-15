// StudentDashboard.jsx
import React, {useEffect, useState} from "react";
import {ProgressBar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import RootContainer from "../../utils/rootContainerModule.jsx";
import axios from "axios";
import "./StudentDashboard.css";
import LineChart from "../../components/lineChart/LineChart.jsx";
import SideNavBar from "../../components/sideNavBar/SideNavBar";
import SearchBar from "../../components/searchBar/SearchBar.jsx";  // Import the SideNavBar component

function StudentDashboard() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState('');
    const [loggedIn, setLoggedIn] = useState('');
    const [dailyPoints, setDailyPoints] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [lineChartData, setLineChartData] = useState({ labels: [], datasets: [] });
    const [chapterProgressData, setChapterProgressData] = useState({ labels: [], datasets: [] });



    useEffect(() => {
        checkLoggedIn();
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
                console.log(data);
                getStatistics(data.user.id);
                getCourseProgress(data.user.id)
                getCourseStatistics(data.user.id);
                getChapterProgress(data.user.id)


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
    async function getChapterProgress(userId) {
        try {
            const token = getToken();
            const enrollmentsResponse = await axios.get(`http://127.0.0.1:8000/api/student/${userId}/enrollments`, {
                headers: {
                    Authorization: `Bearer ${token}` // Send token as bearer code
                }
            });
            const enrollments = enrollmentsResponse.data;

            const datasetsPromises = enrollments.map(async (enrollment) => {
                const courseResponse = await axios.get(`http://127.0.0.1:8000/api/courses/${enrollment.course}`);
                const course = courseResponse.data;
                const statisticsResponse = await axios.get(`http://127.0.0.1:8000/api/student/${userId}/statistics`);
                const statistics = statisticsResponse.data;

                // Filter the statistics for this course
                const courseStatistics = statistics.filter(stat => stat.enrollment === enrollment.id);

                // Get the number of chapters passed for the last 7 days
                const chaptersPassed = [];
                for (let i = 6; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    const dateStr = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
                    const stat = courseStatistics.find(stat => stat.date === dateStr);
                    chaptersPassed.push(stat ? stat.passed_chapters : 0);
                }

                return {
                    label: course.courseName,
                    data: chaptersPassed,
                    borderColor: '#63ABFD',  // Replace this with the actual color for this course
                };
            });

            const datasets = await Promise.all(datasetsPromises);

            // Get the labels for the last 7 days
            const labels = [];
            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                labels.push(String(date.getDate()).padStart(2, '0'));
            }

            setChapterProgressData({ labels, datasets });
        } catch (error) {
            console.error('Error fetching chapter progress:', error);
        }
    }

    async function getStatistics(userId) {
        try {
            const token = getToken();
            const response = await axios.get(`http://127.0.0.1:8000/api/student/${userId}/statistics`, {
                headers: {
                    Authorization: `Bearer ${token}` // Send token as bearer code
                }
            });
            const data = response.data;

            // Get today's date in 'yyyy-mm-dd' format
            const todayStr = new Date().toISOString().split('T')[0];
            console.log(data)
            const todaysStats = data.find(stat => stat.date === todayStr);
            const dailyPoints = todaysStats ? todaysStats.points : 0;

            const totalPoints = data.reduce((total, stat) => total + stat.points, 0);

            setDailyPoints(dailyPoints);
            setTotalPoints(totalPoints);
        } catch (error) {
            console.error('Error fetching enrollments:', error);
        }
    }

    // Add these state variables at the beginning of your component
    const [courseProgress, setCourseProgress] = useState([]);

// Add this function to your component
    async function getCourseProgress(userId) {
        try {
            const token = getToken();
            const enrollmentsResponse = await axios.get(`http://127.0.0.1:8000/api/student/${userId}/enrollments`, {
                headers: {
                    Authorization: `Bearer ${token}` // Send token as bearer code
                }
            });
            const enrollments = enrollmentsResponse.data;

            const progressPromises = enrollments.map(async (enrollment) => {
                const courseResponse = await axios.get(`http://127.0.0.1:8000/api/courses/${enrollment.course}`);
                const course = courseResponse.data;
                const chaptersResponse = await axios.get(`http://127.0.0.1:8000/api/courses/${enrollment.course}/chapters`);
                const chapters = chaptersResponse.data;

                return {
                    courseName: course.courseName,
                    progress: (enrollment.passed_chapter / chapters.length) * 100,
                };
            });

            const progress = await Promise.all(progressPromises);
            setCourseProgress(progress.slice(0, 4));  // Get the first 4 courses
        } catch (error) {
            console.error('Error fetching course progress:', error);
        }
    }

    async function getCourseStatistics(userId) {
        try {
            const token = getToken();
            const enrollmentsResponse = await axios.get(`http://127.0.0.1:8000/api/student/${userId}/enrollments`, {
                headers: {
                    Authorization: `Bearer ${token}` // Send token as bearer code
                }
            });
            const enrollments = enrollmentsResponse.data;

            const datasetsPromises = enrollments.map(async (enrollment) => {
                const courseResponse = await axios.get(`http://127.0.0.1:8000/api/courses/${enrollment.course}`);
                const course = courseResponse.data;
                const statisticsResponse = await axios.get(`http://127.0.0.1:8000/api/student/${userId}/statistics`);
                const statistics = statisticsResponse.data;

                // Filter the statistics for this course
                const courseStatistics = statistics.filter(stat => stat.enrollment === enrollment.id);

                // Get the points for the last 7 days
                const points = [];
                for (let i = 6; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    const dateStr = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
                    const stat = courseStatistics.find(stat => stat.date === dateStr);
                    points.push(stat ? stat.points : 0);
                }

                return {
                    label: course.courseName,
                    data: points,
                    borderColor: '#63ABFD',  // Replace this with the actual color for this course
                };
            });

            const datasets = await Promise.all(datasetsPromises);

            const labels = [];
            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                labels.push(String(date.getDate()).padStart(2, '0'));
            }

            setLineChartData({ labels, datasets });
        } catch (error) {
            console.error('Error fetching course statistics:', error);
        }
    }


    // const lineChartData = {
    //     labels: ['9', '10', '11', '12', '14', '15', '16'],
    //     datasets: [
    //         {
    //             label: 'Python',
    //             data: [20, 300, 100, 90, 60, 70, 90],
    //             borderColor: '#63ABFD',
    //         },
    //         {
    //             label: 'Mobile dev',
    //             data: [120, 0, 100, 120, 300, 200, 20],
    //             borderColor: '#E697FF',
    //         },
    //         {
    //             label: 'Web dev',
    //             data: [20, 0, 10, 20, 30, 15, 5],
    //             borderColor: '#FFA5CB',
    //         }, {
    //             label: 'Cyber security',
    //             data: [200, 250, 100, 80, 60, 40, 70],
    //             borderColor: '#FEC400',
    //         },
    //     ]
    // };

    return (
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

                    <div className="mt-xxl-5">
                        <div className="d-flex">
                            <div className="shadow light-grey-bg badge-container row ps-3 pe-3">
                                <img className="badge-img mt-3" src="../../../public/badge.svg" alt="Badge"/>
                                <h1 className="badge-name pt-3 ps-4 pe-4">ByteCoder</h1>
                            </div>
                            <div
                                className="shadow light-grey-bg badge-container ps-5 pe-5 ms-5 d-flex justify-content-center">
                                <div className="row stats">
                                    <div className="col">
                                        <p>Daily</p>
                                        <p style={{color: "#01F401"}}>{dailyPoints}</p>
                                    </div>
                                    <div className="col">
                                        <p>Total</p>
                                        <p style={{color: "#01F401"}}>{totalPoints}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="shadow light-grey-bg ms-5 ps-4 pe-4">
                                <div className="progress-bar-container">
                                    {courseProgress.map((course, index) => (
                                        <div key={index} className="progress-bar-item">
                                            <div className="d-flex justify-content-between">
                                                <p className="sd-course-name st-days1-font">{course.courseName}</p>
                                                <p className="sd-course-name progress-percentage">{Math.round(course.progress)}%</p>
                                            </div>
                                            <ProgressBar now={course.progress} style={{backgroundColor: "#5E677A", height: "5px", width:"400px"}}
                                                         variant="custom"/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex">
                        <div className="shadow light-grey-bg mt-5 chart-container">
                            <LineChart data={lineChartData}/>
                            <p className="text-white text-center st-days1-font">Points progress</p>
                        </div>
                        <div className="shadow light-grey-bg mt-5 chart-container ms-5">
                            <LineChart data={chapterProgressData}/>
                            <p className="text-white text-center st-days1-font">Chapters progress</p>
                        </div>
                        </div>
                    </div>
                </div>
            </RootContainer>
        </>
    );

}

export default StudentDashboard;
