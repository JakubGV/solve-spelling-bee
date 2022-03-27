import React, { FunctionComponent } from 'react';
import { WordVisual } from './WordVisual';
import './SpellBeeSolver.css';

type LettersRowProps = {
  letters: string
}

const LettersRow: FunctionComponent <LettersRowProps> = (props) => {
  return (
    <div className="letter-row">
      {
        props.letters.split('').map( (letter: string, index) => {
          return (
            <div className="letter" first-letter={index === 3 ? "true" : "false"} key={index}>{letter}</div>
          )
        })
      }
    </div>
  )
}

type Props = {

}

type State = {
  index: number,
  letters: string, // The index to insert next at
  results: boolean,
  words: string[]
}

export class SpellBeeSolver extends React.Component<Props, State> {
  state: State = {
    index: 0,
    letters: '       ',
    results: false,
    words: []
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress)
  };

  handleKeyPress = (event: KeyboardEvent) => {
    const pressedKey = event.key.toUpperCase();
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    let tempLetters = this.state.letters;
    let tempIndex = this.state.index;

    if (pressedKey === 'BACKSPACE') {
      if (tempIndex !== 0) {
        tempIndex -= 1;
        tempLetters = tempLetters.substring(0, tempIndex) + ' ' + tempLetters.substring(tempIndex + 1);
      }
    }
    else if (pressedKey === 'ENTER') {
      this.handleEnterPress();
      return;
    }
    else if (tempLetters[6] !== ' ') { // Don't add more than 7 letters
      return;
    }
    else if (letters.search(pressedKey) !== -1) {
      tempLetters = tempLetters.substring(0, tempIndex) + pressedKey + tempLetters.substring(tempIndex + 1);
      tempIndex += 1;
    }
    else {
      return;
    }

    this.setState({
      index: tempIndex,
      letters: tempLetters
    })
  }

  handleEnterPress = () => {
    if (this.state.index !== 7) {
      alert('Please enter 7 letters');
      return;
    }
    else {
      this.getWords(this.state.letters);
      return;
    }
  }

  getWords = (letters: string) => {
    // Move the requied letter to the beginning for the API
    let arrLetters = letters.split('');
    const temp = arrLetters[0];
    arrLetters[0] = arrLetters[3];
    arrLetters[3] = temp;
    const adjLetters = arrLetters.join('');
    
    const URL = `https://nyt-spellbee-solver-ax6jl2dzpa-ue.a.run.app/solve?letters=${adjLetters.toLowerCase()}`

    fetch(URL, { method: 'GET' } )
      .then(response => response.json())
      .then(data => this.setState({ results: true, words: data }))
      .catch(error => alert(`Error fetching: ${error}`));
  }

  render() {
    return (
      <div className="background">
        <div className="main">
          <h1>NYT Spelling Bee Solver</h1>
          <p>Type the letters in and hit enter!</p>
          <LettersRow letters={this.state.letters} />
          {
            this.state.results &&
            <WordVisual letters={this.state.letters} words={this.state.words} />
          }
        </div>
      </div>
    )
  }
}