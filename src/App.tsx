import React from "react";
import { BreedList } from './features/breedList/BreedList';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <BreedList />
        </Router>
      </header>
    </div>
  );
}

export default App;
