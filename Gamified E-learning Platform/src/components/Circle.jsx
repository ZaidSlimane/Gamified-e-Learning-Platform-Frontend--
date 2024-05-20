import React from 'react';

const Circle = ({ radius, shadowY, imageUrl }) => {
    const circleStyle = {
        alignSelf: 'flex-end'// Adding margin for spacing

    };

    return (
        <svg width={radius * 2} height={radius * 2} style={circleStyle}>
            <defs>
                <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy={shadowY} stdDeviation="2" floodColor="#01F401" />
                </filter>
            </defs>
            <circle
                cx={radius-3}
                cy={radius-4}
                r={radius-4}
                fill="#353B42"
                style={{ filter: 'url(#dropShadow)' }}
            />
            <image
                href={imageUrl}
                x={radius / 2}
                y={radius / 2}
                width={radius}
                height={radius}
                clipPath={`circle(${radius - 30 / 2}px at ${radius-30}px ${radius-30}px)`}
            />
        </svg>
    );
};

export default Circle;