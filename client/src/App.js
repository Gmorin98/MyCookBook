// Necessary Import
import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from "react-router-dom";

// Component Import
import NavigationBar from "./pages/Other/NavigationBar";
import Home from "./pages/HomePage";
import MyCookBook from "./pages/MyCookBookPage";
import RecipeFullDetail from "./pages/RecipeFullDetail"
import AddRecipe from "./pages/AddRecipePage";
import LogInPage from "./pages/LogInPage";
import SignIn from "./pages/SignIn";
import Profile from "./pages/ProfilePage/Profile";

import Footer from "./pages/Other/Footer";

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/mycookbook" element={<MyCookBook />} />
        <Route path="/mycookbook/:_id" element={<RecipeFullDetail />} />
        <Route path="/mycookbook/addrecipe" element={<AddRecipe />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Switch>
      <Footer />
    </Router>
  )
};

export default App;