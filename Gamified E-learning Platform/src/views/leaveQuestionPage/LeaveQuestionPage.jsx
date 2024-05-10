import RootContainer from "../../utils/rootContainerModule.jsx";
import React, {useState} from "react";
import TextInput from "../../components/textInput/textInput.jsx";
import "./LeaveQuestionPage.css";
import SearchBar from "../../components/searchBar/SearchBar.jsx";

import Navbar from "../../components/navbar/navbar.jsx";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";


function LeaveQuestionPage() {
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
                    <p className="chapter-course-title-q p-q">Linux Fundamentals</p>
                </div>


                <div className="shadow shadow2 white-border text-white course-content pt-4 mt-5 ps-4">
                    <div className="no-shadow   d-flex justify-content-center">
                        <div className=" grey-bg drop-shadow shadow mb-5 p-2">
                            <p className="text-center chapter-title p-q">Chapter 1: System management </p>
                        </div>
                    </div>
                    <div className="no-shadow d-flex justify-content-center mb-xxl-5 ">
                        <textarea type="text" className="grey-bg question p-3"/>
                    </div>

                </div>
                <div className="mt-4 d-flex justify-content-center">
                <PixelatdButton text="Submit"></PixelatdButton>
                </div>
            </RootContainer>
        </>)
}

export default LeaveQuestionPage;