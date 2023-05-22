import React, { useState, useEffect } from 'react'
import TopNavBar from './topNavBar'
import './App.css'

function App() {

  function handleCallbackResponse(response) {
    console.log("Encoded JWF ID token: " + response.credential)

  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "451475209024-85k465aqaql0jb97467aa7n0flmrjngi.apps.googleusercontent.com"
      callback: handleCallbackResponse
    })
    }, []);

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline, size: "large}
    )

  const [userLoggedIn, setUserLoggedIn] = useState({ userId: null, username: null })
  return (
    <div className="App">
      <div id="signInDiv"></div>
      <TopNavBar userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
    </div>
  )
}

export default App
