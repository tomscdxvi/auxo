import React, { useState } from 'react'
import { Card, Badge, Button, Collapse } from 'react-bootstrap'
import CenteredModal from './Modal'
import { DeleteButton } from '../../components/delete'

export default function TrackCard({ track }) {
    
    const [open, setOpen] = useState(false)
    const [modalShow, setModalShow] = useState(false);

    return (
        <Card className="mb-4">
            <Card.Body>
                <div className="d-flex justify-content-between mt-2">
                    <div className="w-full">
                        <Card.Title>
                            {track.title} 
                            <DeleteButton />
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                            Date: {track.date} | Time: {track.start_time} - {track.end_time}
                            
                        </Card.Subtitle>
                        {/* <Badge variant="secondary" className="mr-2">{}</Badge>
                        <Badge variant="secondary">{}</Badge> */}
                    </div>
                </div>
                <Card.Text>
                    <Button onClick={() => setOpen(prevOpen => !prevOpen)} variant="primary" className="mt-4">
                        { open ? 'Hide Details' : 'View Details' }
                    </Button>
                </Card.Text>
                <Collapse in={open}>
                    <div className="mt-4" dangerouslySetInnerHTML={{__html:"Workout Details..."}}></div>
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