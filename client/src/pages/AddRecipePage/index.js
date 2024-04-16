// Necessary Import
import styled from "styled-components";
import React, { useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";

// Component and Other Import
const TAG_OPTIONS = ["Appetizers", "Breakfasts & Brunch", "Dessert", "Lunch", "Main Dish", "Salad", "Side Dish", "Snacks", "Soup", "Stew", 
"Diabetic", "Fat-Free", "Nut-Free","Kids", "No-Gluten", "Healthy", "High Fibre", "Low Calorie", "Low Carb", "Low-Fat", "Meatless", "Vegan", "Vegetarian", 
"Spicy", "French", "Chinese", "Japanese", "Italian", "Greek", "Spanish", "Mexican", "American", "Indian"
];

const AddRecipe = () => {
  // State hooks for various inputs
  const [recipeNameInput, setRecipeNameInput] = useState("");
  const [prepTimeInput, setPrepTimeInput] = useState("");
  const [tagSelectedInput, setTagSelectedInput] = useState([]);
  const [ingredientsInput, setIngredientsInput] = useState([]);
  const [prepStepInput, setPrepStepInput] = useState([]);
  const [recipePublic, setRecipePublic] = useState(false);
  const [fetchTrack, setFetchTrack] = useState(false);
  const [trackError, setTrackError] = useState("");
  const navigate = useNavigate();

  // Context for getting userID
  const { userID, updateRecipes } = useContext(LoggedInUserContext);

  // Function to add a tag
  const addTag = (tag) => {
    if (tagSelectedInput.includes(tag)) {
      // If the tag is already selected, remove it from the array
      const newTagArray = tagSelectedInput.filter((selectedTag) => selectedTag !== tag);
      setTagSelectedInput(newTagArray);
    } else {
      // If the tag is not selected, add it to the array
      const newTagArray = [...tagSelectedInput, tag];
      setTagSelectedInput(newTagArray);
    }
  }

  const addInputIngredient = () => {
    // Add extra inputs in they array for the Ingredients
    const values = [...ingredientsInput];
    values.push("");
    setIngredientsInput(values);
  }

  const addInputPreparation = () => {
    // Add extra inputs in they array for the Preparation
    const values = [...prepStepInput];
    values.push("");
    setPrepStepInput(values);
  }

  // Function to handle form submission
  const handleSumbit = (event) => {
    event.preventDefault();
    setFetchTrack(true);

    fetch("/addrecipe", {
      method: "POST",
      body: JSON.stringify({
        _id: userID,
        name: recipeNameInput,
        prepTime: prepTimeInput,
        tags: tagSelectedInput,
        preparations: prepStepInput,
        ingredients: ingredientsInput,
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
      if(trackError.status === 201) {
        setFetchTrack(false);
        updateRecipes(trackError.data);
        navigate("/mycookbook");
      }
    }
  }, [trackError]);

  // Functions to update input values
  const getRecipeNameInput = (event) => setRecipeNameInput(event.target.value);
  const getPrepTimeInput = (event) => setPrepTimeInput(event.target.value);

  return (
    <MainContainer>
      <div className="contentContainer">
      <NavLink to="/mycookbook" style={{cursor: "pointer"}} className={"navLink"}> {"←"} </NavLink>
        <h1>Add a recipe!</h1>
        <form onSubmit={handleSumbit}>
          <div className="generalInfo">
            <label htmlFor="recipeName">Recipe Name</label>
            <input id="recipeName" name="recipeName" type="text" onChange={getRecipeNameInput} value={recipeNameInput} required/>
            <label htmlFor="prepTime">Preparation Time</label>
            <input id="prepTime" name="prepTime" type="text" onChange={getPrepTimeInput} value={prepTimeInput} required/>
            <section className="tagSection" id="tagSection">
              {TAG_OPTIONS.map((tag) => (
                <TagButton type="button" key={tag} selected={tagSelectedInput.includes(tag)} onClick={() => addTag(tag)}>{tag}</TagButton>
              ))}
            </section>
          </div>
          <section id="ingredientSection" className="ingredientSection">
            <h2>Ingredients</h2>
            <ul id="ingredientList">
              {ingredientsInput.map((ingredient, index) => (
                <li key={index}>
                  <input type="text" value={ingredient.value} onChange={(event) => {
                      const values = [...ingredientsInput]; // Copy the old array
                      values[index] = event.target.value; // Modify the value at the index position
                      setIngredientsInput(values); // Set the new array as the main one
                    }}
                  />
                  <button type="button" className="deleteButton" onClick={() => {
                    const values = [...ingredientsInput]; // Copy the old array
                    values.splice(index, 1); // Remove the unwanted data from the old array
                    setIngredientsInput(values); // Set the new array as the main
                  }}>X</button>
                </li>
              ))}
            </ul>
            <button type="button" onClick={addInputIngredient}>+</button>
          </section>
          <section id="preparationSection" className="preparationSection">
            <h2>Preparation</h2>
            <ol id="preparationList">
            {prepStepInput.map((ingredient, index) => (
                <li key={index}>
                  <input type="text" className="inputPreparation" value={ingredient.value} onChange={(event) => {
                      const values = [...prepStepInput];
                      values[index] = event.target.value;
                      setPrepStepInput(values);
                    }}
                  />
                  <button type="button" className="deleteButton" onClick={() => {
                    const values = [...prepStepInput];
                    values.splice(index, 1);
                    setPrepStepInput(values);
                  }}>X</button>
                </li>
              ))}
            </ol>
            <button type="button" onClick={addInputPreparation}>+</button>
          </section>
          <button type="submit" disabled={fetchTrack} className="buttonSubmit">Add Recipe!</button>
        </form>
      </div>
    </MainContainer>
  );
}

export default AddRecipe;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 83vh;
  width: 80vw;
  margin: auto;
  & .navLink {
    font-size: 2em;
    text-decoration: none;
    color: black;
  }
  & .contentContainer {
    background-color: rgba(211, 211, 211, 0.80);;
    height: fit-content;
    border-radius: 5%;
    padding: 1em;
  }
  & button {
    cursor: pointer;
  }
  & .deleteButton {
    font-weight: bold;
    background-color: #dc143c;
    color: white;
    border: none;
    padding: 0.22em;
  }
  & .generalInfo {
    display: flex;
    flex-direction: column;
    & input {
      width: 25vw;
      margin-bottom: 1em;
    }
    & input:last-of-type {
      width: 10vw;
    }
    & section {
      display: flex;
      flex-direction: row;
      align-content: center;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  & .ingredientSection,
  .preparationSection {
    margin-left: 1.5em;
    & button {
      border: none;
    }
  }
  & .inputPreparation {
    width: 70vw;
  }
  & .buttonSubmit {
    margin-top: 3em;
    margin-left: 1.5em;
    padding: 0.5em;
    border-radius: 15%;
    border: none;
  }
`

const TagButton = styled.button`
  background-color: ${props => props.selected ? "white" : "none"};
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;