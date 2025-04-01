import React, { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';
import axios from 'axios';
import CenteredModal from '.';
import { DeleteButton } from '../../../components/delete';

export default function TrackCard({ track, handleDelete, count }) {
    
    const [open, setOpen] = useState(false)
    const [modalShow, setModalShow] = useState(false);

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
                    <Button onClick={() => setOpen(prevOpen => !prevOpen)} variant="primary" className="mt-4">
                        { open ? 'Hide Details' : 'View Details' }
                    </Button>
                </Card.Text>
                <Collapse in={open}>
                <div id="example-collapse-text" className='accordion-collapse visible'>
                    <Card.Subtitle>
                        Sets: {track.sets}
                    </Card.Subtitle>
                    <Card.Subtitle>
                        Reps: {track.sets}
                    </Card.Subtitle>
                    <Card.Subtitle>
                        Weight: {track.weight}lbs
                    </Card.Subtitle>
                </div>
                </Collapse>
                {/*
                <Collapse in={open}>
                    <Button variant="info" onClick={() => setModalShow(true)}>Apply</Button>
                </Collapse> */}
            </Card.Body>
            
            {/*
            <CenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            /> */}
        </Card>

    )
}