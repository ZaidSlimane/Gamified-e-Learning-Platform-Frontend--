import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignUp from "./views/signUp/SignUp.jsx";
import LoginPage from "./views/LoginPage/LoginPage.jsx";
import CoursesPage from "./views/coursesPage/CoursesPage.jsx";
import LandingPage from "./views/landingPage/LandingPage.jsx";
import EnrollPage from "./views/enrollPage/EnrollPage.jsx";
import ChapterPage from "./views/chapterPgae/ChapterPage.jsx";
import {Unity, useUnityContext} from "react-unity-webgl";
import LeaveQuestionPage from "./views/leaveQuestionPage/LeaveQuestionPage.jsx";
import GamePage from "./views/gamePage/GamePage.jsx";
import StudentDashboard from "./views/studentDashboard/StudentDashboard.jsx";
import QuestionsPage from "./views/questionsPage/QuestionsPage.jsx";
import EnrolledPage from "./views/enrolledPage/EnrolledPage.jsx";
import TeacherCourses from "./views/teacherCourses/TeacherCourses.jsx";
import TeacherStudent from "./views/teacherStudent/TeacherStudent.jsx";
import TeacherStatsPage from "./views/teacherStatsPage/TeacherStatsPage.jsx";
import TeacherQuestions from "./views/teacherQuestions/TeacherQuestions.jsx";
import AnswerQuestions from "./views/answerQuestion/AnswerQuestions.jsx";
import MessagesPage from "./views/messagesPage/MessagesPage.jsx";
import SpecialistCourses from "./views/specialistCourses/SpecialistCourses.jsx";
import EditCoursePage from "./views/editCoursePage/EditCoursePage.jsx";
import UpdateChapter from "./views/updateChapter/UpdateChapter.jsx";
import AddCourse from "./views/addCourse/AddCourse.jsx";
import AddChapter from "./views/addChapter/AddChapter.jsx";
import UpdateProfile from "./views/updateProfile/UpdateProfile.jsx";
import LeaderBoard from "./views/leaderBoard/LeaderBoard.jsx";
import LeaveReview from "./views/leaveReview/LeaveReview.jsx";
import ReviewsPage from "./views/reviewsPage/ReviewsPage.jsx";


function App() {
    // const { unityProvider,sendMessage  } = useUnityContext({
    return (

        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/courses" element={<CoursesPage/>}/>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
                <Route path="/courses/:courseId" element={<EnrollPage/>}/>
                <Route path="/courses/:courseId/chapter/:chapterId" element={<ChapterPage/>}/>
                <Route path="/question/:courseId/:chapterId" element={<LeaveQuestionPage/>}/>
                <Route path="/game/:enrollmentId/:chapterId" element={<GamePage/>}/>
                <Route path="/student" element={<StudentDashboard/>}/>
                <Route path="/questions" element={<QuestionsPage/>}/>
                <Route path="/enrolled" element={<EnrolledPage/>}/>
                <Route path="/teacher/courses" element={<TeacherCourses/>}/>
                <Route path="/teacher/courses/:courseId" element={<TeacherStudent/>}/>
                <Route path="/teacher/courses/:courseId/:studentId" element={<TeacherStatsPage/>}/>
                <Route path="/teacher/questions" element={<TeacherQuestions/>}/>
                <Route path="/answer/:questionId" element={<AnswerQuestions/>}/>
                <Route path="/messages" element={<MessagesPage/>}/>
                <Route path="/specialist" element={<SpecialistCourses/>}/>
                <Route path="/specialist/course/:courseId" element={<EditCoursePage/>}/>
                <Route path="/specialist/chapter/:chapterId" element={<UpdateChapter/>}/>
                <Route path="/specialist/addCourse" element={<AddCourse/>}/>
                <Route path="/specialist/course/:courseId/addChapter" element={<AddChapter/>}/>
                <Route path="/updateProfile" element={<UpdateProfile/>}/>
                <Route path="/leaderBoard" element={<LeaderBoard/>}/>
                <Route path="/leaveReview/:enrollmentId" element={<LeaveReview/>}/>
                <Route path="/reviews" element={<ReviewsPage/>}/>



            </Routes>
        </Router>


    );
}

export default App;
