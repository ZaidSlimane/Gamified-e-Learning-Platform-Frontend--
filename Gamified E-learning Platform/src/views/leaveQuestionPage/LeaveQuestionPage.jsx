import RootContainer from "../../utils/rootContainerModule.jsx";
import React, {useEffect, useState} from "react";
import TextInput from "../../components/textInput/textInput.jsx";
import "./LeaveQuestionPage.css";
import SearchBar from "../../components/searchBar/SearchBar.jsx";

import Navbar from "../../components/navbar/navbar.jsx";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";


function LeaveQuestionPage() {
    const {chapterId} = useParams();
    const {courseId} = useParams();
    const [course, setCourse] = useState('')
    const [chapterData, setChapterData] = useState({});
    const [userData, setuserData] = useState('');
    const [loggedIn, setloggedIn] = useState('');
    const [questionContent, setQuestionContent] = useState('');
    const navigate = useNavigate();



    useEffect(() => {
        fetchChapter()
        fetchCourse()
        checkloggedIn()
    }, []);


    async function fetchCourse() {
        const response = await fetch(`http://127.0.0.1:8000/api/courses/${courseId}/`);
        const course = await response.json();
        setCourse(course)
        return course;
    }

    async function fetchChapter() {
        const response = await fetch(`http://127.0.0.1:8000/api/chapters/${chapterId}/`);
        const chapter = await response.json();
        setChapterData(chapter)
        return course;
    }

    const getToken = () => {
        return localStorage.getItem('token');
    };


    async function checkloggedIn() {
        try {
            const token = getToken()
            const roleResponse = await axios.get('http://127.0.0.1:8000/api/home', {
                headers: {
                    Authorization: `Bearer ${token}` // Send token as bearer code
                }
            });
            const data = roleResponse.data;
            console.log(data.user.id)
            if (data.user.groups.length > 0) {
                setuserData(data);
                setloggedIn(true);
            } else {
                setloggedIn(false);
                navigate('/login')
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response && error.response.status === 401) {
                setloggedIn(false);
                navigate('/login')
            }
            return false
        }
    }

    async function submitQuestion() {
        const token = getToken();
        const questionData = {
            "question_content": questionContent,
            "question_answer": "no answer yet",
            "student": userData.user.id,
            "chapter": chapterId
        };
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/questions/', questionData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Submit question error:', error);
        }
    }






    return (
        <>
            <RootContainer>
                <div className="d-flex justify-content-between align-items-center mt-5">
                    <div className="p-2">
                        <img src="../../../public/logo.svg"/>
                    </div>
                    <div className="d-flex justify-content-center p-2 flex-grow-1">
                        <Navbar></Navbar>
                    </div>
                    <div className="p-2">
                        <SearchBar width="100%"/>
                    </div>
                </div>
                <div className="shadow bg-white text-center mt-5 p-2">
                    <p className="chapter-course-title-q p-q">{course.courseName}</p>
                </div>


                <div className="shadow shadow2 white-border text-white course-content pt-4 mt-5 ps-4">
                    <div className="no-shadow   d-flex justify-content-center">
                        <div className=" grey-bg drop-shadow shadow mb-5 p-2">
                            <p className="text-center chapter-title p-q">{chapterData.chapterName}</p>
                        </div>
                    </div>
                    <div className="no-shadow d-flex justify-content-center mb-xxl-5 ">
                        <textarea type="text" className="grey-bg question p-3" onChange={e => setQuestionContent(e.target.value)} />
                    </div>

                </div>
                <div className="mt-4 d-flex justify-content-center">
                    <PixelatdButton text="Submit" onClick={submitQuestion}></PixelatdButton>
                </div>
            </RootContainer>
        </>)
}

export default LeaveQuestionPage;