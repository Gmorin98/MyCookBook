// Necessary Import
import React, { useContext } from 'react';
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// Components and Other Import
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";

const NavigationBar = () => {
  const { loggedInUserInfo, logOut } = useContext(LoggedInUserContext);

  return (
    <NavContainer>
      <NavLink to="/" >Home</NavLink>
      <NavLink to="/mycookbook" >My Cook Book</NavLink>
      <div className='loginSection'>
        {
          <>
            {loggedInUserInfo !== null ? <NavLink to={"/profile"}>Hello {loggedInUserInfo.firstName}</NavLink> : <NavLink to="/login">Log in</NavLink>}
            {loggedInUserInfo && <NavLink to="/" onClick={logOut}>Log out</NavLink>}
          </>
        }
      </div>
    </NavContainer>
  );
}

export default NavigationBar

const NavContainer = styled.nav`
  display: flex;
  height: 6.5vh;
  align-items: center;
  justify-content: space-evenly;
  background: linear-gradient(180deg, rgba(255,255,255,1) 80%, rgba(255,255,255,0) 100%); 
  & a {
    text-decoration: none;
    color: black;
  }
  & .loginSection {
    display: flex;
    width: 15vw;
    justify-content: space-between;
  }
`