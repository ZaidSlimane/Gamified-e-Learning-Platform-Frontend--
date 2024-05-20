import React, {useEffect, useState} from 'react';
import RootContainer from "../../utils/rootContainerModule.jsx";
import {useNavigate, useParams} from "react-router-dom";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import axios from "axios";


function AnsweerQuestions() {
    const {questionId} = useParams();
    const [chapterData, setChapterData] = useState('')
    const [questionData, setQuestionData] = useState('')
    const [questionAnswer, setQuestionAnswer] = useState('');
    const navigate = useNavigate()


    async function fetchQuestion() {
        const response = await fetch(`http://127.0.0.1:8000/api/questions/${questionId}/`);
        const question = await response.json();
        setQuestionData(question)
        fetchChapter(question.chapter)
        return question;
    }

    async function fetchChapter(chapterId) {
        const response = await fetch(`http://127.0.0.1:8000/api/chapters/${chapterId}/`);
        const chapter = await response.json();
        setChapterData(chapter)
        return chapter;
    }

    useEffect(() => {
        fetchQuestion()
    }, []);
    const getToken = () => {
        return localStorage.getItem('token');
    };

    async function submitAnswer() {
        const token = getToken();
        const question = {
            "question_content": questionData.question_content,
            "question_answer": questionAnswer,
            "student": questionData.student,
            "chapter": questionData.chapter
        };
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/questions/${questionId}/`, question, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/teacher/questions')
        } catch (error) {
            console.error('Submit question error:', error);
        }
    }

    return (<RootContainer>
        <div className="shadow bg-white text-center mt-5 p-2">
            <p className="chapter-course-title-q p-q">Chapter: {chapterData.chapterName}</p>
        </div>
        <div className="shadow shadow2 white-border text-white course-content pt-4 mt-5 ps-4">
            <div className="no-shadow   d-flex justify-content-center">
                <div className=" grey-bg drop-shadow shadow mb-5 p-2">
                    <p className="text-center chapter-title p-q">{questionData.question_content}</p>
                </div>
            </div>
            <div className="no-shadow d-flex justify-content-center mb-xxl-5 ">
                <textarea type="text" className="grey-bg question p-3"
                          onChange={e => setQuestionAnswer(e.target.value)}/>
            </div>

        </div>
        <div className="mt-4 d-flex justify-content-center">
            <PixelatdButton text="Submit" onClick={submitAnswer}></PixelatdButton>
        </div>
    </RootContainer>)
}

export default AnsweerQuestions