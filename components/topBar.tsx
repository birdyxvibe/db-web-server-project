import React from 'react';

let darkColors = ['red', 'orange', 'green', 'blue', 'purple', 'black']

interface TopBarProps {
    userName: string,
    color?: string;
}

const TopBar: React.FC<TopBarProps> = ({ userName, color = 'blue' }) => {
    return (
        <div style = {{ backgroundColor: color, height: '51px', width: '100vw', position: 'absolute', top: 0, left: 0 }}>
            <h1 style = {{ color: darkColors.includes(color) ? 'white' : 'black', textAlign: 'center', lineHeight: '50px'}}> {userName.charAt(0) != '$' ? "directory/" : ''}<span style={{textDecoration: 'underline'}}>{userName.toLowerCase()}</span> </h1>
        </div>
    )
}

export default TopBar;
