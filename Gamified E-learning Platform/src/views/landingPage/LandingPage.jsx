import RootContainer from "../../utils/rootContainerModule.jsx";
import React, {useState} from "react";
import Navbar from "../../components/navbar/navbar.jsx";
import CourseSection from "../../components/courseSection/courseSection.jsx";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import SectionComponent from "../../components/sectionComponent/sectionComponent.jsx";
import Circle from "../../components/Circle.jsx";
import "@fontsource/inter"
import "./LandingPage.css"
import '../../../src/fonts/fonts.css'


function LandingPage() {


    return (
        <>

            <RootContainer>
                <div className="row g-0 navigation-header justify-content-between align-items-center mt-3"
                     style={{marginBottom: '100px'}}>
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

                <h1 className="text-center mt-3 mb-3" style={{color: "white", fontSize: '60px' , fontWeight: "bold", fontFamily:"inter"}}>
                    LET’S START<br/>
                    LEARNING<br/>
                    COMPUTER SCIENCE
                </h1>
                <div className="col-auto d-flex justify-content-center">
                    <PixelatdButton text={"START"}></PixelatdButton>
                </div>
                <br/>
                <h1 className="text-center mt-3 mb-3" style={{color: "white", fontSize: '50px', fontWeight:'bold', fontFamily:"inter"}}>
                    Choose Course
                </h1>
                <div className="container">
                    <div className="blur-background"></div>
                    <CourseSection></CourseSection>
                </div>


                <SectionComponent containerName="avatar-container"
                                  title="Avatars">
                    <div className="col-auto d-flex justify-content-center">

                        <Circle radius={80}></Circle>
                        <Circle radius={100}></Circle>
                        <Circle radius={80}></Circle>
                    </div>

                </SectionComponent>

                {/* Add the image with styles */}
                <img
                    src="/Vector.svg"
                    alt="Background Image"
                    style={{
                        position: 'absolute',
                        left: '0',
                        top: '200px',
                        zIndex: '-1',
                        width: '400px', // Adjust the width as needed
                        height: 'auto' // Maintain aspect ratio
                    }}
                />
                <img
                    src="/Ellipse.svg"
                    alt="Second Image"
                    style={{
                        position: 'absolute',
                        right: '0',
                        top: '0px', // Adjust the top position as needed
                        zIndex: '-1',
                        width: '450px', // Adjust the width as needed
                        height: 'auto', // Maintain aspect ratio
                        marginRight: '100px'
                    }}
                />

            </RootContainer>


        </>
    )
}

export default LandingPage;
