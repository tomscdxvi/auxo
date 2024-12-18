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
                Apply Now!
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <h4>You must be logged in to apply for jobs!</h4>
            <p>
                To protect the safety of others and yourself, you must login or register an account before applying for jobs!
            </p>
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>

        </Modal>
    )
}