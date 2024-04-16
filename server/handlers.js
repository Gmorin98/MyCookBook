const loginHandler = require("./handlers/LogInHandler");
const createAccountHandler = require("./handlers/CreateAccountHandler");
const addNewRecipeHandler = require("./handlers/AddNewRecipeHandler");
const addFriendHandler = require("./handlers/AddFriend");
const deleteRecipeHandler = require("./handlers/DeleteRecipe");
const friendsInfoHandler = require("./handlers/FriendsInfo")

module.exports = {
  loginHandler,
  createAccountHandler,
  addNewRecipeHandler,
  addFriendHandler,
  deleteRecipeHandler,
  friendsInfoHandler
}