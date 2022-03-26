import { faAlignLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Mail, MailOutline, Person } from '@mui/icons-material';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Button, Col, Container, Row, Card } from 'reactstrap';
import GuLogo from '../images/Galgotias_University.png'

const ContactUsPage = ({ toggleSidebar, sideBarIsOpen }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const submitHandler = () => {
        console.log(name, email, phoneNumber, message)
        setName('')
        setEmail('')
        setMessage('')
        setPhoneNumber('')
    }

    return (
        <>
            <div className="vector"></div>
            <Container
                fluid
                className={classNames("content", { "is-open": sideBarIsOpen })}
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
                        Contact Us<FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '5px' }} />
                    </Col>
                    <Col className="gu-logo-page" xs={6} style={{ textAlign: 'end' }}>
                        <img width="96px" height="90px" src={GuLogo} alt="logo" />
                    </Col>
                </Row>
                <Row style={{ border: '1px solid black', height: '70vh' }}>
                    <Col xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
                        <Card style={{ border: '1px solid black', width: '400px', height: '400px' }}>

                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ContactUsPage