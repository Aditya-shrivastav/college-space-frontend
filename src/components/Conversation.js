import { faAlignLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import classNames from 'classnames';
import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState, useRef } from 'react';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import app from '../firebaseConfig';
import GuLogo from '../images/Galgotias_University.png';
import { baseUrl } from '../shared/constants';

const db = getFirestore(app);

const ConversationPage = ({ toggleSidebar, sideBarIsOpen, conversationId, name }) => {

    let [msg, setMsg] = useState(null)
    let [conversation, setConversation] = useState([])
    const messagesEndRef = useRef(null)

    const q = query(collection(db, `messages/${localStorage.getItem("userId")}/conversations`), where("conversationId", "==", conversationId))

    useEffect(() => {
        console.log('heelo')
        onSnapshot(q, (docs) => {
            docs.forEach((conversation) => {
                console.log(conversation.data())
                setConversation(conversation.data().message)
            })
        })
    }, [])

    const handleChange = (e) => {
        setMsg(e.target.value)
    }

    const sendMessage = () => {
        if (msg) {
            setMsg(null)
            axios(`${baseUrl}/users/sendMessage`, {
                method: 'PUT',
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                },
                data: {
                    msg,
                    to: conversationId
                }
            }).then((resp) => {
                if (!resp.success)
                    NotificationManager.error(`Could Not Send Message: ${resp.message}`)

            })
        }
    }

    const checkEnterKey = (e) => {
        if (e.keyCode === 13)
            sendMessage()
    }

    const loadMessages = conversation.map((message) => {
        return (
            <Col xs={11} md={11} className={classNames({ "sent-text": message.sent, "recieved-text": !message.sent })} style={{ display: 'flex', justifyContent: `${message.sent ? 'flex-end' : 'flex-start'}`, alignItems: 'center', height: 'auto', padding: '0.5em', marginLeft: `${message.sent ? '5em' : '0'}`, marginRight: `${message.sent ? '0' : '5em'}` }}>
                <div style={{ width: 'fit-content', height: 'fit-content', padding: '5px', borderRadius: '0.5em', background: '#66ccff', wordWrap: 'break-word' }}>
                    {message.text}
                </div>
            </Col>
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
            {console.log(conversationId)}
            <Row id='panel-header-row' style={{ height: '50px', margin: '0 0.5em', padding: '0 0.2em', marginBottom: '3em' }}>
                <Col xs={6} style={{ alignSelf: 'center', fontFamily: 'Domine', fontSize: '18px', color: '#7EACF8' }}>
                    {name ? name : 'User Name'}<FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '5px' }} />
                </Col>
                <Col className="gu-logo-page" xs={6} style={{ textAlign: 'end' }}>
                    <img width="96px" height="90px" src={GuLogo} alt="logo" />
                </Col>
            </Row>
            <Row id="user-chats" style={{ margin: '0 2em', padding: '0 0.2em', height: '72vh', width: '70vw' }}>
                {
                    conversation.length > 0 ?
                        loadMessages :
                        <div></div>
                }
                <div ref={messagesEndRef} />
            </Row>
            <Row style={{ margin: '1em 2em', padding: '0 0.2em', display: 'flex', justifyItems: 'flex-end' }}>
                <Col xs="10">
                    <Input id="message-input" type="text" onChange={handleChange} value={msg ? msg : ''} onKeyUp={checkEnterKey} />
                </Col>
                <Col xs="2">
                    <Button type="submit" onClick={sendMessage} color="primary">Send</Button>
                </Col>
            </Row>

        </Container>
    )
}

export default ConversationPage