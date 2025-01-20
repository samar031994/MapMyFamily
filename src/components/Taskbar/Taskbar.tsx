import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import * as TS from './Taskbar.style'
import { Button, Offcanvas } from "react-bootstrap";

const Taskbar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <TS.TaskbarWrapper>
            <Navbar expand="x-lg" className="bg-body-secondary">
                <Container>
                    <Button variant="secondary" onClick={handleShow}>
                        Info
                    </Button>
                </Container>
            </Navbar>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </TS.TaskbarWrapper>
    )
}

export default Taskbar