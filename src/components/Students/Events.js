import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Container, Button, Row, Col, CardText, CardBody, Card, CardHeader, CardImg, CardFooter } from 'reactstrap';
import ReactLoading from 'react-loading';
import { onSnapshot, doc, getFirestore, query, collection, orderBy } from 'firebase/firestore';
import app from '../../firebaseConfig';
import axios from "axios";
import { baseUrl } from '../../shared/constants';
const db = getFirestore(app);
const q = query(collection(db, "events"), orderBy("time", "desc"));


const EventCard = ({ event }) => {
    return (

        <div class="card border-dark" style={{ margin: '0.5em' }}>
            <div class="card-header" style={{ color: '#2fa4e7' }}>{event.title}</div>
            <div class="card-body" style={{ borderBottom: '1px solid black', margin: '10px' }}>
                <p class="card-text">{event.body}</p>
            </div>
            {
                event.imageUrl ?
                    <div className='card-img' style={{ textAlign: 'center' }}>
                        <img src={event.imageUrl} alt={event.title} height="300px" width="350px" style={{ padding: '10px', borderRadius: '1em' }} />
                    </div> :
                    <div></div>
            }
            <div class="card-footer text-muted">
                Organized By : {event.organizers}
            </div>
        </div>
    )
}

{/* {event.imageUrl ? <CardImg top src={event.imageUrl} alt={event.title} height="400px" style={{ padding: '10px', borderRadius: '1em' }} /> : <div></div>} */ }

const EventsPage = ({ toggleSidebar, sideBarIsOpen, student }) => {

    const [events, setEvents] = useState([])

    const markEventRead = () => {
        axios(`${baseUrl}/students/markEventRead`, {
            method: 'PUT',
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        }).then((resp) => {
            console.log(resp.data)
        })
    }


    useEffect(() => {


        console.log(student.unreadEvent)

        if (student.unreadEvents)
            markEventRead();

        onSnapshot(q, (docs) => {
            let resp = [];
            docs.forEach((event) => {
                console.log(event.data())
                resp.push(event.data());
            })
            setEvents(resp);
        })
    }, [])

    const renderEvents = events.map((event) => {
        return (
            <Row style={{ justifyContent: 'center', margin: 0, padding: 0 }}>
                <Col xs={12} md={5} key={event.eventId}>
                    <EventCard event={event} />
                </Col>
            </Row>
        )
    })

    return (
        <Container fluid className={classNames("content", { "is-open": sideBarIsOpen })}
        >
            {
                !sideBarIsOpen ?
                    <Button color="gray" onClick={toggleSidebar} style={{ marginBottom: '10px', border: '1px solid black' }}>
                        <FontAwesomeIcon icon={faAlignLeft} />
                    </Button> :
                    <div style={{ display: 'none' }}></div>

            }
            <Row id='panel-header-row' style={{ height: '50px', margin: '0 0.5em', padding: '0 0.2em' }}>
                <Col xs={12} style={{ alignSelf: 'center', fontFamily: 'Domine', fontSize: '18px' }}>
                    Events<FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '5px' }} />
                </Col>
            </Row>
            {
                events.length > 0 ?
                    <div className='events-cards'>
                        <Row id="event-rows">{renderEvents}</Row>
                    </div>
                    :
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <ReactLoading type={"spin"} color={"blue"} height={'50px'} width={'50px'} />
                    </div>
            }
        </Container>
    )
}

export default EventsPage;