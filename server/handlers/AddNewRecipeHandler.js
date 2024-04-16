"use strict";

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const { json } = require("express");

require("dotenv").config();
const { MONGO_URI } = process.env;

const addNewRecipeHandler = async (req, res) => {
  const { _id, name, prepTime, tags, preparations, ingredients, recipePublic } = req.body;
  const client = new MongoClient(MONGO_URI);
  const db = client.db("Cook-Book");

  try {
    await client.connect();
    const newRecipe = { 
      $push: {
        recipesBook: {
          _id: uuidv4(),
          name: name,
          prepTime: prepTime,
          tags: tags,
          ingredients: ingredients,
          preparations: preparations,
          recipePublic: recipePublic
        }
      }
    }
    const result = await db.collection("users").updateOne({ _id }, newRecipe);
    if (result.modifiedCount === 1) {
      // This is to send back the new array with the right recipes after the delete
      const updatedUserRecipeBook = await db.collection("users").findOne({ _id: _id });
      res.status(201).json({
        status: 201,
        data: updatedUserRecipeBook.recipesBook,
        message: "I will keep this recipe forever.",
      });
    } else {
      res.status(400).json({
        status: 400,
        data: newRecipe,
        message: "Didn't work :/",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(502),json({
      status: 502,
      message: error.message
    });
  } finally {
    client.close();
  }
}

module.exports = addNewRecipeHandler;