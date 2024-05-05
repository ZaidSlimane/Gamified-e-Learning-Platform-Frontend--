import RootContainer from "../../utils/rootContainerModule.jsx";
import React, {useState} from "react";
import TextInput from "../../components/textInput/textInput.jsx";
import "./SignUp.css";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";

function SignUp() {
    return (
        <>
            <RootContainer>
                <div className="image-containerSignUp text-center">
                    <img src="../../../public/login_image.svg" alt="Image" className="SignUpImage"/>

                </div>
                <div className={"text-center"}>
                    <div className="input-wrapper">
                        <p className="input-header">Full name</p>
                        <TextInput type={"text"} placeholder="your name"/>
                    </div>
                    <br/>
                    <br/>
                    <div className="input-wrapper">
                        <p className="input-header">Email address</p>
                        <TextInput type={"email"} placeholder="yourname@email.com"/>
                    </div>
                    <br/>
                    <br/>
                    <div className="input-wrapper">
                        <p  className="input-header">Phone number</p>
                        <TextInput type={"tel"} placeholder="+213 123456789"/>
                    </div>
                    <br/>
                    <br/>
                    <div className="input-wrapper">
                        <p className="input-header">Create password</p>
                        <TextInput type="password" placeholder="password"/>

                    </div>
                    <br/>
                    <div className="input-wrapper" style={{marginTop: '10px'}}>
                        <p className="extra-text">Password must contain a minimum of 8 characters</p>
                        <p className="extra-text">Password must contain at least one symbol e.g. @, !</p>
                    </div>
                    <br/>
                    <br/>
                    <div className="input-wrapper">
                        <p className="input-header">Location (Optional)</p>
                        <TextInput placeholder="region"/>
                    </div>
                    <br/>
                    <br/>
                    <PixelatdButton text={"SIGN UP"}></PixelatdButton>
                    <br/>

                    <p className="extra-text2">Already a user? &nbsp;<a href="/login" className={"text-link"}>Log in</a></p>
                </div>
            </RootContainer>

        </>);
}

export default SignUp;
