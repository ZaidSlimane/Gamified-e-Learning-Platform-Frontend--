import React, { useEffect, useState } from 'react';
import RootContainer from "../../utils/rootContainerModule.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SpecialistSideNavBar from "../../components/specialistSideNavBar/SpecialistSideNavBar.jsx";
import './EditCoursePage.css';
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import SpecialistCourseCard from "../../components/specialistCourseCard/SpecialistCourseCard.jsx";
import PixelatedButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

function EditCoursePage() {
    const getToken = () => {
        return localStorage.getItem('token');
    };

    const [userData, setUserData] = useState('');
    const [loggedIn, setLoggedIn] = useState('');
    const [course, setCourse] = useState('');
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [chapters, setChapters] = useState([]);
    const [isChapterPopupOpen, setIsChapterPopupOpen] = useState(false);
    const [chapterToDelete, setChapterToDelete] = useState(null);
    const [isCoursePopupOpen, setIsCoursePopupOpen] = useState(false);

    useEffect(() => {
        checkLoggedIn();
        fetchCourse(courseId);
        fetchChapters(courseId);
    }, []);

    async function checkLoggedIn() {
        try {
            const token = getToken();
            const roleResponse = await axios.get('http://127.0.0.1:8000/api/home', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = roleResponse.data;
            if (data.groups.length > 0) {
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

    async function fetchCourse(courseId) {
        const response = await fetch(`http://127.0.0.1:8000/api/courses/${courseId}`);
        const courseData = await response.json();
        setCourse(courseData);
        return courseData;
    }

    async function fetchChapters(courseId) {
        const response = await fetch(`http://127.0.0.1:8000/api/courses/${courseId}/chapters`);
        const chaptersData = await response.json();

        for (const chapter of chaptersData) {
            const gamesResponse = await fetch(`http://127.0.0.1:8000/api/chapter/${chapter.id}/games`);
            const gamesData = await gamesResponse.json();

            if (gamesData.length > 0 && gamesData[0].game_name) {
                chapter.gameName = gamesData[0].game_name;
            } else {
                chapter.gameName = "No game yet";
            }
            const dateAdded = new Date(chapter.date_added);
            const formattedDate = `${dateAdded.toLocaleDateString()} ${dateAdded.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })}`;
            chapter.dateAddedFormatted = formattedDate;
        }

        setChapters(chaptersData);
        return chaptersData;
    }

    const handleDeleteOnClick = (id) => {
        setChapterToDelete(id);
        setIsChapterPopupOpen(true);
    };

    const handleClose = () => {
        setIsChapterPopupOpen(false);
        setChapterToDelete(null);
    };

    const handleConfirm = async () => {
        if (chapterToDelete) {
            try {
                const token = getToken();
                await axios.delete(`http://127.0.0.1:8000/api/chapters/${chapterToDelete}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchChapters(courseId);
            } catch (error) {
                console.error('Deletion error:', error);
            }
            handleClose();
        }
    };

    const handleDeleteCourseOnClick = () => {
        setIsCoursePopupOpen(true);
    };

    const handleAddChapterOnClick = () => {
        navigate(`/specialist/course/${courseId}/addChapter`)
    }

    const handleCourseClose = () => {
        setIsCoursePopupOpen(false);
    };

    const handleCourseConfirm = async () => {
        try {
            const token = getToken();
            await axios.delete(`http://127.0.0.1:8000/api/courses/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/specialist/');
        } catch (error) {
            console.error('Course deletion error:', error);
        }
        handleCourseClose();
    };

    const gradientStyle = {
        background: `linear-gradient(45deg,#F99ECF , #FF00C7)`,
    };

    const handleUpdateOnClick = (id) => {
        navigate(`/specialist/chapter/${id}`);
    };

    return (
        <RootContainer>
            <Popup open={isChapterPopupOpen} closeOnDocumentClick onClose={handleClose}>
                <div style={styles.popupContainer}>
                    <p style={styles.text}>Are you sure you want to delete the chapter?</p>
                    <div style={styles.buttonContainer}>
                        <PixelatedButton text="CANCEL" onClick={handleClose} />
                        <PixelatedButton text="CONFIRM" onClick={handleConfirm} />
                    </div>
                </div>
            </Popup>
            <Popup open={isCoursePopupOpen} closeOnDocumentClick onClose={handleCourseClose}>
                <div style={styles.popupContainer}>
                    <p style={styles.text}>Are you sure you want to delete the course?</p>
                    <div style={styles.buttonContainer}>
                        <PixelatedButton text="CANCEL" onClick={handleCourseClose} />
                        <PixelatedButton text="CONFIRM" onClick={handleCourseConfirm} />
                    </div>
                </div>
            </Popup>
            <SpecialistSideNavBar />
            <div style={{ marginLeft: '160px' }}>
                <div className="content">
                    <div className="mt-4 d-flex align-items-center justify-content-between">
                        {userData && (
                            <div>
                                <p className="text-white st_username">Hi, {userData.first_name + " " + userData.last_name}</p>
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
                </div>
                <div className="d-flex justify-content-center mt-4">
                    {course &&
                        <div style={gradientStyle} className="teacher-s-course-title-div text-white">
                            <p className="mb-0">{course.courseName}</p>
                        </div>
                    }
                </div>
                <div>
                    <div className="bg-white shadow pt-3 pb-3 text-center LA mt-4"><b>Last Added</b></div>
                    <div className="d-flex justify-content-center mt-4 ms-5">
                        <div className="d-flex flex-wrap text-white chapter-names ms-xxl-5" style={{ width: "80%" }}>
                            {chapters.slice(-6).map((chapter, index, arr) => (
                                <div className="col-6" key={chapter.id}>
                                    <p>Chapter {chapters.length - arr.length + index + 1}:<b> {chapter.chapterName}</b></p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="LA text-center mb-4">
                        <div className="row">
                            <div className="col-3">
                                <div className="bg-white mt-4 shadow pb-2 pt-2">
                                    Available Chapters
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="bg-white mt-4 shadow pb-2 pt-2">
                                    Game
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="bg-white mt-4 shadow pb-2 pt-2">
                                    Date
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="bg-white mt-4 shadow pb-2 pt-2">
                                    Management
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-white" style={{ fontSize: "19px" }}>
                        {chapters.map((chapter, index) => (
                            <div className="row mb-5" key={chapter.id}>
                                <div className="col-3">
                                    <p>Chapter {index + 1}:<b> {chapter.chapterName}</b></p>
                                </div>
                                <div className="col-3">
                                    <p className="ms-4"><b> {chapter.gameName}</b></p>
                                </div>
                                <div className="col-3">
                                    <p className="ms-4"><b> {chapter.dateAddedFormatted}</b></p>
                                </div>
                                <div className="col-3">
                                    <div className="ms-4"><PixelatedButton text="Delete" onClick={() => handleDeleteOnClick(chapter.id)} /><PixelatedButton text="Update" onClick={() => handleUpdateOnClick(chapter.id)} /></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mb-4 ms-5" >
                <PixelatedButton text="Add chapter" onClick={handleAddChapterOnClick} /> <div className="ms-4"></div>
                <PixelatedButton text="Delete Course" onClick={handleDeleteCourseOnClick} />
            </div>
        </RootContainer>
    );
}

const styles = {
    popupContainer: {
        backgroundColor: '#142334',
        borderRadius: '10px',
        padding: '20px',
        height: '220px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#ffffff',
        marginBottom: '20px',
        textAlign: 'center',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
    },
};

export default EditCoursePage;
