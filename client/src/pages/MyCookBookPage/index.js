// Necessary Import
import styled from "styled-components";
import React, { useContext, useState } from 'react';
import { NavLink, Navigate } from "react-router-dom";

// Component and Other Import
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import FavoriteButton from "../Other/FavoriteButton";

const MyCookBook = () => {
  const { loggedInUserRecipes, userID } = useContext(LoggedInUserContext);

  if (!userID) return <Navigate to="/login" />

  return (
    <MainContainer>
      <NavLink to="/mycookbook/addrecipe" className={"addRecipe"} >
        +
      </NavLink>
      {loggedInUserRecipes.map((recipe) => {
        return (
          <div className="recipeDiv">
            <FavoriteButton className="favoriteButton"/>
            <NavLink to={`/mycookbook/${recipe._id}`} style={{textDecoration: "none"}}>
              <section key={recipe._id}>
                <h2>{recipe.name}</h2>
                <div className="recipeInfo">
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
                  <p>{recipe.prepTime}</p>
                  <p>Ingredients Needed : {recipe.ingredients.length}</p>
                  <p>Steps : {recipe.preparations.length}</p>
                </div>
                <div className="allTags">
                  {recipe.tags.map((tag, index) => {
                    return <p key={index}>{tag}</p>
                  })}
                </div>
              </section>
            </NavLink>
          </div>
        )
      })}
    </MainContainer>
  )
}

export default MyCookBook

const MainContainer = styled.main`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  min-height: 83vh;
  & .recipeDiv > a,
  .addRecipe {
    color: black;
  }
  & .recipeDiv {
    display: flex;
    width: 30vw;
    height: fit-content;
    background-color: lightgray;
    border-radius: 5%;
    margin: 0.5em;
    padding: 2em 0em;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -6px 0px inset;
    & h2,
    .favoriteButton {
      margin-top: 0;
    }
    & .recipeInfo {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: fit-content;
      margin-bottom: 1em;
      & p {
        width: fit-content;
        margin-right: 1em;
        padding-right: 1em;
        border-right: solid 1px black;
      }
    }
  }
  & .addRecipe {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10em;
    text-decoration: none;
    height: 23vh;
    width: 20vw;
    background-color: lightgray;
    border-radius: 5%;
    margin: 0.05em;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -6px 0px inset;
  }
  & .allTags {
    display: flex;
    flex-direction: row;
    & p {
      border: solid black 1px;
      border-radius: 10%;
      margin: 0;
      padding: 0.5em;
      margin-right: 1em;
      background-color: white;
    }
  }
`