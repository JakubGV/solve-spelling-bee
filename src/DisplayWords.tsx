import { FunctionComponent } from 'react';
import './DisplayWords.css';

type LettersRowProps = {
  letters: string
  words: string[]
}

/**
 * Finds the pangrams given an array of words and seven letters
 * @param letters The letters that must be included
 * @param words The words to search
 * @returns A string array of the pangrams found
 */
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

/**
 * Organized the given words by length and sort them alphebetically
 * @param words The array of words to organize
 * @returns An object with keys of varying length, sorted in increasing order, paired to an array of words at that length, also sorted in increasing order
 */
const organizeWords = (words: string[]) => {
  let organizedWords: keyable = {};
  
  // Order each word by length and place into an object keyed by word length
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

  // Sort the object to have the length in increasing order
  let ordered = Object.keys(organizedWords).sort().reduce(
    (obj: keyable, key) => {
      obj[key] = organizedWords[key];
      return obj;
    },
    {}
  );

  // Sort the words in alphabetical order
  for (const key in ordered) {
    ordered[key].sort();
  }

  return ordered;
}

/**
 * Renders `props.words` organized by length and displays the pangrams using `props.letters`
 * @param props
 * @param props.letters The letters that were used
 * @param props.words The words that were found
 * @returns A large `<div>` container of all the words organized by length
 */
export const DisplayWords: FunctionComponent <LettersRowProps> = (props) => {
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