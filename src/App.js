import React from 'react';
import Task from "./components/Task.js"
import Thoughts from "./components/thoughts.js"
import './App.css'


function App() {
  return (
    <div className="app">
      <Task />
      <Thoughts />
    </div>
  );
}

export default App;