import RootContainer from "../../utils/rootContainerModule.jsx";
import React, {useState} from "react";
import TextInput from "../../components/textInput/textInput.jsx";
import "./LoginPage.css";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function LoginPage() {
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                username: fullName,
                password: password
            });

            const token = response.data.access;
            localStorage.setItem('token', token);

            // Make a GET request to fetch user role
            const roleResponse = await axios.get('http://127.0.0.1:8000/api/home/', {
                headers: {
                    Authorization: `Bearer ${token}` // Send token as bearer code
                }
            });


            const data = roleResponse.data;
            if (data.user.groups.includes(2)) {
                navigate('/courses'); // Redirect to courses page if user is a student
            } else {
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(true);
        }
    };

    const getToken = () => {
        return localStorage.getItem('token');
    };
    const [userData, setuserData] = useState('');
    const loggedIn = async () => {
        try {
            const token = getToken()
            const roleResponse = await axios.get('http://127.0.0.1:8000/api/home/', {
                headers: {
                    Authorization: `Bearer ${token}` // Send token as bearer code
                }

            });
            const data = roleResponse.data;
            if (data.user.groups.length > 0) {
                setuserData(data);
                return true
            } else {
                return false
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
                <div className="image-containerLogin text-center">
                    <img src="../../../public/login_image.svg" alt="Image" className="LoginImage"/>
                </div>
                <div className="text-center">
                    <div className="input-wrapper">
                        <p className="input-header">Full name</p>
                        <TextInput
                            placeholder="your name"
                            value={fullName}
                            onChange={handleFullNameChange}
                        />
                    </div>
                    <br/>
                    <br/>
                    <div className="input-wrapper">
                        <p className="input-header">Password</p>
                        <TextInput
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <br/>
                    <br/>
                    <PixelatdButton text={"LOGIN"} onClick={handleLogin}></PixelatdButton>
                    <br/>

                    <p className="extra-textLogin text-white">Do not have an account? &nbsp;<a href="/signup"
                                                                                               className={"text-link"}>Sign
                        up</a></p>
                </div>
            </RootContainer>
        </>
    );
}

export default LoginPage;
