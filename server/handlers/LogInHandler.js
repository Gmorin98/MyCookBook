"use strict";

const { MongoClient } = require("mongodb");
const { json } = require("express");

require("dotenv").config();
const { MONGO_URI } = process.env;

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  const client = new MongoClient(MONGO_URI);
  const db = client.db("Cook-Book");

  try {
    await client.connect();
    const foundUser = await db.collection("users").findOne({ "userInfo.email" : email });
    
    if(!foundUser) {
      res.status(404).json({
        status: 404,
        message: `No email associated with ${email}.`
      });
    } else {
      if(foundUser.userInfo.password !== password) {
        res.status(400).json({
          status: 400,
          message: `Invalid password.`
        })
      } else {
        res.status(200).json({
          status: 200,
          message: `You in my dude/dudette`,
          _id: foundUser._id,
          userInfo: foundUser.userInfo,
          userRecipeBook: foundUser.recipesBook
        })
      }
    }
  } catch (error) {
    res.status(502),json({
      status: 502,
      message: error.message
    });
  } finally {
    client.close();
  }
}

module.exports = loginHandler;