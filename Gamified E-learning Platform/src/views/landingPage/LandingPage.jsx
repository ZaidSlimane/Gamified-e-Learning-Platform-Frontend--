import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RootContainer from "../../utils/rootContainerModule.jsx";
import Navbar from "../../components/navbar/navbar.jsx";
import CourseSection from "../../components/courseSection/courseSection.jsx";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import SectionComponent from "../../components/sectionComponent/sectionComponent.jsx";
import Circle from "../../components/Circle.jsx";
import Footer from "../../components/Footer.jsx";
import TestimonialCard from "../../components/testimonuials/testimonials.jsx";
import GradientCircle from "../../components/GradientCircle.jsx";
import SwirlEffect from "../../components/SiwrlEffect.jsx";
import  '../../fonts/fonts.css';
import VideoComponent from "../../components/VideoComponent.jsx";
import ButtonsSet from "../../components/ButtonsSet.jsx";

function LandingPage() {
    const navigate = useNavigate();
    const [userData, setuserData] = useState('');
    const [loggedIn, setloggedIn] = useState('');

    const videoSrc = '/3D_GAME.mp4';


    useEffect(() => {
        checkloggedIn();
    }, []);

    const getToken = () => {
        return localStorage.getItem('token');
    };

    async function checkloggedIn() {
        try {
            const token = getToken();
            const roleResponse = await axios.get('http://127.0.0.1:8000/api/home/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = roleResponse.data;
            if (data.user.groups.length > 0) {
                setuserData(data);
                setloggedIn(true);
            } else {
                setloggedIn(false);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    }

    const handleSignInClick = () => {
        navigate("/login");
    };

    const handleSignUpClick = () => {
        navigate("/SignUp");
    };

    return (
        <>
            <SwirlEffect />
            <RootContainer>
                <div className="row g-0 navigation-header justify-content-between align-items-center mt-5"
                     style={{ marginBottom: '100px', position: 'relative', zIndex: 1 }}>
                    <div className="col-auto">
                        <img src="../../../public/logo.png" className="logo" height='100px' />
                    </div>
                    <div className="col-auto">
                        <Navbar />
                    </div>
                    <div className="col-auto d-flex align-items-center" style={{ marginLeft: "-60px" }}>
                        {loggedIn ? (
                            <>
                                <p className="username">{userData.user.username}</p>
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="User Avatar" className="rounded-circle profile-pic" />
                            </>
                        ) : (
                            <>
                                <PixelatdButton className="btn btn-primary me-2" type="submit" text="Register" onClick={handleSignUpClick} />
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                <PixelatdButton className="btn btn-primary" type="submit" text="Sign in" onClick={handleSignInClick} />
                            </>
                        )}
                    </div>
                </div>

                <h1 className="text-center mt-3 mb-3" style={{ color: "white", fontSize: '60px', fontWeight: "bold", fontFamily: "pixel" }}>
                    LET’S START LEARNING<br />
                    <div style={{ color: "white", fontSize: '40px', fontWeight: "bold", fontFamily: "pixel" }}>
                        COMPUTER SCIENCE
                    </div>

                </h1>
                <div className="col-auto d-flex justify-content-center">
                    <PixelatdButton text={"START"} onClick={handleSignUpClick} />
                </div>
                <br />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <CourseSection />
                </div>

                <SectionComponent containerName="avatar-container" title="Avatars">
                    <div className="text-center mb-4" style={{ color: 'white' }}>
                        <p style={{ fontSize: '24px' }}>
                            Showcase your progress with our gamified badges! Earn badges for mastering skills, engaging
                            in learning activities, achieving course milestones, and demonstrating expertise. Start
                            earning and level up your learning journey today!
                        </p>
                    </div>
                    <div className="col-auto d-flex justify-content-center">
                        <Circle radius={80} shadowY={4} imageUrl="/avatar1.png" />
                        <Circle radius={100} shadowY={-4} imageUrl="/avatar2.png" />
                        <Circle radius={80} shadowY={4} imageUrl="/avatar2.png" />

                    </div>
                </SectionComponent>

                <SectionComponent containerName="Interactive games" title="Interactive Games">
                    <div className="text-center mb-4" style={{ color: 'white' }}>
                        <p style={{ fontSize: '24px' }}>
                            Play games designed to enhance your knowledge and skills in a fun, interactive way.
                        </p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">


                        <div>
                            <VideoComponent videoSrc={videoSrc} alt="Description of the video" />
                        </div>
                        <div style={{ width: '200px' }}></div>
                        <ButtonsSet></ButtonsSet>
                    </div>
                </SectionComponent>

                <SectionComponent containerName="mascot" title="Meet your ByteSensei">
                    <div className="text-center mb-4" style={{ color: 'white' }}>
                        <p style={{ fontSize: '24px' }}>
                            Meet ByteSensei, your guide to a dynamic learning experience! With ByteSensei by your side, explore a world where education meets adventure through interactive games.
                        </p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <GradientCircle imageUrl={"/mascot.svg"} />
                    </div>
                </SectionComponent>

                <SectionComponent containerName="Testimonials" title="Testimonials">
                    <div className="text-center mb-4" style={{ color: 'white' }}>
                        <p style={{ fontSize: '24px' }}>
                            Meet ByteSensei, your guide to a dynamic learning experience! With ByteSensei by your side, explore a world where education meets adventure through interactive games.
                        </p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <TestimonialCard />
                        <TestimonialCard />
                    </div>
                </SectionComponent>

                <SectionComponent containerName="Skilled Teachers" title="Skilled Teachers">
                    <GradientCircle imageUrl="/pngfind 1.svg" />
                </SectionComponent>

                <img
                    src="/Ellipse.svg"
                    alt="Second Image"
                    style={{
                        position: 'absolute',
                        right: '0',
                        top: '0px',
                        zIndex: '-1',
                        width: '450px',
                        height: 'auto',
                        marginRight: '100px'
                    }}
                />
            </RootContainer>
            <Footer />
        </>
    );
}

export default LandingPage;
