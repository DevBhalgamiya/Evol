import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Auth from "./components/Auth.jsx";
import Home from "./pages/Home.jsx";
import Notes from "./components/Notes.jsx";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        ) : (
          <Auth />
        )}
      </div>
    </Router>
  );
}

export default App;
