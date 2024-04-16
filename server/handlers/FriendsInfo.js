"use strict";

const { MongoClient } = require("mongodb");
const { json } = require("express");

require("dotenv").config();
const { MONGO_URI } = process.env;

const friendsInfoHandler = async (req, res) => {
  const { friendList } = req.body;
  const client = new MongoClient(MONGO_URI);
  const db = client.db("Cook-Book");
  
  const pipeline = [
    { $match: { _id: { $in: friendList } } },
    { $project: {
        _id: 1,
        firstName: "$userInfo.firstName",
        lastName: "$userInfo.lastName",
        lastRecipe: { $slice: ["$recipesBook", -1] }
      } 
    }
  ];

  try {
    await client.connect();
    const result = await db.collection("users").aggregate(pipeline).toArray();
    res.status(200).json({
      status: 200,
      data: result,
      message: "Friends info"
    });
  } catch (error) {
    res.status(502),json({
      status: 502,
      message: error.message
    });
  } finally {
    client.close();
  }
}

module.exports = friendsInfoHandler;