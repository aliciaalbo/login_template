import React, { useState } from 'react'
import TopNavBar from './topNavBar'
import './App.css'

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState({ userId: null, username: null })
  return (
    <div className="App">
      <TopNavBar userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
    </div>
  )
}

export default App
