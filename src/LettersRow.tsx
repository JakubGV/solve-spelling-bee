import { FunctionComponent } from 'react';
import './LettersRow.css';

type LettersRowProps = {
  letters: string
}

/**
 * Renders `props.letters` in separate boxes with the middle one highlighted styled for desktop and mobile.
 * @param props 
 * @param props.letters The string of letters to render as boxes
 * @returns `<div>` container that holds `<div>`s of letters in a row
 */
export const LettersRow: FunctionComponent <LettersRowProps> = (props) => {
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