import RootContainer from "../../utils/rootContainerModule.jsx";
import React, {useState} from "react";
import Navbar from "../../components/navbar/navbar.jsx";
import CourseSection from "../../components/courseSection/courseSection.jsx";
import CourseCard from "../../components/courseCards/courseCard.jsx";
import CourseToJoinCrad from "../../components/courseToJoinCard/courseToJoinCrad.jsx";
import CourseInfoCrad from "../../components/courseInfoCard/courseInfoCard.jsx";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import SectionComponent from "../../components/sectionComponent/sectionComponent.jsx";
import Circle from "../../components/Circle.jsx";
function LandingPage() {


    return (
        <>

            <RootContainer>
                <div className="row g-0 navigation-header justify-content-between align-items-center mt-3">
                    <div className="col-auto">
                        <h1>LOGO</h1>
                    </div>
                    <div className="col-auto">
                        <Navbar></Navbar>
                    </div>
                    <div className="col-auto d-flex align-items-center">
                        <button className="btn btn-primary me-2" type="submit">Register</button>
                        <button className="btn btn-primary" type="submit">Sign in</button>
                    </div>
                </div>

                <h1 className="text-center mt-3 mb-3">
                    LET’S STARtt
                    LEARNING
                    COMPUTER SCIENCE
                </h1>
                <div className="col-auto d-flex justify-content-center">
                    <PixelatdButton></PixelatdButton>
                </div>
             <CourseSection></CourseSection>

                <SectionComponent containerName="avatar-container"
                                  title="Avatars">
                    <div className="col-auto d-flex justify-content-center">

                        <Circle radius={80}></Circle>
                        <Circle radius={100}></Circle>
                        <Circle radius={80}></Circle>
                    </div>

                </SectionComponent>


            </RootContainer>


        </>
)
}

export default LandingPage;
