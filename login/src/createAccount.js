import React, { useState } from "react";
import {
    Card,
    Form,
    FormControl,
    Button
} from "react-bootstrap";

function CreateAccount() {
    const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function newUser(e) {
        e.preventDefault();

        const newUserDetails = {
            "username": username,
            // "email": email,
            "password": password
        }

        fetch("/users", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(newUserDetails),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                if ("error" in data) {
                    alert(data["error"]);
                }
                else {
                    alert("Your account has been created!");
                }
            });
    };

    return (
        <Card style={{ padding: "2rem" }}>
            <h3>Create an Account</h3>

            <Form onSubmit={newUser}>
                <p>
                    <FormControl type="text" placeholder="enter a username" id="username" onChange={(e) => setUsername(e.target.value)} required />
                </p>
                {/*
                <p>
                    <FormControl type="text" placeholder="janedoe@text.com" id="email" onChange={(e) => setEmail(e.target.value)} required />
                </p>
                */}

                <p>
                    <FormControl type="password" placeholder="Up to 20 characters" name="password" onChange={(e) => setPassword(e.target.value)} required />
                </p>
                <Button className="button" type="submit">Register</Button>
            </Form>
        </Card>
    );
}


export default CreateAccount;