import RootContainer from "../../utils/rootContainerModule.jsx";
import React, {useState, useEffect} from "react";
import TextInput from "../../components/textInput/textInput.jsx";
import "./ChapterPage.css";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import CourseInfoCard from "../../components/courseInfoCard/courseInfoCard.jsx";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import Navbar from "../../components/navbar/navbar.jsx";
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";

function ChapterPage() {
    const [chapterData, setChapterData] = useState({});
    const [chapters, setChapters] = useState([]);
    const chapterId = window.location.pathname.split('/').pop();
    const {courseId} = useParams();
    const [course, setCourse] = useState('')
    const navigate = useNavigate();

    const handleQuestionClick = () => {
        navigate('/question')
    }


        async function fetchChapters(courseId) {
        const response = await fetch(`http://127.0.0.1:8000/api/courses/${courseId}/chapters`);
        const chapters = await response.json();
        setChapters(chapters)
        return chapters;
    }


    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/chapters/${chapterId}`)
            .then(response => {
                setChapterData(response.data);
                fetchChapters(response.data.course);
                fetchCourse(courseId)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    async function fetchCourse(courseId) {
        const response = await fetch(`http://127.0.0.1:8000/api/courses/${courseId}/`);
        const course = await response.json();
        setCourse(course)
        console.log(course.courseName)
        return course;
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
                <div className="shadow bg-white text-center mt-5 pb-2">
                    <p className="chapter-course-title " id="p">{course.courseName}</p>
                </div>
                <div className={"main-component mt-xl-5 mb-5"}>
                    <div className="row pb-xxl-5">
                        <div className="text-white course-decription" style={{width: "60%"}}>
                            <h4>{chapterData.chapterName}</h4>
                            <p className="mt-3 description-text text-justify" id="p">
                                {chapterData.content && chapterData.content.split('-').map((part, index) => {
                                    if (part.includes('**')) {
                                        const textParts = part.split('**');
                                        return (
                                            <React.Fragment key={index}>
                                                <span className="chapter-course-title">{textParts[1]}</span>
                                                <br/>
                                            </React.Fragment>
                                        );
                                    } else {
                                        return (
                                            <React.Fragment key={index}>
                                                {part.trim()}
                                                <br/>
                                            </React.Fragment>
                                        );
                                    }
                                })}
                            </p>


                        </div>
                        <div className="text-white ps-4 ms-4" style={{width: "35%"}}>
                            <h4>Course Chapters</h4>
                            <div className="shadow white-border  course-content pt-4 ps-4 chapters">
                                <div className="no-shadow pe-4">
                                    {chapters.map((chapter, index) => {
                                        let symbol = '·';
                                        let className = 'ps-2 text-start paragraph';
                                        let onClick = null;

                                        if (chapter.id === chapterData.id) {
                                            className = 'current-chapter-class';
                                        } else if (chapter.id > chapterData.id) {
                                            className = 'higher-id-class';
                                            symbol = '🔒'; // replace with your lock symbol
                                        } else {
                                            className = 'lower-id-class';
                                            symbol = '✅'; // replace with your check mark symbol
                                            onClick = () => {
                                                // handle click event, e.g., navigate to the chapter
                                            };
                                        }

                                        return (
                                            <p key={index}
                                               className={className}
                                               onClick={onClick}
                                               id="p"
                                            >
                                                {symbol} {chapter.chapterName}
                                            </p>
                                        );
                                    })}


                                </div>
                            </div>
                            <div className="mt-4 ms-3">
                                <PixelatdButton text="Leave a question" onClick={handleQuestionClick}></PixelatdButton>
                            </div>

                        </div>
                    </div>
                </div>
            </RootContainer>
        </>);
}


export default ChapterPage;
