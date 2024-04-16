"use strict";

const { MongoClient } = require("mongodb");
const { json } = require("express");

require("dotenv").config();
const { MONGO_URI } = process.env;

const deleteRecipe = async (req, res) => {
  const { recipe_id, user_id  } = req.body;
  const client = new MongoClient(MONGO_URI);
  const db = client.db("Cook-Book");

  try {
    await client.connect();

    const filterID = { _id: user_id};
    const recipeToDelete = { $pull: { recipesBook: { _id : recipe_id } } };
    const foundUser = await db.collection("users").findOne({ _id: user_id });

    if(foundUser) {
      const result = await db.collection("users").updateOne(filterID, recipeToDelete);
      if(result.modifiedCount === 1) {
        // This is to send back the new array with the right recipes after the delete
        const updatedUserRecipeBook = await db.collection("users").findOne({ _id: user_id });
        res.status(200).json({
          status: 200,
          data: updatedUserRecipeBook.recipesBook,
          message: "Recipe has been thrown into the void"
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "Couldn't find the recipe in the user Database"
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        message: "User not found, he a ghost"
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    });
  } finally {
    client.close();
  }
}

module.exports = deleteRecipe;