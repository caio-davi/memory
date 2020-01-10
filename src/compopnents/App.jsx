import React from 'react';
import '../styles/App.css';
import Board from './Board';
import {clone, shuffle} from '../Utils';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
  } from "mdbreact";


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

  const initialBoardControl = {
    boardView : [],
    chooseOne : false,
    chooseTwo : false,
    points : {
      0 : 0,
      1 : 0,
    },
   turn : false,
  };

  const [boardControl, setBoardControl] = React.useState(initialBoardControl);
  const [board, setBoard] = React.useState(initialState(12));

  const newGame = (boardSize) => {
    setBoard(initialState(boardSize));
    setBoardControl(initialBoardControl);
  } 

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
      <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Memory Card Game </strong>
        </MDBNavbarBrand>
          <MDBNavbarNav left className="App-header" >
              <MDBNavItem>
                {boardControl.turn  ? '' : '-'} holder {boardControl.points[0]}
              </MDBNavItem>
              <MDBNavItem>
                {boardControl.turn  ? '-' : ''} holder {boardControl.points[1]}
              </MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">New Game</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem onClick={()=>{newGame(12)}}>3x4</MDBDropdownItem>
                  <MDBDropdownItem onClick={()=>{newGame(16)}}>4x4</MDBDropdownItem>
                  <MDBDropdownItem onClick={()=>{newGame(20)}}>5x4</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
          </MDBNavbarNav>
      </MDBNavbar>
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
