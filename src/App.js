import React from 'react';
import './App.css';
import Home from './Home/Home';
import IA from './IA/ia'; // Certifique-se de que o caminho está correto
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Tela inicial */}
          <Route path="/ia" element={<IA />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
