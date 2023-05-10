import React, { useState } from 'react';
import {
  FormControl,
  Form,
  Card,
} from "react-bootstrap";

function LoginModal(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const logUserIn = (event) => {
    event.preventDefault();
    const userDetails = {
      "username": username,
      "password": password
    };

    fetch(`/login`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails)
    })
      .then((response) => response.json())
      .then(data => {
        if ('error' in data) {
          console.log('Login backend error: ' + data['error']);
        } else {
          // localStorage.setItem("userId", data["user_id"])
          // localStorage.setItem("username", data["username"])

          props.setUserLoggedIn({ userId: data["user_id"], username: data["username"] });
        }
      })
      .catch(error => console.log("Login Error: " + error));
    props.onClose();
  };

  return (
    <Card style={{ padding: "2rem" }}>
      <h3>Sign In</h3>
      <Form action="/login" onSubmit={logUserIn}>
        <p>
          <FormControl type="text" id="login-username" name="username" placeholder="Your username/email" onChange={handleUsernameChange} required />
        </p>
        <p>
          <FormControl type="password" id="login-password" name="password" placeholder="Your password" onChange={handlePasswordChange} required />
        </p>
        <p>
          <button className="btn btn-primary" type="submit">Login</button>
        </p>
      </Form>
    </Card>
  );
}

export default LoginModal;