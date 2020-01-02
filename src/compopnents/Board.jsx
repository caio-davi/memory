import React from 'react';
import {MDBContainer, MDBCard, MDBIcon} from 'mdbreact';
import '../styles/Board.css';

const Board = (props) => {

    const CardList = (props) => {
        let cardList = [];
        for(let i in props.board ){
            console.log(props.board[i]);
            cardList.push(
                <MDBCard className='MDBCard' onClick = {() => props.toggleCard(i)}>
                    {props.boardView[i] ?
                        <MDBIcon icon = {props.cardDict[props.board[i]]}  size="5x" />
                        :
                        i
                    }
                </MDBCard>
            );
        }
        return cardList;
    };

    return (
        <MDBContainer className='MDBContainer'>
            <CardList  {...props}/>
        </MDBContainer>    
    );
}

export default Board;