import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import Home from "./pages/home";
import Site from "./pages/site";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/site" element={<Site />} />
      </Routes>
    </Router>
  );
}

export default App;
