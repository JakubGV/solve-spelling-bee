import { FunctionComponent } from 'react';
import './WordVisual.css';

type LettersRowProps = {
  letters: string
  words: string[]
}

const findPangrams = (letters: string, words: string[]) => {
  let pangrams: string[] = []
  for (const word of words) {
    let lettersNeeded = new Set(letters.toLowerCase().split(''));
    for (const letter of word) {
      lettersNeeded.delete(letter);
    }

    if (lettersNeeded.size === 0) {
      pangrams.push(word);
    }
  }

  return pangrams;
}

interface keyable {
  [key: string]: any
}

const organizeWords = (words: string[]) => {
  let organizedWords: keyable = {};
  for (const word of words) {
    const len = word.length.toString();
    if (organizedWords.hasOwnProperty(len)) {
      organizedWords[len].push(word);
    }
    else {
      organizedWords[len] = [];
      organizedWords[len].push(word);
    }
  }

  let ordered = Object.keys(organizedWords).sort().reduce(
    (obj: keyable, key) => {
      obj[key] = organizedWords[key];
      return obj;
    },
    {}
  );

  for (const key in ordered) {
    ordered[key].sort();
  }

  return ordered;
}

export const WordVisual: FunctionComponent <LettersRowProps> = (props) => {
  const organizedWords = organizeWords(props.words);
  const pangrams = findPangrams(props.letters, props.words);
  
  return (
    <div className="container">
      <div className="row">
        <div className="left">Number of words found:</div>
        <div className="right">{props.words.length}</div>
      </div>
      <div className="row">
        <div className="left">Pangrams:</div>
        <div className="right">{pangrams.join(' ')}</div>
      </div>
      {
        Object.keys(organizedWords).map( (key) => {
          return (
            <div className="row">
              <div className="left">Words of length {key}:</div>
              <div className="right">{organizedWords[key].join(' ')}</div>
            </div>
          )
        })
      }

    </div>
  )
}