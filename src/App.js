import React from "react";
import { useEffect, useState } from "react";
import './css/App.css';
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./component/navbar";
import Home from "./page/home";
import Mood from "./page/mood";
import Community from "./page/communityForum";
import Music from "./page/music";
import Support from "./page/support";
import Signup from "./page/signup";
import About from './page/about';
import Feature from './page/feature';
import Profile from './page/profile';

{/*
function section(content){
  return (
    <div className="section-app">
      <p>{content}</p>
    </div>
  );
}
*/}

function App() {
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/quotes/")
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data);
        setQuotes(data);
      })
      .catch(error => console.error("Error fetching quotes:", error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/*before login*/}
          <Route path="/about" element={<About />}></Route>
          <Route path="/feature" element={<Feature />}></Route>
          <Route path="/signup" element={<Signup />}></Route>

          {/*after login*/}
          <Route path="/" element={<Home />}></Route>
          <Route path="/mood" element={<Mood />}></Route>
          <Route path="/community" element={<Community />}></Route>
          <Route path="/support" element={<Support />}></Route>
          <Route path="/music" element={<Music />}></Route>
          <Route path="/profile" element={<Profile />}></Route>

        </Routes>
      </div>

      {/*<div>
        <h1>Quotes</h1>
        <ul>
          {quotes.map((quote, index) => (
            <li key={index}>{quote.text}</li>  // Change `quote.text` to match your API
          ))}
        </ul>
      </div>
      */}
    </>


  );
}

export default App;
