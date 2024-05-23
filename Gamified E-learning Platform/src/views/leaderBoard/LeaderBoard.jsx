import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaCrown, FaUserCircle } from "react-icons/fa";
import SideNavBar from "../../components/sideNavBar/SideNavBar.jsx";
import TeacherSideNavBar from "../../components/teacherSideNavBar/TeacherSideNavBar.jsx";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import Navbar from "../../components/navbar/navbar.jsx";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import axios from "axios";
import RootContainer from "../../utils/rootContainerModule.jsx";  // Add more icons as needed
import './LeaderBoard.css'
import {useNavigate} from "react-router-dom";
import top1Image from '../../../public/top1.png';
import top2Image from '../../../public/top2.png';
import top3Image from '../../../public/top3.png';
import rest from '../../../public/rest.png';



const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const LeaderboardContainer = styled.div`
  width: 100%;
  max-width: 800px;
  border-radius: 10px;
  box-shadow: 0 0 10px #01F401;
  background-color: white;
  filter: drop-shadow(5px 4px 0px #01F401);
  overflow: hidden;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 8px;
  padding-bottom: 8px;

`;

const LeaderboardItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;

  &:last-child {
    border-bottom: none;
  }
`;

const Rank = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: 50px;
`;

const Avatar = styled.div`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  font-size: 24px;
  filter: drop-shadow(0px 4px 0px #01F401);

`;

const Name = styled.div`
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  
`;

const Points = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;


function LeaderBoard() {
    const [students, setStudents] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState('');
    const [userData, setUserData] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate("/login"); // Navigate to /login when Sign in is clicked
    }
    const handleSignUpClick = () => {
        navigate("/SignUp"); // Navigate to /login when Sign in is clicked
    }

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/students");
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, []);

    useEffect(() => {
        if (students.length > 0) {
            const fetchStatistics = async () => {
                const stats = {};
                for (const student of students) {
                    const studentId = student.user.id;
                    try {
                        const response = await fetch(`http://127.0.0.1:8000/api/student/${studentId}/statistics/`);
                        const data = await response.json();
                        stats[studentId] = data;
                    } catch (error) {
                        console.error(`Error fetching statistics for student ${studentId}:`, error);
                    }
                }
                setStatistics(stats);
                setLoading(false);
            };

            fetchStatistics();
        }
    }, [students]);

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const token = localStorage.getItem('token');
                const roleResponse = await axios.get('http://127.0.0.1:8000/api/home/', {
                    headers: {
                        Authorization: `Bearer ${token}` // Send token as bearer token
                    }
                });
                const data = roleResponse.data;
                if (data.user.groups.length > 0) {
                    setUserData(data);
                    setLoggedIn(true);
                    setRole(localStorage.getItem('ROLE'));
                } else {
                    setLoggedIn(false);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setLoggedIn(false);
                }
                console.error('Login error:', error);
                setLoading(false);
            }
        };

        checkLoggedIn();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const leaderboard = students.map(student => {
        const studentId = student.user.id;
        const studentStats = statistics[studentId] || [];
        const totalPoints = studentStats.reduce((sum, stat) => sum + stat.points, 0);

        return {
            ...student,
            totalPoints,
        };
    }).sort((a, b) => b.totalPoints - a.totalPoints);

    return (
        <RootContainer>
            {loggedIn ? (
                <div className="mb-xxl-5">
                    {role === 'STUDENT' ? (<SideNavBar />) : (<TeacherSideNavBar />)}
                    <div className="content" style={{ marginLeft: '200px' }}>
                        <div className="mt-4 d-flex align-items-center justify-content-between">
                            {userData && (
                                <div>
                                    <p className="text-white st_username">Hi, {userData.user.first_name + " " + userData.user.last_name}</p>
                                </div>)}
                            <div className="d-flex align-items-center">
                                <SearchBar width={"100%"}/>
                                <img
                                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                    className="st-profile"/>
                            </div>

                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div
                        className="row g-0 navigation-header justify-content-between align-items-center mt-5 mb-4"
                        >
                        <div className="col-auto">
                            <img src="../../../public/logo.png" style={{ width: "240px" }} />
                        </div>
                        <div className="col-auto">
                            <Navbar></Navbar>
                        </div>
                        <div className="col-auto d-flex align-items-center" style={{ marginLeft: "-60px" }}>
                            <PixelatdButton className="btn btn-primary me-2" type="submit" text="Register" onClick={handleSignUpClick}></PixelatdButton>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                            <PixelatdButton className="btn btn-primary" type="submit"text="Sign in" onClick={handleSignInClick} ></PixelatdButton>
                        </div>
                    </div>

                </>
            )}

            <div className={`d-flex flex-column align-items-center mb-5 ${loggedIn ? 'logged-innn' : ''}`}>
            <h1 className="ahg mb-5">Leaderboard</h1>
            <LeaderboardContainer>
                {leaderboard.map((student, index) => (
                    <div>
                    <LeaderboardItem key={student.user.id} rank={index + 1}>
                        <Rank className="Aaa">{index + 1}</Rank>
                        <Avatar>
                            {index === 0 ? <img src={top1Image} style={{width:"66px"}} /> :
                                index === 1 ? <img src={top2Image} style={{width:"66px"}} /> :
                                    index === 2 ? <img src={top3Image} style={{width:"66px"}} /> :
                                        <img src={rest} style={{width:"66px"}} /> }
                        </Avatar>
                        <Name className="Aaa">{student.user.first_name} {student.user.last_name}</Name>
                        <Points className="Aaa">{student.totalPoints}</Points>
                    </LeaderboardItem>
                        <div className="d-flex justify-content-center">
                        <hr style={{width: "80%"}} />
                        </div>
                    </div>
                ))}

            </LeaderboardContainer>
            </div>
        </RootContainer>
    );
}

export default LeaderBoard;
