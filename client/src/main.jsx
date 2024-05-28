import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import NotFoundPage from './pages/NotFoundPage.jsx';
import App from './App.jsx';
import CardsList from './pages/CardsListPage.jsx';
import CardsCreate from './pages/CardsCreatePage.jsx';
import CardsQuizz from './pages/CardsQuizzPage.jsx';
import extend_theme from './utils/chakra-theme.js';
import './index.css';

const theme = extendTheme(extend_theme);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="cards" replace />}/>
            <Route path="cards" element={<CardsList />} />
            <Route path="cards/create" element={<CardsCreate />} />
            <Route path="cards/quizz" element={<CardsQuizz />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);