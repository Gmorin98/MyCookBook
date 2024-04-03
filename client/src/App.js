// Necessary Import
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";

// Component Import


const App = () => {
  return (
    <h1>My Cook Book!</h1>
  )
};

export default App;


// EXEMPLE
// return (
//   <Router>
//     <NavBar />
//     <Switch>
//       <Route path="/" element={<Home />} />
//       <Route path="/products" element={<ProductsShowcase />} />
//       <Route path="/cart" element={<CartPage />} />
//     </Switch>
//   </Router>
// );