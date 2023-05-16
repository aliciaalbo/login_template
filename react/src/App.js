import React, { useState } from 'react';
import TopNavBar from './topNavBar';
import OpenModal from './openModal';
import './App.css';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState({ userId: null, username: null });
  const [onModal, setOnModal] = useState('');
  return (
    <div className="App">
      <TopNavBar setOnModal={setOnModal} userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
      {onModal !== "" &&
        <OpenModal onModal={onModal} setOnModal={setOnModal} userLoggedIn={userLoggedIn} />}
    </div>
  );
}

export default App;
