import React from 'react';
import '../styles/App.css';
import Board from './Board';
import {clone} from '../Utils';


const App = () => {

  const cardDict = ['cat', 'crow', 'dog', 'dove', 'dragon', 'fish', 'frog', 'hippo', 'horse', 'kiwi-bird', 'otter', 'spider,']

  const initialState = [0,0,1,1];
  const [boardView, setBoardView] = React.useState([false,false,false,false]);
  const [board, setBoard] = React.useState(initialState);
  
  const toggleCard = (index) => {
    let newBoardView = clone(boardView);
    newBoardView [index] = !boardView[index];
    setBoardView(newBoardView);
  }

  return (
    <div className="App">
        <Board 
          board = {board} 
          boardView = {boardView}
          cardDict = {cardDict}
          toggleCard = {toggleCard}
          />
    </div>
  );
}

export default App;
