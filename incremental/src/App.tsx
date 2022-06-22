import React from 'react';
import logo from './logo.svg';
import Header from './components/Header'
import ClickerButton from './components/ClickerButton';
import UpgradeContainer from './components/UpgradeContainer';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <ClickerButton />
      <UpgradeContainer />
    </div>
  )
}

export default App;
