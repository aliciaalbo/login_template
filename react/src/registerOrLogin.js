import React from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";
import LoginUser from "./loginUser";
import RegisterUser from "./registerUser";

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
                <Container>
                    <Row>
                        <Col>
                            <LoginUser userLoggedIn={props.userLoggedIn} setUserLoggedIn={props.setUserLoggedIn} onClose={handleClose} />
                        </Col>
                        <Col>
                            <RegisterUser userLoggedIn={props.userLoggedIn} setUserLoggedIn={props.setUserLoggedIn} onClose={handleClose} />
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
}

export default RegisterOrLogin