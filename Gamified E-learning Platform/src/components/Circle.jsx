import React from 'react';

const Circle = ({ radius }) => {
    const circleStyle = {
     alignSelf: 'flex-end',
        marginRight: `0.5rem` // Adding margin-right

    };
    return (

        <svg width={radius * 2} height={radius * 2} style={circleStyle}>
            <circle cx={radius} cy={radius} r={radius} fill= "#D9D9D9" />
        </svg>
    );
};

export default Circle;
