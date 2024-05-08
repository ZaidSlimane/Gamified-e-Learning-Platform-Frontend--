import RootContainer from "../../utils/rootContainerModule.jsx";
import React, {useEffect, useState} from "react";
import Navbar from "../../components/navbar/navbar.jsx";
import CourseSection from "../../components/courseSection/courseSection.jsx";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import SectionComponent from "../../components/sectionComponent/sectionComponent.jsx";
import Circle from "../../components/Circle.jsx";
import "@fontsource/inter"
import "./LandingPage.css"
import '../../../src/fonts/fonts.css'
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import useNavigate

function LandingPage() {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSignInClick = () => {
        navigate("/login"); // Navigate to /login when Sign in is clicked
    }
    const handleSignUpClick = () => {
        navigate("/SignUp"); // Navigate to /login when Sign in is clicked
    }

    useEffect(() => {
        checkloggedIn();

    }, []);

    const getToken = () => {
        return localStorage.getItem('token');
    };
    const [userData, setuserData] = useState('');
    const [loggedIn, setloggedIn] = useState('');

    async function checkloggedIn() {
        try {
            const token = getToken()
            const roleResponse = await axios.get('http://127.0.0.1:8000/api/home/', {
                headers: {
                    Authorization: `Bearer ${token}` // Send token as bearer code
                }

            });
            console.log(token)
            const data = roleResponse.data;
            if (data.user.groups.length > 0) {
                setuserData(data);
                setloggedIn(true);
            } else {
                setloggedIn(false);
            }
        } catch
            (error) {
            console.error('Login error:', error);
            setError(true);
            return false
        }
    }

    return (
        <>
            <RootContainer>
                <div className="row g-0 navigation-header justify-content-between align-items-center mt-5"
                     style={{marginBottom: '100px'}}>
                    <div className="col-auto">
                        <img src="../../../public/logo.svg" className="loogo"/>
                    </div>
                    <div className="col-auto">
                        <Navbar></Navbar>
                    </div>
                    <div className="col-auto d-flex align-items-center" style={{marginLeft:"-60px"}}>
                        {loggedIn ? (
                            <>
                                <p className="username">{userData.user.username}</p>
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="User Avatar" className="rounded-circle profile-pic" />
                            </>
                        ) : (
                            <>
                                <PixelatdButton className="btn btn-primary me-2" type="submit" text="Register" onClick={handleSignUpClick}></PixelatdButton>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                <PixelatdButton className="btn btn-primary" type="submit"text="Sign in" onClick={handleSignInClick} ></PixelatdButton>
                            </>
                        )}
                    </div>
                </div>

                <h1 className="text-center mt-3 mb-3" style={{color: "white", fontSize: '60px' , fontWeight: "bold", fontFamily:"inter"}}>
                    LET’S START<br/>
                    LEARNING<br/>
                    COMPUTER SCIENCE
                </h1>
                <div className="col-auto d-flex justify-content-center">
                    <PixelatdButton text={"START"} onClick={handleSignUpClick}></PixelatdButton>
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
