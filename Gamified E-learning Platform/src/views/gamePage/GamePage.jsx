import React, { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useNavigate, useParams } from "react-router-dom";
import RootContainer from "../../utils/rootContainerModule.jsx";
import axios from "axios";

function GamePage() {
    const { unityProvider, sendMessage } = useUnityContext({
        loaderUrl: "../../public/quizGame/Build/quizGame.loader.js",
        dataUrl: "../../public/quizGame/Build/quizGame.data",
        frameworkUrl: "../../public/quizGame/Build/quizGame.framework.js",
        codeUrl: "../../public/quizGame/Build/quizGame.wasm",
    });

    const { chapterId, enrollmentId } = useParams();
    const [statistic, setStatistic] = useState('');
    const [courseId, setCourseId] = useState('');
    const navigate = useNavigate();

    async function fetchcourseId() {
        const response = await fetch(`http://127.0.0.1:8000/api/enrollments/${enrollmentId}`);
        const enrollmentData = await response.json();
        setCourseId(enrollmentData.course);
        return enrollmentData.course;
    }

    async function navigateToNextChapter() {
        const response = await axios.get(`http://127.0.0.1:8000/api/enrollments/${enrollmentId}`);
        const currentChapter = response.data.passed_chapter + 1;
        const chaptersResponse = await axios.get(`http://127.0.0.1:8000/api/courses/${courseId}/chapters`);
        const chapters = chaptersResponse.data;
        chapters.sort((a, b) => a.id - b.id);
        setTimeout(() => {
            navigate(`/courses/${courseId}/chapter/${chapters[currentChapter - 1].id}`);
        }, 3000);
    }

    async function fetchStatistic(courseId) {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(`http://127.0.0.1:8000/api/statistics/by-enrollment-and-date/${enrollmentId}/${today}`);
        const stat = await response.json();
        setStatistic(stat);
        console.log('statstatstatstatstatstatstatstatstatstatstatstatstat '+ enrollmentId+'sd0' + today)

        console.log(stat)
        return stat;
    }

    useEffect(() => {
        fetchStatistic();
        fetchcourseId();
        const timer = setTimeout(() => {
            const message = enrollmentId + "," + chapterId + "," + statistic[0].id;
            console.log("msgmsgmsgmsg" + message);
            sendMessage("GameController", "StartGameWithStudentId", message);
        }, 3200); // Delay sending the message by 5 seconds

        // Define the UpdateData function
        window.UpdateData = function (statisticsData, enrollmentData) {
            // Parse the data
            statisticsData = JSON.parse(statisticsData);
            enrollmentData = JSON.parse(enrollmentData);
            console.log(statisticsData);
            console.log(enrollmentData);

            // Make the PUT requests
            fetch(`http://127.0.0.1:8000/api/statistics/${statistic.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(statisticsData)
            })
                .then(() => {
                    fetch(`http://127.0.0.1:8000/api/enrollments/${enrollmentId}/`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(enrollmentData)
                    })
                        .then(() => {
                            console.log("sdflksadfjsahdfijhsaidugfuiasgidfgiasdfiasdgfgdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd" + courseId)
                            navigateToNextChapter(); // Call navigateToNextChapter after PUT requests are completed
                        })
                        .catch(error => console.error('Error updating enrollment:', error));
                })
                .catch(error => console.error('Error updating statistics:', error));
        };

        return () => clearTimeout(timer); // Clear the timer if the component unmounts
    }, [sendMessage, enrollmentId, chapterId]); // Only re-run if these values change

    return (
        <>
            <RootContainer>
                <div className={"main-component mt-xl-5  mb-5"}>
                    <div className="row pb-xxl-5 d-flex mt-5 justify-content-center">
                        <Unity unityProvider={unityProvider}
                               style={{ width: "1280px", height: "720px", borderRadius: "50px", padding: "0px" }}
                               className="shadow" />
                    </div>
                </div>
            </RootContainer>
        </>
    );
}

export default GamePage;
