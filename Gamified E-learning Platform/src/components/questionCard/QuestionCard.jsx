import React, {useEffect, useState} from 'react';
import './QuestionCard.css'
import {useNavigate} from "react-router-dom";

function QuestionCard({questionId}) {
    const [question, setQuestion] = useState('')
    const [chapter, setChapter] = useState('')
    const [course, setCourse] = useState('')
    const navigate = useNavigate()

    async function fetchQuestion() {
        const response = await fetch(`http://127.0.0.1:8000/api/questions/${questionId}`);
        const questionData = await response.json();
        setQuestion(questionData);
        fetchChapter(questionData.chapter);
    }

    async function fetchChapter(chapterId) {
        const response = await fetch(`http://127.0.0.1:8000/api/chapters/${chapterId}`);
        const chapterData = await response.json();
        setChapter(chapterData);
        fetchCourse(chapterData.course);
    }

    async function fetchCourse(courseId) {
        const response = await fetch(`http://127.0.0.1:8000/api/courses/${courseId}`);
        const courseData = await response.json();
        setCourse(courseData);
    }
    const handleCardClick = () => {
        navigate(`/answer/${questionId}`)
    }

        useEffect(() => {
        fetchQuestion()
    }, []);

    return (
        <>                {question && question.question_answer == 'no answer yet' ? (

            <div className="shadow mt-3 question-card-container bg-white card-hover2" onClick={handleCardClick}>
                {course &&
                    <p className="question-course-name mt-1">{course.courseName}</p>}
                {chapter &&
                    <p className="question-chapter-name">Chapter : {chapter.chapterName}</p>}
                <br/>
                {question &&
                    <p className="questio-question"><b>Question:</b> {question.question_content}</p>}
                <br/></div>) : (
            <div className="shadow mt-3 question-card-container bg-white " >
                {course &&
                    <p className="question-course-name mt-1">{course.courseName}</p>}
                {chapter &&
                    <p className="question-chapter-name">Chapter : {chapter.chapterName}</p>}
                <br/>
                {question &&
                    <p className="questio-question"><b>Question:</b> {question.question_content}</p>}
                <br/>
                <p className="questio-answer mb-2"><b>Answer:</b> {question.question_answer}</p>
            </div>

        )}


        </>
    )
}

export default QuestionCard
