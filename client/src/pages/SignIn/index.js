// Necessary Import
import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// Component and Other Import
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";

const SignIn = () => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [fetchTrack, setFetchTrack] = useState(false);
  const [trackError, setTrackError] = useState(null);
  const { logIn } = useContext(LoggedInUserContext);
  const navigate = useNavigate();

  const handleSumbit = (event) => {
    event.preventDefault();
    setFetchTrack(true);

    fetch("/signin", {
      method: "POST",
      body: JSON.stringify({
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        password: passwordInput,
      }),
      headers: {
        "Content-type" : "application/json"
      }
    })
    .then(response => response.json())
    .then(data => setTrackError(data))
  }

  useEffect(() => {
    setFetchTrack(false);
    if(trackError !== null) {
      if(trackError.status >= 300) {
        console.log(trackError)
      } else if(trackError.status <= 205) {
        console.log(trackError.data);
        logIn(trackError.data);
        navigate("/");
      }
    }
  }, [trackError])

  // Army of get the value of whatever has been entered in the input HTML.
  const getFirstNameInput = (event) => setFirstNameInput(event.target.value);
  const getLastNameInput = (event) => setLastNameInput(event.target.value);
  const getEmailInput = (event) => setEmailInput(event.target.value);
  const getPasswordInput = (event) => setPasswordInput(event.target.value);
  const getConfirmPasswordInput = (event) => setConfirmPasswordInput(event.target.value);

  return (
    <MainContainer>
      <div className="contentContainer">
        <form onSubmit={handleSumbit}>
          <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" onChange={getFirstNameInput} value={firstNameInput} required/>

          <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" onChange={getLastNameInput} value={lastNameInput} required/>

          <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" onChange={getEmailInput} value={emailInput} required/>

          <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" onChange={getPasswordInput} value={passwordInput} required/>

          <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" onChange={getConfirmPasswordInput} value={confirmPasswordInput} required/>

          <button type="submit" disabled={fetchTrack}>Sign up</button>
        </form>
        <div>  
          <Link to="/login" style={{textDecoration: "none", color: "black"}}>Already have an account?</Link>
        </div>
      </div>
    </MainContainer>
  );
};

export default SignIn;

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
    height: 45vh;
    padding: 1em 0em;
    background-color: lightgray;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -6px 0px inset;
    border-radius: 10%;
  }
  & form {
    display: flex;
    flex-direction: column;
    & input {
      margin-bottom: 2em;
    }
  }
  & button {
    border: none;
    cursor: pointer;
  }
  & button:hover {
    background-color: white;
  }
`;
