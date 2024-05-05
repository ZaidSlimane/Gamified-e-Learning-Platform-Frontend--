import RootContainer from "../../utils/rootContainerModule.jsx";
import React, {useState} from "react";
import TextInput from "../../components/textInput/textInput.jsx";
import "./LeaveQuestionPage.css";
import SearchBar from "../../components/searchBar/SearchBar.jsx";

import Navbar from "../../components/navbar/navbar.jsx";


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
                        <SearchBar/>
                    </div>
                </div>
                <div className="shadow  text-center mt-5">
                    <p className="chapter-course-title ">Linux Fundamentals</p>
                </div>


                <div className="shadow shadow2 white-border text-white course-content pt-4 mt-5 ps-4">
                    <div className="no-shadow">
                        <div className="shadow grey-bg ">
                            <p className="text-center">Chapter 1: System management </p>

                        </div>
                    </div>

                </div>

            </RootContainer>
        </>)
}

export default LeaveQuestionPage;