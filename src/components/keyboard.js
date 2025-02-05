import React from "react";
import "./keyboard.css"; // Add your CSS styles for the virtual keyboard

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const Keyboard = ({ onKeyPress, onSubmit, onDelete }) => {
  return (
    <div className="virtual-keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className="keyboard-key"
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <div className="keyboard-row">
      <button className="large-key" onClick={onSubmit}>
          Enter
        </button>
        <button className="large-key" onClick={onDelete}>
          Delete
        </button>
        
      </div>
    </div>
  );
};

export default Keyboard;
