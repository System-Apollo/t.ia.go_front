import React from 'react';
import './App.css';
import Home from './Components/Home/Home';
import IA from './Components/IA/ia'; // Certifique-se de que o caminho está correto
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Tela inicial */}
        <Route path="/ia" element={<IA />} />
      </Routes>
    </Router>
  );
}

export default App;
