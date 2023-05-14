import React from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";
import LoginModal from "./loginModal";
import CreateAccount from "./createAccount";

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
                            <LoginModal userLoggedIn={props.userLoggedIn} setUserLoggedIn={props.setUserLoggedIn} />
                        </Col>
                        <Col>
                            <CreateAccount userLoggedIn={props.userLoggedIn} setUserLoggedIn={props.setUserLoggedIn} />
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
}

export default RegisterOrLogin