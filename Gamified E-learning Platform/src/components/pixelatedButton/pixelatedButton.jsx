import React, {useState} from "react";
import './pixelatedButton.css';
import '../../../src/fonts/fonts.css'


function PixelatdButton ({text}){


    return (
        <>
            <button className="outerclip v2">
                <div className="innerclip">{text}</div>
            </button>

        </>
    )
}

export default PixelatdButton;
