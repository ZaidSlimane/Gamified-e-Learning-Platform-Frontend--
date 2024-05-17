import React, {useEffect, useState} from "react";
import axios from "axios";
import RootContainer from "../../utils/rootContainerModule.jsx";
import SideNavBar from "../../components/sideNavBar/SideNavBar.jsx";
import QuestionCard from "../../components/questionCard/QuestionCard.jsx";
import './QuestionsPage.css'
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import {useNavigate} from "react-router-dom";

function QuestionsPage() {
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [notAnsweredQuestions, setNotAnsweredQuestions] = useState([]);
    const [userData, setUserData] = useState('');
    const [loggedIn, setLoggedIn] = useState('');
    const navigate = useNavigate();


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

    useEffect(() => {
        checkLoggedIn()
        axios.get('http://127.0.0.1:8000/api/questions/answered')
            .then(res => {
                setAnsweredQuestions(res.data);
            })
            .catch(err => console.log(err));

        axios.get('http://127.0.0.1:8000/api/questions/notAnswered')
            .then(res => {
                setNotAnsweredQuestions(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className="root-no-right-margin">
                <RootContainer className="root-container">
                    <SideNavBar/>
                    <div className="content" style={{marginLeft: '200px', marginRight: '250px'}}>
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
                    <div className="d-flex me-5">
                        <div className="mt-xl-5 ms-xxl-5 questions-container">

                            <div className="shadow bg-white  ps-4 pe-4 pb-5 pt-4">
                                {notAnsweredQuestions.map(question =>
                                    <QuestionCard key={question.id} questionId={question.id}/>
                                )}
                            </div>
                        </div>
                        <div className="mt-xl-5 ms-xxl-5 questions-container">
                            <div className="shadow bg-white  ps-4 pe-4 pb-5 pt-4">
                                {answeredQuestions.map(question =>
                                    <QuestionCard key={question.id} questionId={question.id}/>
                                )}
                            </div>
                        </div>
                    </div>
                </RootContainer>
            </div>
        </>
    )
}

export default QuestionsPage;
