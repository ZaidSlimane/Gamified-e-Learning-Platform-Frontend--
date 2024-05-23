import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RootContainer from "../../utils/rootContainerModule.jsx";
import './AddChapter.css';
import TextInput from "../../components/textInput/textInput.jsx";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";

function AddChapter() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [chapter, setChapter] = useState({
        chapterName: "",
        chapterContent: "",
        course: courseId
    });

    const handleChapterChange = (e, field) => {
        setChapter({
            ...chapter,
            [field]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/chapters/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chapterName: chapter.chapterName,
                    content: chapter.chapterContent,
                    course: parseInt(courseId)
                })
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            const addedChapterId = data.id;

            navigate(`/specialist/chapter/${addedChapterId}`);
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    };

    return (
        <RootContainer>
            <br />
            <br />
            <form onSubmit={handleSubmit} className="mt-5 d-flex flex-column align-items-center pb-4">
                <div>
                    <p style={{ color: "#01F401", marginLeft: "8px" }}><b>Chapter Name:</b></p>
                    <TextInput
                        className="grey-bg question ps-3 pe-3 pt-2"
                        value={chapter.chapterName}
                        onChange={(e) => handleChapterChange(e, 'chapterName')}
                    />
                </div>
                <div className="mt-5">
                    <p style={{ color: "#01F401", marginLeft: "8px" }}><b>Course Content:</b></p>
                    <textarea
                        className="grey-bg chapter-content question ps-3 pe-3 pt-2"
                        value={chapter.chapterContent}
                        onChange={(e) => handleChapterChange(e, 'chapterContent')}
                    />
                </div>
                <div className="mt-5">
                    <PixelatdButton type="submit" className="btn btn-success" text="Save Chapter"></PixelatdButton>
                </div>
            </form>
        </RootContainer>
    );
}

export default AddChapter;
