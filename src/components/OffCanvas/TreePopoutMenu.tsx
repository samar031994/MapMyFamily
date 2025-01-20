import React from "react";
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useAtom } from "jotai";
import * as TA from '../../models/Tree.atoms'
import * as TPS from './TreePopoutMenu.style'

const TreePopoutMenu = () => {
    const [show, setShow] = useAtom(TA.MenuAtom);
    const handleClose = () => setShow(false);
    return (
        <TPS.OffCanvasWrapper show={show} onHide={handleClose}>
            <TPS.OffCanvasHeader closeButton>
                <Offcanvas.Title>MapMyFamily</Offcanvas.Title>
            </TPS.OffCanvasHeader>
            <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements you
                have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
        </TPS.OffCanvasWrapper>
    )
}

export default TreePopoutMenu