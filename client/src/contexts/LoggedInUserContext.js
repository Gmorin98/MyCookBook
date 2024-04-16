// Necessary Import
import React from "react";
import { useState } from "react";

export const LoggedInUserContext = React.createContext();

const LoggedInUserProvider = ({children}) => {
  const [loggedInUserInfo, setLoggedInUserInfo] = useState(null);
  const [loggedInUserRecipes, setLoggedInUserRecipes] = useState(null);
  const [userID, setUserID] = useState(null);
  
  const logIn = (user) => {;
    setLoggedInUserInfo(user.userInfo);
    setLoggedInUserRecipes(user.userRecipeBook);
    setUserID(user._id);
  }
  
  const logOut = () => {
    setLoggedInUserInfo(null);
    setLoggedInUserRecipes(null);
    setUserID(null);
  }

  const updateRecipes = (newRecipeArray) => {
    setLoggedInUserRecipes(newRecipeArray);
  }

  return (
    <LoggedInUserContext.Provider value={{loggedInUserInfo, loggedInUserRecipes, userID, logIn, logOut, updateRecipes}}>
      {children}
    </LoggedInUserContext.Provider>
  )
}

export default LoggedInUserProvider