// Necessary Import
import styled from "styled-components";
import React, { useContext } from "react";

// Component and Other Import
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";


const Profile = () => {
  const { loggedInUserInfo, loggedInUserRecipes, userID } = useContext(LoggedInUserContext);

  return (
    <MainContainer>
      <div>
        <h1>Profile Page</h1>
        <p>First name : {loggedInUserInfo.firstName}</p>
        <p>Last name :{loggedInUserInfo.lastName}</p>
        <p>Number of recipes you currently have : {loggedInUserRecipes.length}</p>
        <p>Number of friends you currently have : {loggedInUserInfo.friendList.length}</p>
        <p>Friend Code : {userID}</p>
      </div>
    </MainContainer>
  )
}

export default Profile

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  min-height: 85vh;
  margin: auto;
  & h1 {
    margin: 0;
  }
  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    width: 30vw;
    height: 40vh;
    border-radius: 10%;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -6px 0px inset; // Original 0px -3px 0px on the last one
    background-color: lightgray;
    & p {
      width: 25vw;
      margin: auto;
      align-self: flex-start;
    }
  }
`;