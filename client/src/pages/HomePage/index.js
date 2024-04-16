// Necessary Import
import styled from "styled-components";
import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";

// Component and Other Import
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import AddFriendComponent from "./AddFriendComponent";
import FriendFeed from "./FriendFeed";

const Home = () => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [allFriendsInfo, setAllFriendsInfo] = useState([]);

  const { userID, loggedInUserInfo } = useContext(LoggedInUserContext);

  const getFriendsInfo = () => {
    fetch("/getFriendsInfo", {
      method: "POST",
      body: JSON.stringify({
        friendList: loggedInUserInfo.friendList
      }),
      headers: {
        "Content-type" : "application/json"
      }
    })
    .then(response => response.json())
    .then(data => setAllFriendsInfo(data.data))
  };

  if (!userID) return <Navigate to="/login" />
  
  useEffect(() => {
    getFriendsInfo();
  }, [])
  
  return (
    <MainContainer>
      <h1>Home Page</h1>
      <section className="recipesFeedSection">
        <h2>Recipes Feed</h2>
        {allFriendsInfo && <FriendFeed friendArray={allFriendsInfo}/>}
      </section>
      <section className="friendListSection">
        <div className="divFriend">
          <h2>Friend List</h2>
          <button onClick={() => {showAddFriend ? setShowAddFriend(false) : setShowAddFriend(true)}}>
            {showAddFriend ? "X" : "+"}
          </button>
        </div>
        {showAddFriend && <AddFriendComponent />}
        {allFriendsInfo.map((friend, index) => {
          return (
            <div key={index} style={{borderBottom:"1px black solid"}}>
              <p>{friend.firstName} {friend.lastName}</p>
            </div>
          )
        })}
      </section>
    </MainContainer>
  )
}

export default Home

const MainContainer = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  height: fit-content;
  font-family: "Concert One", sans-serif;
  & h1 {
    width: 90vw;
    align-self: center;
  }
  & .recipesFeedSection {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    width: 70vw;
    background-color: rgba(211, 211, 211, 0.75);
    & h2 {
      margin: 1.25em 0em 1.25em 1.25em;
      width: 70vw;
    }
    & div {
      border-radius: 10%;
      background-color: white;
      margin-bottom: 1em;
    }
  }
  & .friendListSection {    
    display: flex;
    flex-direction: column;
    width: 20vw;
    height: 80vh;
    background-color: rgba(211, 211, 211, 0.75);
    & input {
      font-family: serif;
      font-size: 10px;
      width: 250px;
    }
    & div {
      margin-left: 0.5em;
    }
  }
  & .divFriend {
    display: flex;
    align-items: center;
    justify-content: space-around;
    & button {
      height: fit-content;
      font-size: 1em;
      font-weight: bold;
    }
  }
`