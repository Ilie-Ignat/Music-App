import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Artists from "./components/Artists/Artists";
import Songs from "./components/Songs/Songs";
import Albums from "./components/Albums/Albums";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/albums" element={<Albums />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
