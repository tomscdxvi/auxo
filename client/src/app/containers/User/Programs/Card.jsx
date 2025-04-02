import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import tw from 'twin.macro';
import { DeleteButton } from '../../../components/delete';

const Title = styled.h1`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        text-headline
        tracking-wider
        font-bold
        xlarge:text-2xl 
    `}
`;

const Subtitle = styled.h1`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        text-headline
        tracking-wider
        font-bold
        mb-4
        xlarge:text-2xl 
    `}
`;

const Text = styled.p`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        text-headline
        font-semibold
        xlarge:text-xl 
    `}
`;

export default function TrackCard({ track, handleDelete, count }) {

    const [modalShow, setModalShow] = useState(false); // Modal visibility state

    const handleLearnMoreClick = () => {
        setModalShow(true); // Show modal when "Learn More" is clicked
    };

    const handleCloseModal = () => {
        setModalShow(false); // Close the modal
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <div className="d-flex justify-content-between mt-2">
                    <div className="w-full">
                        <Card.Title>
                            {track.title}
                            <DeleteButton onClick={handleDelete} />
                        </Card.Title>
                        <Card.Subtitle className="text-muted mt-2 mb-2">
                            {track.description}
                        </Card.Subtitle>
                    </div>
                </div>
                <Card.Text>
                    <Button onClick={handleLearnMoreClick} variant="primary" className="mt-4">
                        Learn more!
                    </Button>
                </Card.Text>
            </Card.Body>

            {/* Modal Component */}
            <Modal size="lg" centered show={modalShow} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Title>{track.title}</Title>
                </Modal.Header>
                <Modal.Body>
                    <Subtitle>{track.description}</Subtitle>
                    <Text>Sets: {track.sets}</Text>
                    <Text>Reps: {track.reps}</Text>
                    <Text>Weight: {track.weight}lbs</Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
}
