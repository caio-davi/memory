import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';


const Modal = (props) => {
    return(
        <MDBContainer>
            <MDBModal isOpen={props.isFinished() || props.newGameModel} >
            <MDBModalHeader toggle={ () => props.newGame()}>MDBModal </MDBModalHeader>
            <MDBModalBody>
            Player 2 lost the game, but you always can try again. Congratulations player 1!
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="primary">Play new game</MDBBtn>
            </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
};

export default Modal;