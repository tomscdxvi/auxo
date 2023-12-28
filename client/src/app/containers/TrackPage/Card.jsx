import React, { useState } from 'react'
import { Card, Badge, Button, Collapse } from 'react-bootstrap'
import Modal from './Modal'

export default function Track({ track }) {
    
    const [open, setOpen] = useState(false)
    const [modalShow, setModalShow] = useState(false);

    return (
        <Card className="mb-4">
            <Card.Body>
                <div className="d-flex justify-content-between mt-2">
                    <div>

                        <Card.Title>
                            {data.data.history.title} 
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                            {data.data.history.date}: {data.data.history.start_time} - {data.data.history.end_time}
                        </Card.Subtitle>
                        {/* <Badge variant="secondary" className="mr-2">{job.job_type}</Badge>
                        <Badge variant="secondary">{job.location}</Badge> */}

                        <div className="mt-2">
                            <h5 className="text-primary">Skills</h5>
                            {job.skills_tag.join(', ')}
                        </div>
                    </div>
                </div>
                <Card.Text>
                    <Button onClick={() => setOpen(prevOpen => !prevOpen)} variant="primary" className="mt-4">
                        { open ? 'Hide Details' : 'View Details' }
                    </Button>
                </Card.Text>
                <Collapse in={open}>
                    <div className="mt-4" dangerouslySetInnerHTML={{__html:job.description}}></div>
                </Collapse>
                <Collapse in={open}>
                    <Button variant="info" onClick={() => setModalShow(true)}>Apply</Button>
                </Collapse>
            </Card.Body>
            
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

        </Card>

    )
}