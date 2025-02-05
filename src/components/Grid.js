import React from "react";

const Grid = ({ guesses, currentGuess, word }) => {
  const numRows = 6;
  const numCols = 5;

  const getLetterClass = (letter, index, guessSubmitted) => {
    if (!guessSubmitted) return 'gray';
    if (word[index] === letter) {
      return 'green';
    } else if (word.includes(letter)) {
      return 'yellow';
    } else {
      return 'gray';
    }
  };

  const renderRow = (rowIndex) => {
    const guess = guesses[rowIndex] || "";
    const isCurrentRow = rowIndex === guesses.length;
    const guessSubmitted = rowIndex < guesses.length;

    return (
      <div key={rowIndex} className="row">
        {Array.from({ length: numCols }).map((_, colIndex) => {
          const letter = isCurrentRow ? currentGuess[colIndex] || "" : guess[colIndex] || "";
          return (
            <span key={colIndex} className={`tile ${getLetterClass(letter, colIndex, guessSubmitted)}`}>
              {letter}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="grid">
      {Array.from({ length: numRows }).map((_, rowIndex) => renderRow(rowIndex))}
    </div>
  );
};

export default Grid;
