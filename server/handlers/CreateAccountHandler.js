"use strict";

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const { json } = require("express");

require("dotenv").config();
const { MONGO_URI } = process.env;

const createAccountHandler = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const client = new MongoClient(MONGO_URI);
  const db = client.db("Cook-Book");

  try {
    await client.connect();
    const foundUser = await db.collection("users").findOne({ email });

    // If Email isn't found in the DB, we go ahead and create and new entry
    if(!foundUser) {
      const newUser = {
        _id: uuidv4(),
        userInfo: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          friendList: []
        },
        recipesBook: []
      }
      await db.collection("users").insertOne(newUser);
      res.status(201).json({
        status: 201,
        data: newUser,
        message: "You are now part of the Thousand Sunny Pirate Crew!!"
      })
    } else {
      // Return that the email is already in the DB
      res.status(400).json({
        status: 400,
        message: `Account already associated with ${email}.`
      });
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

module.exports = createAccountHandler;