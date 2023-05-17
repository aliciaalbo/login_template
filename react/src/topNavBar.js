import React from 'react'
import { Button } from "react-bootstrap"
import { JSON_FETCH_HEADERS } from './constants'
import RegisterOrLogin from './registerOrLogin'

function TopNavBar(props) {
    const logoutUser = () => {
        fetch(`/api/logout_user`, {
            method: "post",
            headers: JSON_FETCH_HEADERS,
            body: JSON.stringify({ userId: props.userLoggedIn.userId })
        })
            .then((response) => response.json())
            .then(data => {
                if ("error" in data) {
                    alert(data["error"])
                } else {
                    props.setUserLoggedIn({ userId: null, username: null })
                    // localStorage.clear()
                    alert(data["success"])
                }
            })
            .catch(error => alert("Login Error: " + error))
    }

    return (
        <div>
            {props.userLoggedIn.userId ?
                <div>
                    {props.userLoggedIn.username} - <Button className="btn btn-primary" onClick={logoutUser}>Logout</Button>
                </div>
                : <RegisterOrLogin userLoggedIn={props.userLoggedIn} setUserLoggedIn={props.setUserLoggedIn} />
            }
        </div>
    )
}

export default TopNavBar
