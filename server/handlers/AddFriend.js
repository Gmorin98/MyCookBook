"use strict";

const { MongoClient } = require("mongodb");
const { json } = require("express");

require("dotenv").config();
const { MONGO_URI } = process.env;

const addFriend = async (req, res) => {
  const { _idFriend, _idUser } = req.body;
  const client = new MongoClient(MONGO_URI);
  const db = client.db("Cook-Book");

  try {
    await client.connect();
    const foundFriend = await db.collection("users").findOne({"_id": _idFriend}, {projection : {userInfo: {password: 0, friendList: 0}}});
    const foundUser = await db.collection("users").findOne({"_id": _idUser});

    if (foundFriend && foundUser) {
      if (foundUser.userInfo.friendList.includes(_idFriend)) {
        res.status(400).json({
          status: 400,
          message: "You already bestie with them! Already Friends",
        });
      } else {
        const result = await db.collection("users").updateOne({ "_id": _idUser}, { $push: { "userInfo.friendList": _idFriend} });
  
        if (result.modifiedCount === 1) {
          res.status(201).json({
            status: 201,
            data: foundFriend,
            message: "I found you, my friend",
          });
        }
      }
    } else {
      res.status(400).json({
        status: 400,
        data: foundFriend,
        message: "Tryin to be friend with a ghost?",
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

module.exports = addFriend;