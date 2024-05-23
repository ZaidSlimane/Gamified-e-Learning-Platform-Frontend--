import React, {useEffect, useState} from "react";
import RootContainer from "../../utils/rootContainerModule.jsx";
import axios from "axios";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import {useNavigate} from "react-router-dom";
import TeacherCourseCard from "../../components/teacherCourseCard/TeacherCourseCard.jsx";
import './SpecialistCourses.css'
import SpecialistCourseCard from "../../components/specialistCourseCard/SpecialistCourseCard.jsx";
import SpecialistSideNavBar from "../../components/specialistSideNavBar/SpecialistSideNavBar.jsx";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";

function SpecialistCourses() {

    const [courses, setCourses] = useState([]);
    const [userData, setuserData] = useState('');
    const [loggedIn, setloggedIn] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate()

    async function fetchCourses(courseId) {
        const response = await fetch(`http://127.0.0.1:8000/api/courses`);
        const courses = await response.json();
        setCourses(courses);
        return courses;
    }

    async function checkloggedIn() {
        try {
            const token = getToken()
            const roleResponse = await axios.get('http://127.0.0.1:8000/api/home/', {
                headers: {
                    Authorization: `Bearer ${token}` // Send token as bearer code
                }

            });
            const data = roleResponse.data;
            console.log(data)

            if (data.groups.length > 0) {
                setuserData(data);
                setloggedIn(true);
                setRole(localStorage.getItem('ROLE'))


            } else {
                setloggedIn(false);
                navigate('/login')
            }
        } catch
            (error) {
            if (error.response && error.response.status === 401) {
                setloggedIn(false);
                navigate('/login')

            }
            console.error('Login error:', error);
            setloggedIn(false)
            navigate('/login')

            return false
        }
    }

    const getToken = () => {
        return localStorage.getItem('token');
    };
    useEffect(() => {
        console.log("Adfkln")
        checkloggedIn();
        fetchCourses()
    }, []);
    const colors = [["#F99ECF", "#FF5CDB"], ["#70D1C6", "#3F96E6"], ["#70D1C6", "#3F96E6"], ["#F99ECF", "#FF5CDB"]];


    const handleCourseOnClick = (courseId) => {
        navigate(`course/${courseId}`)
    }
    const handleAddCourseOnClick = () => {
        navigate(`addCourse`)
    }
    return (

        <RootContainer>
            <SpecialistSideNavBar/>
            <div style={{marginLeft: '160px'}}>
                <div className="content">
                    <div className="mt-4 d-flex align-items-center justify-content-between">
                        {userData && (
                            <div>
                                <p className="text-white st_username">Hi, {userData.first_name + " " + userData.last_name}</p>
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
                </div>
                <div className="text-center text-white" style={{fontFamily: "Inter"}}><h4>Courses</h4></div>
                <div className="mt-5 d-flex flex-wrap specialist-course-cards-container">

                    {courses.map((course, index) => (
                        <div style={{flex: '0 0 50%'}} key={course.id}>
                            <SpecialistCourseCard
                                courseId={course.id}
                                courseName={course.courseName}
                                startColor={colors[index % colors.length][0]}
                                endColor={colors[index % colors.length][1]}
                                onClick={() => handleCourseOnClick(course.id)}
                            />
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-center mb-4 mt-4 ms"     >
                    <PixelatdButton text="Add course" onClick={handleAddCourseOnClick}/>

                </div>
            </div>


        </RootContainer>);
}

export default SpecialistCourses;