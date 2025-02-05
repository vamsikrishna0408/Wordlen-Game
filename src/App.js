import React, { Component } from "react";
import Grid from "./components/Grid";
import Message from "./components/Message";
import Keyboard from "./components/keyboard";
import "./App.css";

const WORD_LIST = [
  "APPLE",
  "REACT",
  "REDUX",
  "HOOKS",
  "NOTES",
  "HOUSE",
  "JUMPS",
  "LOGIC",
  // Add more words as needed
];

class App extends Component {
  state = {
    word: this.getRandomWord(),
    guesses: [],
    currentGuess: "",
    attempts: 6,
    gameStatus: "playing",
    darkMode: false,
  };

  getRandomWord() {
    const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
    return WORD_LIST[randomIndex].toUpperCase();
  }

  handleInputChange = (value) => {
    if (value.length <= 5) {
      this.setState({ currentGuess: value.toUpperCase() });
    }
  };

  handleKeyPress = (key) => {
    const { currentGuess } = this.state;
    if (currentGuess.length < 5) {
      this.setState({ currentGuess: currentGuess + key });
    }
  };

  handleDelete = () => {
    const { currentGuess } = this.state;
    this.setState({ currentGuess: currentGuess.slice(0, -1) });
  };

  handleGuess = () => {
    const { currentGuess, word, guesses, attempts } = this.state;
    if (currentGuess.length !== 5) return;

    const updatedGuesses = [...guesses, currentGuess];

    this.setState({
      guesses: updatedGuesses,
      currentGuess: "",
      gameStatus:
        currentGuess === word
          ? "won"
          : updatedGuesses.length >= attempts
          ? "lost"
          : "playing",
    });
  };

  handleNewGame = () => {
    this.setState({
      word: this.getRandomWord(),
      guesses: [],
      currentGuess: "",
      gameStatus: "playing",
    });
  };
  toggleDarkMode = () => {
    this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
    document.body.classList.toggle('dark-mode');
  };
  

  render() {
    const { guesses, currentGuess, gameStatus, darkMode, word } = this.state;
    return (
      <div className={`wordle-container ${darkMode ? "dark" : ""}`}>
        
        <h1><span>Wordle Clone</span></h1>
        <button onClick={this.toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        
        {gameStatus === "lost" && <p className="word" >{word}</p>}
        <Message gameStatus={gameStatus} />

        <Grid guesses={guesses} currentGuess={currentGuess} word={word} />

        {gameStatus === "playing" && (
          <Keyboard
            onKeyPress={this.handleKeyPress}
            onSubmit={this.handleGuess}
            onDelete={this.handleDelete}
          />
        )}

        <button onClick={this.handleNewGame} className="new-game-btn">
          New Game
        </button>
      </div>
    );
  }
}

export default App;
