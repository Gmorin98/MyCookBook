// Necessary Import
import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Component and Other Import
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import ErrorContainer from "./ErrorContainer";

const LogInPage = () => {
  // Necessary Variables
  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [fetchTrack, setFetchTrack] = useState(false);
  const [trackError, setTrackError] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { logIn, loggedInUserRecipes } = useContext(LoggedInUserContext);

  const handleSumbit = (event) => {
    event.preventDefault();
    setFetchTrack(true);

    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        email: loginInput,
        password: passwordInput
      }),
      headers: {
        "Content-type" : "application/json"
      }
    })
    .then(response => response.json())
    .then(data => setTrackError(data))
  };

  useEffect(() => {
    setFetchTrack(false);

    if(trackError !== null) {
      if(trackError.status > 201) {
        setError(true);
      } else if(trackError.status === 200) {
        setError(false);
        logIn(trackError);
        navigate("/");
      }
    }
  }, [trackError])

  const getLoginInput = (event) => setLoginInput(event.target.value);
  const getPasswordInput = (event) => setPasswordInput(event.target.value);

  return (
    <MainContainer>
      <div className="contentContainer">
        <form onSubmit={handleSumbit}>
          <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" onChange={getLoginInput} value={loginInput} required/>
          <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" onChange={getPasswordInput} value={passwordInput} required/>
          <button type="submit" disabled={fetchTrack ? true : false} >{fetchTrack ? "Loggin in..." : "Log In"}</button>
        </form>
        {
          <>
            {error && <ErrorContainer message={trackError.message}/>}
          </>
        } 
        <div>
          <NavLink to="/signin" className="signinLink" style={{textDecoration: "none"}}>Need an account? Register</NavLink>
        </div>
      </div>
    </MainContainer>
  );
};

export default LogInPage;

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  & .contentContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 20vw;
    height: fit-content;
    padding: 1em 0em;
    border-radius: 10%;
    background-color: lightgray;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -6px 0px inset; // Original 0px -3px 0px on the last one
  }
  & form {
    display: flex;
    flex-direction: column;
    & input {
      margin-bottom: 1em;
    }
    & button{
      width: 7vw;
      align-items: center;
      margin: auto;
      margin-bottom: 1em;
      border: none;
      cursor: pointer;
    }
    & button:hover {
      background-color: white;
    }
  }
  & .signinLink {
    color: black;
  }
  & .errorContainer {
    width: 15vw;
    & p {
      color: red;
    }
  }
`;
