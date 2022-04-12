import { faAlignLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import classNames from 'classnames';
import { collection, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { Button, Col, Container, Row } from 'reactstrap';
import app from '../../firebaseConfig';
import GuLogo from '../../images/Galgotias_University.png';
import { baseUrl } from '../../shared/constants';
const db = getFirestore(app);
const q = query(collection(db, "events"), orderBy("time", "desc"));

const EventCard = ({ event }) => {
    return (

        <div class="card" style={{ margin: '0.5em', borderRadius: '2em' }}>
            <div class="card-header" style={{ color: '#2fa4e7' }}>{event.title}</div>
            <div class="card-body" style={{ margin: '10px' }}>
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

const EventsPage = ({ toggleSidebar, sideBarIsOpen, student }) => {

    const [events, setEvents] = useState([])
    const [noEvent, setEventStatus] = useState(false)

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
            if (resp.length > 0)
                setEvents(resp);
            else
                setEventStatus(true)
        })
    }, [])

    const renderEvents = events.map((event) => {
        return (
            <Row style={{ justifyContent: 'center', margin: 0, padding: 0 }}>
                <Col className='event-col' xs={12} md={8} lg={5} key={event.eventId}>
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
            <Row id='panel-header-row' style={{ height: '50px', margin: '0 0.5em', padding: '0 0.2em', marginBottom: '3em' }}>
                <Col xs={6} style={{ alignSelf: 'center', fontFamily: 'Domine', fontSize: '18px', color: '#7EACF8' }}>
                    Events<FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '5px' }} />
                </Col>
                <Col className="gu-logo-page" xs={6} style={{ textAlign: 'end' }}>
                    <img width="96px" height="90px" src={GuLogo} alt="logo" />
                </Col>
            </Row>
            {
                events.length > 0 ?
                    <div className='events-cards'>
                        <Row id="event-rows">{renderEvents}</Row>
                    </div>
                    :
                    noEvent ?
                        <div style={{ margin: '1em', fontWeight: 'bold' }}>
                            'No Events Currently Going On!'
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