import RootContainer from "../../utils/rootContainerModule.jsx";
import React, {useState} from "react";
import TextInput from "../../components/textInput/textInput.jsx";
import "./SignUp.css";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";
import {useNavigate} from "react-router-dom";
import Popup from "reactjs-popup"; // Ensure you have this package installed

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [grade, setGrade] = useState("");
    const [isVerifyPopupOpen, setIsVerifyPopupOpen] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const navigate = useNavigate();

    function createChatParticipant(userId) {
        const url = 'http://127.0.0.1:8000/api/chat_participants/';
        const data = {
            "user_id": userId,
            "user_type": 17
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    const signUp = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        username,
                        email,
                        password,
                        first_name: firstName,
                        last_name: lastName,
                        is_superuser: false,
                        is_staff: false,
                        is_active: true
                    },
                    phone_number: phoneNumber,
                    grade
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.user.id);
                createChatParticipant(responseData.user.id)
                setIsVerifyPopupOpen(true);
            } else {
                const errorData = await response.json();
                console.error('Sign up error:', errorData);
                if (errorData.user && errorData.user.email) {
                    alert(errorData.user.email[0]);  // Display the specific error message
                } else {
                    alert('An error occurred during sign up. Please try again.');
                }
            }
        } catch (error) {
            console.error('Sign up error:', error);
            // Handle error (e.g., display a message to the user)
        }
    };

    const verifyEmail = async () => {
        const response = await fetch('http://127.0.0.1:8000/signup/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({code: verificationCode}),
        });

        if (response.ok) {
            navigate('/login');
        } else {
            // Handle error
        }
    };

    const styles = {
        popupContainer: {
            backgroundColor: '#142334',
            borderRadius: '10px',
            padding: '20px',
            height: '220px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            color: '#ffffff',
            marginBottom: '20px',
            textAlign: 'center',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            marginTop: '30px'
        },
    };

    return (
        <>
            <RootContainer>
                <div className="image-containerSignUp text-center">
                    <img src="../../../public/login_image.svg" alt="Image" className="SignUpImage"/>
                </div>
                <div className={"text-center"}>
                    <div className="input-wrapper">
                        <p className="input-header">First name</p>
                        <TextInput type={"text"} placeholder="your first name" value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <br/>
                    <br/>
                    <div className="input-wrapper">
                        <p className="input-header">Last name</p>
                        <TextInput type={"text"} placeholder="your last name" value={lastName}
                                   onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <br/>
                    <br/>
                    <div className="input-wrapper">
                        <p className="input-header">Username</p>
                        <TextInput type={"text"} placeholder="pick a username" value={username}
                                   onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <br/>
                    <br/>
                    <div className="input-wrapper">
                        <p className="input-header">Email address</p>
                        <TextInput type={"email"} placeholder="yourname@email.com" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <br/>
                    <br/>
                    <div className="input-wrapper">
                        <p className="input-header">Phone number</p>
                        <TextInput type={"tel"} placeholder="+213 123456789" value={phoneNumber}
                                   onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </div>
                    <br/>
                    <br/>
                    <div className="input-wrapper">
                        <p className="input-header">Create password</p>
                        <TextInput type="password" placeholder="password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <br/>
                    <div className="input-wrapper" style={{marginTop: '10px'}}>
                        <p className="extra-textl">Password must contain a minimum of 8 characters</p>
                        <p className="extra-textl">Password must contain at least one symbol e.g. @, !</p>
                    </div>
                    <br/>
                    <br/>
                    <div className="input-wrapper">
                        <p className="input-header">Location (Optional)</p>
                        <TextInput placeholder="region" value={grade} onChange={(e) => setGrade(e.target.value)}/>
                    </div>
                    <br/>
                    <br/>
                    <PixelatdButton text={"SIGN UP"} onClick={signUp}></PixelatdButton>
                    <br/>
                    <p className="extra-text2">Already a user? &nbsp;<a href="/login" className={"text-link"}>Log in</a>
                    </p>
                </div>
            </RootContainer>

            <Popup open={isVerifyPopupOpen} closeOnDocumentClick onClose={() => setIsVerifyPopupOpen(false)}>
                <div style={styles.popupContainer}>
                    <p style={styles.text}>Please enter the verification code sent to your email.</p>
                    <TextInput type="text" placeholder="Verification code" value={verificationCode}
                               onChange={(e) => setVerificationCode(e.target.value)}/>
                    <div style={styles.buttonContainer}>
                        <PixelatdButton text="CANCEL" onClick={() => setIsVerifyPopupOpen(false)}/>
                        <PixelatdButton text="VERIFY" onClick={verifyEmail}/>
                    </div>
                </div>
            </Popup>
        </>
    );
}

export default SignUp;
