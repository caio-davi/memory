import React from 'react';
import '../styles/App.css';
import Board from './Board';
import Header from './Header';
import Modal from './Modal';
import {clone, shuffle} from '../Utils';

const App = () => {

  const cardDict = ['cat', 'crow', 'dog', 'dove', 'dragon', 'fish', 'frog', 'hippo', 'horse', 'kiwi-bird', 'otter', 'spider']

  const initialState = (size) => {
    let state = [];
    for(let i = 0; i < size/2; i++){
      state.push(i);
      state.push(i);
    }
    return shuffle(state);
  } 

  const initialBoardControl = (size) => {
    let boardView = new Array(size);
    boardView.fill(false);
    return {
      boardView : boardView,
      chooseOne : false,
      chooseTwo : false,
      points : {
        0 : 0,
        1 : 0,
      },
      turn : false,                       // player 1 false, player 2 true
    }
  };

  const [boardControl, setBoardControl] = React.useState(initialBoardControl(12));
  const [board, setBoard] = React.useState(initialState(12));
  const [newGameModal, setNewGameModal] = React.useState(false);
  const [newGameBoardSize, setNewGameBoardSize] = React.useState(12);

  console.log(boardControl);

  const newGame = (boardSize) => {
    setBoard(initialState(boardSize));
    setBoardControl(initialBoardControl(boardSize));
    setNewGameModal(false);
  };
  
  const toggleNewGameModal = () => {
    setNewGameModal(!newGameModal);
  };

  const handleNewGameModal = (value) => {
    setNewGameModal(!newGameModal);
    setNewGameBoardSize(value);
  };

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

  const isTrue = (arg) => { 
    return arg === true;
  };

  const isFinished  = ()  => {
    return boardControl.boardView.every(isTrue);
  };

  return (
    <div className="App">
      <Modal
        isFinished={isFinished}
        newGame={newGame}
        handleNewGameModal = {handleNewGameModal}
        newGameModal = {newGameModal}
        newGameBoardSize = {newGameBoardSize}
        toggleNewGameModal = {toggleNewGameModal}
      />

      <Header 
        boardControl={boardControl}
        handleNewGameModal = {handleNewGameModal}
      />

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
