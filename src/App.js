import React from 'react';
import MainScreen from './views/MainScreen';
import './App.css';
import { StoreProvider } from './store';

function App() {
  return (
    <StoreProvider>
      <MainScreen />
    </StoreProvider>
  );
}

export default App;
