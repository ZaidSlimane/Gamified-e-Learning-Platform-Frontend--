import React from 'react';

const ButtonsSet = () => {
    const keyframesStyle = `
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(1);
            }
        }
    `;

    const circleStyle = {
        width: '126px',
        height: '126px',
        cursor: 'pointer',
        animation: 'pulse 1s infinite',
        margin: "10px"
    };

    return (
        <div>
            <style>{keyframesStyle}</style>

            <div className={"d-flex flex-column justify-content-center"}>

            <div className="d-flex justify-content-center">
                <img
                    src={'/up.svg'}
                    style={circleStyle}
                    alt="Button"
                />
            </div>

            <div className={"d-flex flex-row mb-5"}>
                <img
                    src={'/left.svg'}
                    style={circleStyle}
                    alt="Button"
                />
                <img
                    src={'/down.svg'}
                    style={circleStyle}
                    alt="Button"
                />

                <img
                    src={'/right.svg'}
                    style={circleStyle}
                    alt="Button"
                />
            </div>
            </div>

        </div>
    );
};

export default ButtonsSet;