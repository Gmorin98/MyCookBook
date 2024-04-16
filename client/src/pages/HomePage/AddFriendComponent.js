// Necessary Import
import styled from "styled-components";
import React, { useState, useEffect, useContext } from 'react';

// Component and Other Import
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";

const AddFriendComponent = () => {
  const [addFriendInput, setAddFriendInput] = useState("");
  const [fetchTrack, setFetchTrack] = useState(false);
  const [trackError, setTrackError] = useState(null);
  const { userID } = useContext(LoggedInUserContext);

  // Function to handle form submission
  const handleSumbit = (event) => {
    event.preventDefault();
    setFetchTrack(true);

    fetch("/addFriend", {
      method: "POST",
      body: JSON.stringify({
        _idFriend: addFriendInput,
        _idUser: userID
      }),
      headers: {
        "Content-type" : "application/json"
      }
    })
    .then(response => response.json())
    .then(data => setTrackError(data))
  }

  useEffect(() => {
    if(trackError !== null) {
      setFetchTrack(false);
      console.log(trackError.message);
    }
  }, [trackError]);

  const getAddFriendInput = (event) => setAddFriendInput(event.target.value);

  return (
    <MainContainer>
      <label htmlFor="friendCode">Please enter your friend code</label>
      <input id="friendCode" name="friendCode" type="text" onChange={getAddFriendInput} value={addFriendInput} placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" />
      <button type="submit" disabled={fetchTrack} onClick={handleSumbit}>Add Friend!</button>
    </MainContainer>
  )
}

export default AddFriendComponent

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20vw;
  & input {
    margin: 1em 0em;
  }
  & button {
    border: none;
    cursor: pointer;
    padding: 0.25em;
  }
`