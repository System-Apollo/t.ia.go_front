import React from 'react';
import '../src/styles/App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import TesteGratis from './pages/TesteGratis';
import IA from './pages/ia'; // Certifique-se de que o caminho está correto
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
          <Route path="/login" element={<Login />} />
          <Route path="/teste-gratis" element={<TesteGratis />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
