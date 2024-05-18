import React, {useEffect, useState} from 'react';
import RootContainer from "../../utils/rootContainerModule.jsx";
import TeacherSideNavBar from "../../components/teacherSideNavBar/TeacherSideNavBar.jsx";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import QuestionCard from "../../components/questionCard/QuestionCard.jsx";
import './TeacherQuestions.css'
import {useNavigate} from "react-router-dom";
import axios from "axios";

function TeacherQuestions() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState('');
    const [loggedIn, setLoggedIn] = useState('');
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [notAnsweredQuestions, setNotAnsweredQuestions] = useState([]);

    const getToken = () => {
        return localStorage.getItem('token');
    };

    async function getQuestions(TeacherId){
        axios.get(`http://127.0.0.1:8000/api/questions/answered/teacher/${TeacherId}`)
            .then(res => {
                setAnsweredQuestions(res.data);
            })
            .catch(err => console.log(err));

        axios.get(`http://127.0.0.1:8000/api/questions/notAnswered/teacher/${TeacherId}`)
            .then(res => {
                setNotAnsweredQuestions(res.data);
            })
            .catch(err => console.log(err));
    }

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
                getQuestions(data.user.id)
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
    useEffect(() => {
        checkLoggedIn()
    }, []);

    return (
        <div className="root-no-right-margin mb-xxl-5">
            <RootContainer>
                <TeacherSideNavBar/>
                <div className="content ms-4 me-4">
                    <div className="mt-4 d-flex align-items-center justify-content-between"  style={{marginLeft: '160px', marginRight: '250px'}}>
                        {userData && (
                            <div>
                                <p className="text-white st_username">Hi, {userData.user.first_name + " " + userData.user.last_name}</p>
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

                    <div className="d-flex me-5 mb-xxl-5">
                        <div className="mt-xl-5 ms-xxl-5 questions-container">
                            <h3 className="text-white ms-4 mb-3">Not Answered</h3>
                            <div className="shadow bg-white ps-4 pe-4 pb-5 pt-4">
                                {notAnsweredQuestions.map(question =>
                                    <QuestionCard key={question.id} questionId={question.id}/>
                                )}
                            </div>
                        </div>
                        <div className="mt-xl-5 ms-xxl-5 questions-container">
                            <h3 className="text-white ms-4 mb-3">Answered</h3>

                            <div className="shadow bg-white ps-4 pe-4 pb-5 pt-4">
                                {answeredQuestions.map(question =>
                                    <QuestionCard key={question.id} questionId={question.id}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </RootContainer>
        </div>
    )
}



export default TeacherQuestions;