import React, { FunctionComponent } from 'react';
import { Circles } from 'react-loader-spinner';
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
  frozenLetters: string,
  loading: boolean,
  results: boolean,
  words: string[]
}

export class SpellBeeSolver extends React.Component<Props, State> {
  state: State = {
    index: 0,
    letters: '       ',
    frozenLetters: '',
    loading: false,
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
    });
  }

  handleEnterPress = () => {
    const currIndex = this.state.index;
    const letters = this.state.letters;
    if (currIndex !== 7) {
      return;
    }
    else {
      // Move the requied letter to the beginning for the API
      let arrLetters = letters.split('');
      const temp = arrLetters[0];
      arrLetters[0] = arrLetters[3];
      arrLetters[3] = temp;
      const adjLetters = arrLetters.join('');
      
      const URL = `https://nyt-spellbee-solver-ax6jl2dzpa-ue.a.run.app/solve?letters=${adjLetters.toLowerCase()}`

      this.setState({
        loading: true
      })
      
      fetch(URL, { method: 'GET' } )
        .then(response => response.json())
        .then(data => this.setState({ loading: false, results: true, frozenLetters: letters, words: data }))
        .catch(error => { alert(`Error fetching: ${error}`); this.setState({ loading: false }); });
    }
  }

  render() {
    return (
      <div className="background">
        <div className="main">
          <h1>NYT Spelling Bee Solver</h1>
          <p>Type the letters in and hit enter!</p>
          <LettersRow letters={this.state.letters} />
          {
            this.state.loading &&
            <div className="circle"><Circles height="50" width="50" color="#000000" /></div>
          }
          {
            this.state.results &&
            <WordVisual letters={this.state.frozenLetters} words={this.state.words} />
          }
        </div>
      </div>
    )
  }
}