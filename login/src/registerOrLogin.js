import React from 'react'
import Login from "./login";
// import CreateAccount from "./createAccount";

function RegisterOrLogin(props) {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="ml-auto">
                <Button className="float-right" variant="primary" onClick={handleShow}>
                    Sign In / Sign Up
                </Button>
            </div>

            {show && (
                <Login userLoggedIn={props.userLoggedIn} setUserLoggedIn={props.setUserLoggedIn} />
                {/* <CreateAccount userLoggedIn={props.userLoggedIn} setUserLoggedIn={props.setUserLoggedIn} /> */}
            )}
        </>
    );
}

export default RegisterOrLogin