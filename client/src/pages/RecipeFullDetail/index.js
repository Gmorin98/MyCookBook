// Necessary Import
import styled from "styled-components";
import React, { useContext, useEffect, useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom'

// Component and Other Import
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";

const RecipeFullDetail = () => {
  const { loggedInUserRecipes, userID, updateRecipes } = useContext(LoggedInUserContext);
  const { _id } = useParams();  // Get the ID from the url
  const [trackError, setTrackError] = useState(null);
  const [fetchTrack, setFetchTrack] = useState(false);
  const navigate = useNavigate();

  const foundRecipe = loggedInUserRecipes.filter((recipe) => { return recipe._id === _id });

  const handleSubmit = (event) => {
    event.preventDefault();
    setFetchTrack(true);

    fetch("/deleteRecipe", {
      method: "DELETE",
      body: JSON.stringify({
        recipe_id: _id,
        user_id: userID
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
      if(trackError.status === 200) {
        setFetchTrack(false);
        updateRecipes(trackError.data);
        navigate("/mycookbook");
      }
    }
  }, [trackError])

  return (
    <MainContainer>
      <div className="contentContainer">
        <div className="functionButton">
          <NavLink to="/mycookbook" style={{cursor: "pointer"}} className={"navLink"}> {"←"} </NavLink>
          <button type="button" onClick={handleSubmit} disabled={fetchTrack} style={{cursor: "pointer"}}>Delete Recipe</button>
        </div>
        <h2>{foundRecipe[0].name}</h2>
        <h3>Preparation Time</h3>
        <div className="prepTime">
          <svg width="25" height="25" viewBox="-100 -100 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="0" cy="0" r="90" fill="#f0f0f0" stroke="#333" stroke-width="2"/>
            <g stroke="#333" stroke-width="4">
              <line x1="0" y1="-80" x2="0" y2="-70"/>
              <line x1="80" y1="0" x2="70" y2="0"/>
              <line x1="0" y1="80" x2="0" y2="70"/>
              <line x1="-80" y1="0" x2="-70" y2="0"/>
            </g>
            <line x1="0" y1="0" x2="0" y2="-50" stroke="#333" stroke-width="6"/>
            <line x1="0" y1="0" x2="30" y2="0" stroke="#333" stroke-width="4"/>
            <circle cx="0" cy="0" r="4" fill="#333"/>
          </svg>
          <p>{foundRecipe[0].prepTime}</p>
        </div>
        <section className="tagsSection">
          <h3>Tags</h3>
          {foundRecipe[0].tags.map((tag) => {
            return (
              <p key={tag}>{tag}</p>
            )
          })}
        </section>
        <section className="ingredientsSection">
          <h2>Ingredients</h2>
          <ul>
            {foundRecipe[0].ingredients.map((ingredient, index) => {
              return (
                <li key={index}>{ingredient}</li>
              )
            })}
          </ul>
        </section>
        <section className="prepSection">
          <h2>Preparations</h2>
          <ol>
            {foundRecipe[0].preparations.map((preparation, index) => {
              return (
                <li key={index}>{preparation}</li>
              )
            })}
          </ol>
        </section>
      </div>
    </MainContainer>
  )
}

export default RecipeFullDetail

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  min-height: 83vh;
  & .functionButton {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & button:last-of-type {
      height: 4vh;
      border: none;
      background-color: #dc143c;
      color: white;
      border-radius: 10%;
    }
  }
  & .navLink {
    text-decoration: none;
    color: black;
    font-size: 3em;
  }
  & .contentContainer {
    width: 85vw;
    background-color: rgba(211, 211, 211, 0.80);
    height: fit-content;
    border-radius: 5%;
    padding: 1em;
  }
  & .prepTime {
    display: flex;
    align-items: center;
    & svg {
      padding-right: 0.5em;
    }
  }
  & li {
    padding: 0.5em;
  }
`