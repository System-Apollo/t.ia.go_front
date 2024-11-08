import React from 'react';
import '../src/styles/App.css'
import Home from './home';
import Login from './login';
import TesteGratis from './testeGratis';
import IA from './ia';
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
          <Route path="/testeGratis" element={<TesteGratis />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
