import React from 'react';
import {MDBContainer, MDBCard, MDBIcon} from 'mdbreact';
import '../styles/Board.css';

const Board = (props) => {

    const CardList = (props) => {
        let cardList = [];
        for(let i in props.board ){
            cardList.push(
                <MDBCard className='MDBCard' color='pink' key={'card_'+i} onClick = {()=>props.flipCard(i)}>
                    {props.boardControl.boardView[i] ?
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