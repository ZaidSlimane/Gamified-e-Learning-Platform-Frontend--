import React from "react";
import './pixelatedButton.css';
import '../../../src/fonts/fonts.css'


function PixelatdButton ({text, onClick}){

    return (
        <>
            <button className="outerclip v2" onClick={onClick}>
                <div className="innerclip">{text}</div>
            </button>

        </>
    )
}

export default PixelatdButton;
