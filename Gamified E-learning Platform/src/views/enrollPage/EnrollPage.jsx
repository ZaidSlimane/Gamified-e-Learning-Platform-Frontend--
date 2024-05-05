import RootContainer from "../../utils/rootContainerModule.jsx";
import React, {useState} from "react";
import TextInput from "../../components/textInput/textInput.jsx";
import "./EnrollPage.css";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import CourseInfoCard from "../../components/courseInfoCard/courseInfoCard.jsx";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";


function EnrollPage() {
    return (
        <>
            <RootContainer>
                <div className="row g-0 navigation-header justify-content-between align-items-center mt-5 mb-5"
                >
                    <div className="col-auto">
                        <img src="../../../public/logo.svg"/>

                    </div>
                    <div className={"col  d-flex justify-content-center"} style={{marginRight: "20px"}}>
                        <SearchBar></SearchBar>
                    </div>
                </div>
                <div className={"d-flex justify-content-center"}>
                    <CourseInfoCard></CourseInfoCard>
                </div>
                <div className={"main-component mt-xl-5"}>
                    <div className="row pb-xxl-5">
                        <div className="text-white course-decription" style={{width: "55%"}}>
                            <h4>Course Summary</h4>
                            <p className="mt-3 description-text">
                                This module is broken down into sections with accompanying hands-on exercises to
                                practice each of the tactics and techniques we cover. The module ends with a practical
                                hands-on skills assessment to gauge your understanding of the various topic areas.
                                As you work through the module, you will see example commands and command output for the
                                various topics introduced. It is worth reproducing as many of these examples as possible
                                to reinforce further the concepts introduced in each section. You can do this in the
                                Pwnbox provided in the interactive sections or your own virtual machine.
                                You can start and stop the module at any time and pick up where you left off. There is
                                no time limit or "grading," but you must complete all of the exercises and the skills
                                assessment to receive the maximum number of cubes and have this module marked as
                                complete in any paths you have chosen.
                            </p>
                            <h4>Recompenses : </h4>
                            <p className="description-text">
                                60 LEGOS
                            </p>
                        </div>
                        <div className="text-white ps-4 ms-4" style={{width: "40%"}}>
                            <h4>Course Content</h4>
                            <div className="shadow white-border  course-content pt-4 ps-4">
                                <div className="no-shadow">
                                    <p className="ps-2">· System Information <br/>
                                        · Navigation<br/>
                                        · Working with Files and Directories<br/>
                                        · Editing Files<br/>
                                        · Find Files and Directories<br/>
                                        · File Descriptors and Re directions<br/>
                                        · Filter Contents<br/>
                                        · Regular Expressions<br/>
                                        · Permission Management<br/>
                                        · User Management<br/>
                                        · Package Management<br/>
                                        · Service and Process Management<br/>
                                        · Task Scheduling<br/>
                                        · Network Services<br/>
                                        · Working with Web Services<br/>
                                        · Backup and Restore<br/>
                                        · File System Management<br/>
                                        · Containerization<br/>
                                        · Network Configuration</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-4 mb-5">
                    <PixelatdButton text="ENROLL"></PixelatdButton>
                </div>

            </RootContainer>
        </>);
}

export default EnrollPage;