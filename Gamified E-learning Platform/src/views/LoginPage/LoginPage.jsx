import RootContainer from "../../utils/rootContainerModule.jsx";
import React, {useState} from "react";
import TextInput from "../../components/textInput/textInput.jsx";
import "./LoginPage.css";
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";

function LoginPage() {
    return (
        <>
            <RootContainer>
                <div className="image-containerLogin text-center">
                    <img src="../../../public/login_image.svg" alt="Image" className="LoginImage"/>
                </div>
                <div className="text-center">
                    <div className="input-wrapper">
                        <p className="input-header">Full name</p>
                        <TextInput placeholder="your name"/>
                    </div>
                    <br/>
                    <br/>
                    <div className="input-wrapper">
                        <p className="input-header">Password</p>
                        <TextInput type="password" placeholder="password"/>
                    </div>
                    <br/>
                    <br/>
                    <PixelatdButton text={"LOGIN"}></PixelatdButton>
                    <br/>

                    <p className="extra-text">Do not have an account? &nbsp;<a href="/signup" className={"text-link"}>Sign up</a></p>
                </div>
            </RootContainer>
        </>
    );
}

export default LoginPage;
