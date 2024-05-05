import React, { useState } from 'react';
import './textInput.css';
import '../../fonts/fonts.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from Font Awesome

const TextInput = ({ type, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="input-container">
            <input
                className="input"
                type={showPassword ? 'text' : type}
                placeholder={placeholder}
            />
            {type === 'password' && (
                <div className="eye-icon-container" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
            )}
        </div>
    );
};

export default TextInput;
