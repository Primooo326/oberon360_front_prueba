import React from 'react';

export default function CalendarSVG() {
    return (
        <svg role="img" aria-label="x" width="400" height="420" xmlns="http://www.w3.org/2000/svg">
            <image href="/assets/images/BACKGROUND-CALENDARIO.png" width="100%" height="100%" />
            <text x="50%" y="27%" fontSize="20" fill="white" textAnchor="middle" alignmentBaseline="middle">
                {new Date().toLocaleString('default', { month: 'long' })}
            </text>
        </svg>
    );
}