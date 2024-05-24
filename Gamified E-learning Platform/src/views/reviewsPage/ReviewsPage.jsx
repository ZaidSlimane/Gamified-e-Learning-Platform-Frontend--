import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import RootContainer from "../../utils/rootContainerModule.jsx";
import Navbar from "../../components/navbar/navbar.jsx";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import TestimonialCard from "../../components/testimonuials/testimonials.jsx";
import './ReviewPage.css'

function ReviewsPage() {
    const navigate = useNavigate();
    const { enrollmentId } = useParams();
    const [userData, setUserData] = useState('');
    const [loggedIn, setLoggedIn] = useState('');
    const [reviews, setReviews] = useState([]);
    const [courseName, setCourseName] = useState('');

    useEffect(() => {
        checkLoggedIn();
        fetchReviews();
        fetchCourseName();
    }, []);

    const getToken = () => {
        return localStorage.getItem('token');
    };

    async function checkLoggedIn() {
        try {
            const token = getToken();
            const roleResponse = await axios.get('http://127.0.0.1:8000/api/home/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = roleResponse.data;
            if (data.user.groups.length > 0) {
                setUserData(data);
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    }

    async function fetchReviews() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/reviews/');
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    }

    async function fetchCourseName() {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/enrollment/${enrollmentId}/course`);
            setCourseName(response.data.courseName);
        } catch (error) {
            console.error('Error fetching course name:', error);
        }
    }

    const handleSignInClick = () => {
        navigate("/login");
    };

    const handleSignUpClick = () => {
        navigate("/SignUp");
    };

    return (
        <RootContainer>
            <div className="row g-0 navigation-header justify-content-between align-items-center mt-5" style={{ marginBottom: '100px', position: 'relative', zIndex: 1 }}>
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

            <div className="row justify-content-center gap-5">
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div className="col-12 col-md-4 mb-4 lllll" key={index}>
                            <TestimonialCard
                                Testimonial={review.review_content}
                                stars={review.stars}
                                courseName={courseName}
                            />

                        </div>
                    ))
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
        </RootContainer>
    );
}

export default ReviewsPage;
