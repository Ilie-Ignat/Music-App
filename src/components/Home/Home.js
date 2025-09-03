import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Music Application</h1>
      <nav>
        <ul>
          <li>
            <Link to="/artists">Artists</Link>
          </li>
          <li>
            <Link to="/albums">Albums</Link>
          </li>
          <li>
            <Link to="/songs">Songs</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
