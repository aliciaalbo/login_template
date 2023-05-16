import React, { useState } from 'react';
import {
  FormControl,
  Form,
  Card,
} from "react-bootstrap";

function LoginUser(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const logUserIn = (e) => {
    e.preventDefault();
    const userDetails = {
      "username": username,
      "password": password
    };

    fetch(`/api/login_user`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails)
    })
      .then((response) => response.json())
      .then(data => {
        if ("error" in data) {
          alert(data["error"]);
        } else {
          props.setUserLoggedIn({ userId: data["user_id"], username: data["username"] });
          alert(data["success"]);
        }
      })
      .catch(error => console.log("Login Error: " + error));
    props.onClose();
  };

  return (
    <Card style={{ padding: "2rem" }}>
      <h3>Sign In</h3>
      <Form onSubmit={logUserIn}>
        <p>
          <FormControl type="text" id="login-username" name="username" placeholder="Your username / email" onChange={handleUsernameChange} required />
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

export default LoginUser;