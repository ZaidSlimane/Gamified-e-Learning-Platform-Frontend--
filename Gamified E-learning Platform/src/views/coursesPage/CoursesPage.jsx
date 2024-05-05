import RootContainer from "../../utils/rootContainerModule.jsx";
import React, {useState} from "react";
import TextInput from "../../components/textInput/textInput.jsx";
import "./CoursesPage.css";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import Navbar from "../../components/navbar/navbar.jsx";
import CourseToJoinCard from "../../components/courseToJoinCard/courseToJoinCrad.jsx";
import SearchBar from "../../components/searchBar/SearchBar.jsx";

function CoursesPage() {
    return (
        <>
            <RootContainer>
                <div className="row g-0 navigation-header justify-content-between align-items-center mt-5"
                     style={{marginBottom: '100px'}}>
                    <div className="col-auto">
                        <img src="../../../public/logo.svg"/>
                    </div>
                    <div className="col-auto">
                        <Navbar></Navbar>
                    </div>
                    <div className="col-auto d-flex align-items-center" style={{marginLeft:"-60px"}}>
                        <PixelatdButton className="btn btn-primary me-2" type="submit" text="Register"></PixelatdButton>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <PixelatdButton className="btn btn-primary" type="submit"text="Sign in"  ></PixelatdButton>
                    </div>
                </div>
                <div className={"mb-5  d-flex justify-content-center"} style={{marginRight:"20px"}}>
                <SearchBar></SearchBar>
                </div>
                <div className={"row row-cols-3"} style={{marginRight:"20px"}} >
                    <div className="col d-flex justify-content-center">
                        <CourseToJoinCard></CourseToJoinCard>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <CourseToJoinCard></CourseToJoinCard>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <CourseToJoinCard></CourseToJoinCard>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <CourseToJoinCard></CourseToJoinCard>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <CourseToJoinCard></CourseToJoinCard>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <CourseToJoinCard></CourseToJoinCard>
                    </div>
                </div>
                <div className={"mt-3 mb-5 d-flex justify-content-center"}>
                    <PixelatdButton text={"VIEW MORE"} />
                </div>


            </RootContainer>
        </>);
}

export default CoursesPage;