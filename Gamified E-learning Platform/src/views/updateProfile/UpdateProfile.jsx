import React, { useEffect, useState } from 'react';
import RootContainer from "../../utils/rootContainerModule.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextInput from "../../components/textInput/textInput.jsx";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import TeacherSideNavBar from "../../components/teacherSideNavBar/TeacherSideNavBar.jsx";
import SideNavBar from "../../components/sideNavBar/SideNavBar.jsx";
import './UpdateProfile.css';

function UpdateProfile() {
    const [userData, setUserData] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [grade, setGrade] = useState("");
    const [showPopup, setShowPopup] = useState(false); // State for pop-up visibility
    const navigate = useNavigate();

    const getToken = () => {
        return localStorage.getItem('token');
    };

    async function checkLoggedIn() {
        try {
            const token = getToken();
            const roleResponse = await axios.get('http://127.0.0.1:8000/api/home', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = roleResponse.data;
            if (data.user.groups.length > 0) {
                setUserData(data);
                setLoggedIn(true);
                fetchUserData(data.user.id);

            } else {
                setLoggedIn(false);
                navigate('/login');
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response && error.response.status === 401) {
                setLoggedIn(false);
                navigate('/login');
            }
            return false;
        }
    }

    async function fetchUserData(uid) {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/users/${uid}`); // Replace 5 with dynamic userId if needed
            const data = response.data;
            setUsername(data.username);
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setPhoneNumber(data.phone_number || "");
            setGrade(data.grade || "");
        } catch (error) {
            console.error('Fetch user data error:', error);
        }
    }

    useEffect(() => {
        checkLoggedIn();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const token = getToken();
            const updatedData = {
                username: username,
                first_name: firstName,
                last_name: lastName,
                password: password
            };
            console.log(updatedData)
            await axios.put(`http://127.0.0.1:8000/api/users/${userData.user.id}`, updatedData, { // Replace 5 with dynamic userId if needed
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setShowPopup(true); // Show pop-up on successful update
        } catch (error) {
            console.error('Update profile error:', error);
            alert("Failed to update profile.");
        }
    };

    const role = localStorage.getItem('ROLE');

    return (
        <RootContainer>
            <div className="content" style={{ marginLeft: '200px' }}>
                <div className="mt-4 d-flex align-items-center justify-content-between">
                    {userData && (
                        <div>
                            <p className="text-white st_username">Hi, {userData.user.first_name + " " + userData.user.last_name}</p>
                        </div>
                    )}
                    <div className="d-flex align-items-center">
                        <SearchBar width={"100%"} />
                        <img
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            className="st-profile" alt="profile"
                        />
                    </div>
                </div>
                {role && role === 'TEACHER' ? <TeacherSideNavBar /> : <SideNavBar />}

                <div className="text-center mt-5">
                    <div className="input-row">
                        <div className="input-wrapper">
                            <p className="input-header">First name</p>
                            <TextInput
                                type={"text"}
                                placeholder="your first name"
                                defaultValue={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="input-wrapper">
                            <p className="input-header">Last name</p>
                            <TextInput
                                type={"text"}
                                placeholder="your last name"
                                defaultValue={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-wrapper">
                            <p className="input-header">Username</p>
                            <TextInput
                                type={"text"}
                                placeholder="pick a username"
                                defaultValue={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="input-wrapper">
                            <p className="input-header">Create password</p>
                            <TextInput
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-wrapper" style={{ marginTop: '10px', marginLeft: "400px" }}>
                        <p className="extra-textl">Password must contain a minimum of 8 characters</p>
                        <p className="extra-textl">Password must contain at least one symbol e.g. @, !</p>
                    </div>
                </div>
                <div className="d-flex justify-content-center" style={{ marginRight: "200px" }}>
                    <PixelatdButton text={"Update profile"} onClick={handleUpdateProfile}></PixelatdButton>
                </div>

                {showPopup && (
                    <div className="popup1">
                        <div className="popup1-content">
                            <p>Profile updated successfully!</p>
                            <button onClick={() => setShowPopup(false)} className="close-popup1-button">Close</button>
                        </div>
                    </div>
                )}
            </div>
        </RootContainer>
    );
}

export default UpdateProfile;
