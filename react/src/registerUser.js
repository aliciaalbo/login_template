import React, { useState } from "react";
import {
    Card,
    Form,
    FormControl,
    Button
} from "react-bootstrap";

function RegisterUser(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const createNewUser = (e) => {
        e.preventDefault();
        const userDetails = {
            "username": username,
            "password": password
        }

        fetch(`/api/register_user`, {
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
            <h3>Create an Account</h3>

            <Form onSubmit={createNewUser}>
                <p>
                    <FormControl type="text" id="register-username" name="username" placeholder="enter a username" onChange={handleUsernameChange} required />
                </p>
                <p>
                    <FormControl type="password" id="register-password" name="password" placeholder="enter a password" onChange={handlePasswordChange} required />
                </p>
                <Button className="btn btn-primary" type="submit">Register</Button>
            </Form>
        </Card>
    );
}


export default RegisterUser;