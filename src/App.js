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
  
  const formatParagraph = input => {
    const words = input
    .split(/\n/g) // elimina saltos de línea
    .filter(line => !!line) // elimina del array los espacios vacíos
    .map(line => line.replace(/\s{2,}/g, " ")) // elimina espacios adicionales
    .join(" ") // convierte el array en un string, es decir una sola línea
    .split(" "); // convierte el string (una línea) en un array de palabras

    console.log(words);

  const MAX_LINE_WIDTH = 80;

  let lines = "";

  words.forEach((word, index) => {
    const space = index === 0 ? "" : " ";
    const totalLines = lines.split(/\n/)
    const currentLine = totalLines[totalLines.length - 1]

    if (word.length >= MAX_LINE_WIDTH) {
      lines += `${index === 0 ? '' : '\n'}${word}`; //Si es la primera palabra del array no agrega salto de línea
    } else if (currentLine.length + word.length + space.length < MAX_LINE_WIDTH) {
      lines += `${space}${word}`; //Concatena espacio y palabra
    } else if (currentLine.length + word.length + space.length === MAX_LINE_WIDTH) {
      lines += `${space}${word}\n`; //Agrega el salto
    } else {
      lines += `\n${word}`;
    }
  })
   return lines
  }

  const transformText = input => {
    let output = ""

    const paragraphs = input
    .split(/\n\n/g) // elimina saltos de línea
    .filter(line => !!line) // elimina del array los espacios vacíos

    paragraphs.forEach((paragraph, index) => {
      output += formatParagraph(paragraph);
      output += index < paragraphs.length - 1 ? '\n\n' : ''
    } 
    )
    setTextOutput(output);
  };
  
  
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
