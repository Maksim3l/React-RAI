import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StyledButton = ({ to, color, hoverColor, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    const baseStyle = {
        padding: "8px 16px",
        borderRadius: "4px",
        textDecoration: "none",
        color: "black",
        cursor: "pointer",
        backgroundColor: isHovered ? hoverColor : color,
        transition: "background-color 0.3s ease"
    };

    return (
        <Link 
            to={to}
            style={baseStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </Link>
    );
};

export default StyledButton;
