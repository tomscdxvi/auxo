import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function CenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Test
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <h4>Test</h4>
            <p>
                Test
            </p>
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>

        </Modal>
    )
}