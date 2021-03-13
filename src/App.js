import './App.css';
import React from "react";

function App() {
  const [textInput, setTextInput] = React.useState(`This is
a badly formatted file. This line is pretty long! It's way more than 80 characters! I feel a line wrap coming on!

This      is a second paragraph with extraneous whitespace.`);
  const [textOutput, setTextOutput] = React.useState('');

  const handleChange = event => {
    setTextInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    transformText(textInput);
  };

  const transformText = input => {
    const words = input
      .split(/\n/g) // elimina saltos de línea
      .filter(line => !!line) // elimina del array los espacios vacíos
      .map(line => line.replace(/\s{2,}/g, " ")) // elimina espacios adicionales
      .join(" ") // convierte el array en un string, es decir una sola línea
      .split(" "); // convierte el string (una línea) en un array de palabras

    const MAX_LINE_WIDTH = 80;

    let lines = "";

    words.forEach((word, index) => {
      const preffix = index === 0 ? "" : " ";
      const splittedLines = lines.split(/\n/)
      const currentLine = splittedLines[splittedLines.length - 1]

      if (word.length >= MAX_LINE_WIDTH) {
        lines = word;
      }

      if (currentLine.length + word.length + preffix.length < 80) {
        lines += `${preffix}${word}`;
      } else if (currentLine.length + word.length + preffix.length === 80) {
        lines += `${preffix}${word}\n`;
      } else {
        lines += `\n${word}`;
      }
    })

    setTextOutput(lines);
  }
  
  
  return (
    <div className="App">
      <header>
        <h1>Career Lab | Take-Home Assignment</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea onChange={handleChange} value={textInput}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
      <div id="result">
        {textOutput}
      </div>
    </div>
  );
}

export default App;
