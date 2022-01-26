import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Site from "./pages/site";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/site/:sitename" element={<Site />} />
      </Routes>
    </Router>
  );
}

export default App;
