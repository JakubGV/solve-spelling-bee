# solve-spelling-bee
##  Description
solve-spelling-bee is a web application I built using my [NYT spelling bee solver](https://github.com/JakubGV/nyt-spellbee-solver) in Python as a basis. The premise of the game is simple, given 7 letters, find all the words you can! This solver helps you find the words you can't. The [game](https://www.nytimes.com/puzzles/spelling-bee) is made by the New York Times.

The web application is [accessible](https://jakubgvogel.com/solve-spelling-bee/) on GitHub pages. Type or enter the 7 letters, placing the required letter in the middle, and hit enter to see the results!

## Installing and Running
This project was built using [React](https://reactjs.org/). The dependencies for React are well documented but include Node.js, to be able to locally run JavaScript, and npm, a package manager. Specific dependencies can be installed using npm, with a command to `npm install` installing all the required packages described in [package.json](./package.json).

## Using the Project
Type or enter the 7 letters, placing the required letter in the middle, and hit enter to see the results!

Additionally, some components I built, such as [LettersRow.tsx](./src/LettersRow.tsx), might be helpful to reuse in your own projects.

## Interaction with Self-Built API
The core logic behind solving the spelling bee is located in my [nyt-spellbee-solver](https://github.com/JakubGV/nyt-spellbee-solver) repository, a solving script built in Python. Instead, this web application makes a GET request to the `/solve` endpoint I created, which is parameterized to accept different letters. So, when you hit enter after typing in your letters, the application is contacting a server hosted on [Google Cloud Run](https://cloud.google.com/run) for all the words it can find using those letters.

## Learnings
* Designing web applications for both mobile and desktop
* Dynamically fetching from an API and rendering that data
* Creating event listeners for keyboard input
* Using `react-simple-keyboard` as an alternative to keyboard input on mobile devices
* Interacting with and reading documentation about other packages' APIs

## Credits
I have nothing to do with the New York Times or its Spelling Bee game. I made this project as a fun way to develop my web development skills and be able to share a solver I made for myself with my friends!