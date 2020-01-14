import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';


const Modal = (props) => {
    
    const toggleHandler = () => {
        return props.isFinished() ? props.newGame(props.newGameBoardSize) : props.toggleNewGameModal();
    }

    return(
        <MDBContainer>
            <MDBModal isOpen={props.isFinished() || props.newGameModal} >
                <MDBModalHeader toggle={() => toggleHandler()}>
                    MDBModal 
                </MDBModalHeader>
                <MDBModalBody>
                    Player 2 lost the game, but you always can try again. Congratulations player 1!
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="primary" onClick = {() => props.newGame(props.newGameBoardSize)}>
                        Play new game
                    </MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
};

export default Modal;