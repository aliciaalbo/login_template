import React from 'react'
import RegisterOrLogin from './registerOrLogin';

function TopNavBar(props) {

    const logOut = () => {
        fetch("/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then(data => {
                props.setUserLoggedIn({ userId: null, username: null });
                localStorage.clear();
            })
    }

    const handleClick = (onModal, e) => {
        e.preventDefault();
        if (onModal === 'logout') {
            logOut();
        } else {
            props.setOnModal(onModal);
        }
    }

    return (
        <div>
            {props.userLoggedIn.userId ?
                <div>
                    <div>My Account Info</div>
                    <div>Logout</div>
                </div>
                : <RegisterOrLogin userLoggedIn={props.userLoggedIn} setUserLoggedIn={props.setUserLoggedIn} />
            }
        </div>
    )
}

export default TopNavBar
