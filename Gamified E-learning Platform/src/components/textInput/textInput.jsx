import React from 'react';
import './textInput.css';
import '../../fonts/fonts.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from Font Awesome

const TextInput = ({ type, placeholder, value, onChange, onKeyDown, autoComplete }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="input-container">
            <input
                className="input"
                type={showPassword ? 'text' : type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                autoComplete={autoComplete}
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
