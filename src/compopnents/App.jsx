import React from 'react';
import '../styles/App.css';
import Board from './Board';
import {clone} from '../Utils';


const App = () => {

  const cardDict = ['cat', 'crow', 'dog', 'dove', 'dragon', 'fish', 'frog', 'hippo', 'horse', 'kiwi-bird', 'otter', 'spider,']

  const initialState = [0,0,1,1];

  const initialBoardControl = {
    boardView : [false, false, false, false],
    chooseOne : false,
    chooseTwo : false,
    points : {
      0 : 0,
      1 : 0,
    },
   turn : false,
  };

  const [boardControl, setBoardControl] = React.useState(initialBoardControl);
  const [board, setBoard] = React.useState(initialState);



  const updateBoardControl = (index, value, choose) => {
    let newBoardControl = clone(boardControl);
    newBoardControl[choose] = index;
    newBoardControl.boardView[index] = value;
    setBoardControl(newBoardControl);
  };

  const cleanChooses = (unflipCards) => {
    let newBoardControl = clone(boardControl);
    if(unflipCards){
      newBoardControl.boardView[newBoardControl.chooseOne] = false;
      newBoardControl.boardView[newBoardControl.chooseTwo] = false;
    }else{
      const player = boardControl.turn ? 1 : 0;
      newBoardControl.points[player] = boardControl.points[player] + 1 ;
    }
    newBoardControl.chooseOne = false;
    newBoardControl.chooseTwo = false;
    newBoardControl.turn = !boardControl.turn;                       
    setBoardControl(newBoardControl);
  };

  const finishTurn = () => {
    console.log('timer_finish')
    if(board[boardControl.chooseOne] === board[boardControl.chooseTwo]){
      cleanChooses(false);
    }else{
      cleanChooses(true);
    }
  };

  const flipCard = (index) => {
    if(boardControl['chooseOne'] === false){
      updateBoardControl(index, true, 'chooseOne');
    }
    else if(boardControl['chooseTwo'] === false){
      updateBoardControl(index, true, 'chooseTwo');
    }
  };

  if(boardControl.chooseOne !== false && boardControl.chooseTwo !== false){
    setTimeout(finishTurn, 1500);
  }

  return (
    <div className="App">
        <Board 
          board = {board} 
          boardControl = {boardControl}
          cardDict = {cardDict}
          flipCard = {flipCard}
          />
    </div>
  );
}

export default App;
