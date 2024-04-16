const {
  loginHandler,
  createAccountHandler,
  addNewRecipeHandler,
  addFriendHandler,
  deleteRecipeHandler,
  friendsInfoHandler,
} = require("./handlers");

const router = require("express").Router();

router.post("/login", loginHandler);
router.post("/signin", createAccountHandler);
router.post("/addrecipe", addNewRecipeHandler);
router.post("/addFriend", addFriendHandler);
router.post("/getFriendsInfo", friendsInfoHandler)

router.delete("/deleteRecipe", deleteRecipeHandler);

module.exports = router;