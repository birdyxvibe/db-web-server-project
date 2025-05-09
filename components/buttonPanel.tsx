import React from 'react';

interface ButtonPanelProps {
    changeColor: (color: string) => void
}

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'black', 'orange', 'silver']

const ButtonPanel: React.FC<ButtonPanelProps> = ({ changeColor }) => {
    return (
        <div style = {{ position: 'absolute', gap: '15px', top: '90px', right: '1vw', zIndex: 1000 }}>
            {
                colors.map((color) => (
                    <button key = {color} onClick={() => changeColor(color)} style = {{ height: '3vw', width: '3vw', backgroundColor: color }}> </button>
                ))
            }
            </div>
        )
    }

export default ButtonPanel;
