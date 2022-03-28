import { Component } from 'react';
import { Circles } from 'react-loader-spinner';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import { DisplayWords } from './DisplayWords';
import { LettersRow } from './LettersRow';

import './SpellBeeSolver.css';

type State = {
  index: number,
  letters: string, // The index to insert next at
  frozenLetters: string,
  loading: boolean,
  results: boolean,
  words: string[]
}

export class SpellBeeSolver extends Component<{}, State> {
  state: State = {
    index: 0,
    letters: '       ',
    frozenLetters: '',
    loading: false,
    results: false,
    words: []
  };

  // Listen for key presses
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress)
  };

  handleKeyPress = (event: KeyboardEvent) => {
    const pressedKey = event.key.toUpperCase();
    this.keyPressLogic(pressedKey);
  }

  // Handles a press on the virtual keyboard
  handleVirtualKeyPress = (button: any) => {
    this.keyPressLogic(button);
  }

  /**
   * Sanitizes keyboard input and only allows letters, a backspace, or enter to be acted upon
   * @param pressedKey The key that was pressed
   */
  keyPressLogic = (pressedKey: string) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    let tempLetters = this.state.letters;
    let tempIndex = this.state.index;

    if (pressedKey === 'BACKSPACE' || pressedKey === '{bksp}') {
      if (tempIndex !== 0) { // Replace the letter with an empty character if there is a letter to be deleted
        tempIndex -= 1;
        tempLetters = tempLetters.substring(0, tempIndex) + ' ' + tempLetters.substring(tempIndex + 1);
      }
    }
    else if (pressedKey === 'ENTER' || pressedKey === '{enter}') {
      this.handleEnterPress();
      return;
    }
    else if (tempLetters[6] !== ' ') { // Don't add more than 7 letters
      return;
    }
    else if (letters.search(pressedKey) !== -1) { // If what was inputted is a valid letter, add the letter
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

  /**
   * Sends a request to my [backend API](https://github.com/JakubGV/nyt-spellbee-solver) with the letters
   * which responds with the words found
   */
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
        .then(data => this.setState({ 
          loading: false, results: true, frozenLetters: letters, words: data
        }))
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
            <DisplayWords letters={this.state.frozenLetters} words={this.state.words} />
          }
        </div>
        <Keyboard 
          onKeyPress={this.handleVirtualKeyPress}
          layout={{'default': [
            'Q W E R T Y U I O P',
            'A S D F G H J K L',
            '{enter} Z X C V B N M {bksp}'
          ]}}
          display={{
            '{enter}': 'ENTER',
            '{bksp}': 'BACK'
          }}
          theme={"hg-theme-default keyboard"}
        />
      </div>
    )
  }
}