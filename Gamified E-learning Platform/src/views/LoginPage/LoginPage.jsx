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

    async function createTodayStatistics() {
        const enrollmentEndpoint = 'http://127.0.0.1:8000/api/student/5/enrollments';
        const statisticsByEnrollmentAndDateEndpoint = 'http://127.0.0.1:8000/api/statistics/by-enrollment-and-date/';
        const statisticsEndpoint = 'http://127.0.0.1:8000/api/statistics/';

        // Fetch enrollments data
        try {
            const response = await fetch(enrollmentEndpoint);
            const enrollments = await response.json();

            // Get today's date
            const today = new Date().toISOString().split('T')[0];

            // Check if statistics already exist for each enrollment on today's date
            for (const enrollment of enrollments) {
                const statisticsResponse = await fetch(`${statisticsByEnrollmentAndDateEndpoint}${enrollment.id}/${today}`);
                const existingStatistics = await statisticsResponse.json();

                // If statistics already exist for this enrollment on today's date, skip creation
                if (existingStatistics.length > 0) {
                    console.log(`Statistics already exist for enrollment ${enrollment.id} on ${today}`);
                    continue;
                }

                // Otherwise, create statistics
                const statisticsData = {
                    enrollment: enrollment.id,
                    date: today,
                    points: 0,
                    passed_chapters: 0
                };

                // Send POST request to create statistics
                await fetch(statisticsEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(statisticsData)
                });

                console.log(`Statistics created for enrollment ${enrollment.id}`);
            }

            console.log('All statistics created successfully.');
        } catch (error) {
            console.error('Error creating statistics:', error);
        }
    }

// Call the function to create today's statistics


    const handleLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                username: fullName,
                password: password
            });

            const token = response.data.access;
            const  refresh = response.data.refresh;
            localStorage.setItem('token', token);
            localStorage.setItem('refresh', refresh)


            // Make a GET request to fetch user role
            const roleResponse = await axios.get('http://127.0.0.1:8000/api/home/', {
                headers: {
                    Authorization: `Bearer ${token}` // Send token as bearer code
                }
            });


            const data = roleResponse.data;
            console.log(data.groups)
            let groups = []
            if (data.groups){
                groups = data.groups
            }else{
                groups = data.user.groups

            }
            console.log(groups)
            if (groups.includes(2)) {
                await createTodayStatistics()
                localStorage.setItem('ROLE','STUDENT')
                navigate('/student');
            } else if (groups.includes(3)) {
                localStorage.setItem('ROLE','TEACHER')
                console.log(localStorage.getItem('ROLE'))
                navigate('/teacher/courses');

            } else if (groups.includes(4)) {
                console.log(data)
                localStorage.setItem('ROLE','SPECIALIST')
                console.log(localStorage.getItem('ROLE'))
                navigate('/specialist');

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
