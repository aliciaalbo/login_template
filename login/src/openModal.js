import React from "react";
import { Modal, Container } from 'react-bootstrap';
// import UpdateAccount from "./updateAccount";

function OpenModal(props) {
    const handleClose = () => props.setOnModal("");

    return (
        <Modal
            show={true}
            onHide={handleClose}
            fullscreen={false}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    My Account
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container>
                    {/* {props.onModal === "accountinfo" ? <UpdateAccount userLoggedIn={props.userLoggedIn} /> : null} */}
                </Container>
            </Modal.Body>
        </Modal>
    );
}

export default OpenModal