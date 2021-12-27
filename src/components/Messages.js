import { faAlignLeft, faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { baseUrl } from '../shared/constants';

const MessagesPage = ({ toggleSidebar, sideBarIsOpen }) => {

    let [searched, setSearchedResult] = useState([])
    let [isOpen, toggleModal] = useState(false)
    let [chats, setChats] = useState([])

    const handleChange = (e) => {
        axios(`${baseUrl}/students/searchFaculty`, {
            method: 'GET',
            headers: {
                'x-auth-token': localStorage.getItem('token')
            },
            params: {
                q: e.target.value
            }
        }).then((resp) => {
            console.log(resp.data.list)
            setSearchedResult(resp.data.list)
        })
    }

    useEffect(() => {
        getChatsList();
    }, [])

    const toggle = () => {
        setSearchedResult([])
        toggleModal(!isOpen)
    }

    const handleClick = () => {
        setSearchedResult([])
        toggle()
    }

    const getChatsList = () => {
        axios(`${baseUrl}/users/getChats`, {
            method: 'GET',
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        }).then((resp) => {
            setChats(resp.data.users)
        })
    }

    const showChatList = chats.map((chat) => {
        return (
            <Link to={`/conversation/${chat.userId}/${chat.name}`}>
                <Col style={{ background: '#f2f2f2', borderRadius: '0.5em', margin: '5px', boxShadow: '2px 5px 5px #4d4d4d', padding: '5px' }} >
                    {chat.name}
                </Col>
            </Link>
        )
    })

    let showSearchResult = searched.map((result) => {
        return (
            <Col md="11" style={{ background: '#f2f2f2', borderRadius: '0.5em', margin: '5px', boxShadow: '2px 5px 5px #4d4d4d', padding: '5px' }} onClick={handleClick}>
                <Link to={`/conversation/${result.userId}`}>
                    <Row>
                        <Col md="1" style={{ marginTop: '5px' }}>
                            {result.imageUrl ? <img src={result.imageUrl} alt="img" style={{ width: '40px', height: '40px', borderRadius: '50%' }} /> : null}
                        </Col>
                        <Col md="10" style={{ marginLeft: '15px' }}>
                            <div>Name : {result.name}</div>
                            <div style={{ color: '#999999' }}> &nbsp;{result.email}</div>
                        </Col>
                    </Row>
                </Link>
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
            <Row id='panel-header-row' style={{ height: '50px', margin: '0 0.5em', padding: '0 0.2em' }}>
                <Col xs={12} style={{ alignSelf: 'center', fontFamily: 'Domine', fontSize: '18px' }}>
                    Messages<FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '5px' }} />
                </Col>
            </Row>
            <Row style={{ margin: '10px', marginBottom: '0' }}>
                <Col xs={12}>
                    <Modal isOpen={isOpen} toggle={toggle}>
                        <ModalHeader>Find Faculty <FontAwesomeIcon icon={faSearch} style={{ marginLeft: '10px' }} /></ModalHeader>
                        <ModalBody>
                            <Col md="12">
                                <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={handleChange} />
                            </Col>
                            <Row style={{ marginTop: '10px', marginLeft: '0.5em' }}>
                                {searched.length > 0 ? showSearchResult : <div></div>}
                            </Row>
                        </ModalBody>
                    </Modal>
                </Col>
            </Row>
            <Row style={{ margin: '0.5em 0.5em' }}>
                <Col md="3" xs="6" style={{ marginLeft: 'auto' }}>
                    <Button color='blue' style={{ border: '1px solid black' }} onClick={toggle}>Search<FontAwesomeIcon icon={faSearch} style={{ marginLeft: '10px' }} /></Button>
                </Col>
            </Row>
            <Row>
                {chats.length > 0 ? showChatList : <div></div>}
            </Row>
        </Container>
    )
}

export default MessagesPage