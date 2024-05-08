import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./views/LoginPage/LoginPage.jsx";
import CoursesPage from "./views/coursesPage/CoursesPage.jsx";
import LandingPage from "./views/landingPage/LandingPage.jsx";
import SignUp from "./views/signUp/SignUp.jsx";
import EnrollPage from "./views/enrollPage/EnrollPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
                <Route path="/enroll/:courseId" element={<EnrollPage />} />


            </Routes>
        </Router>
    );
}

export default App;
