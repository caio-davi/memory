import React from 'react';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
    } from "mdbreact";
import '../styles/Header.css';

const Header = (props) => {

    return (
        <MDBNavbar color="indigo" dark expand="md" >
        <MDBNavbarBrand>
          <strong className="white-text h1">Memory Card Game </strong>
        </MDBNavbarBrand>
          <MDBNavbarNav center >
              <MDBNavItem tag='h2' className={props.boardControl.turn  ? 'Inactive' : 'Active'}>
                Player 1 
              </MDBNavItem>
              <MDBNavItem tag='h1'>
              {props.boardControl.points[0]} x {props.boardControl.points[1]}
              </MDBNavItem>
              <MDBNavItem tag='h2' className={props.boardControl.turn  ? 'Active' : 'Inactive'}>
                Player 2 
              </MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="h2">New Game</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem onClick={()=>{props.handleNewGameModal(12)}}>3x4</MDBDropdownItem>
                  <MDBDropdownItem onClick={()=>{props.handleNewGameModal(16)}}>4x4</MDBDropdownItem>
                  <MDBDropdownItem onClick={()=>{props.handleNewGameModal(24)}}>4x6</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
          </MDBNavbarNav>
      </MDBNavbar>
    )
};


export default Header;