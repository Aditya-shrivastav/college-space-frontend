import { faAlignLeft, faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { baseUrl, STUDENT } from '../shared/constants';
import GuLogo from '../images/Galgotias_University.png'

const UserCards = ({ user, searched }) => {

    return (
        <div className="card" style={{ margin: '0.5em' }}>
            <div className="card-body">
                <p className="card-text" style={{ textAlign: 'center' }}>
                    <img style={{ borderRadius: '50%' }} src={user.imageUrl} alt="user-profile" width="100px" height="100px" />
                </p>
                <p className="card-text">Name : {user.name}</p>
                <p className="card-text">Primary Subject : {user.subject}</p>
                <p className="card-text">Role : {user.position}</p>
            </div>
            <Link to={`/conversation/${user.userId}/${user.name}`} style={{ alignSelf: 'center', paddingBottom: '10px' }}><Button size="sm" color="primary">{searched ? 'Message' : 'Continue Conversation'}<FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '5px' }} /></Button></Link>
        </div>
    )
}

const MessagesPage = ({ toggleSidebar, sideBarIsOpen }) => {

    let [searched, setSearchedResult] = useState([])
    let [chats, setChats] = useState([])
    let [query, setQuery] = useState(null)


    const handleChange = (e) => {

        if (e.target.value.length === 0) {
            setQuery(null)
        }
        setQuery(e.target.value)
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

    const getChatsList = () => {
        axios(`${baseUrl}/users/getChats`, {
            method: 'GET',
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        }).then((resp) => {
            if (resp.data.success)
                setChats(resp.data.users)
        })
    }

    const showResults = () => {
        let result =
            query ?
                searched?.length > 0 ?
                    searched.map((result) => {
                        return (
                            <Col xs={12} md={4} className='user-name'>
                                <UserCards user={result} searched={true} />
                            </Col>
                        )
                    })
                    :
                    <div style={{ margin: '1em', fontWeight: 'bold' }}>
                        No user Found !
                    </div>
                :
                chats?.length > 0 ?
                    chats.map((result) => {
                        return (
                            <Col xs={12} md={4} className='user-name'>
                                <UserCards user={result} searched={false} />
                            </Col>
                        )
                    })
                    :
                    <div style={{ margin: '1em', fontWeight: 'bold' }}>
                        Start new Conversation !
                    </div>

        return result;
    }

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
                    Messages<FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '5px' }} />
                </Col>
                <Col className="gu-logo-page" xs={6} style={{ textAlign: 'end' }}>
                    <img width="96px" height="90px" src={GuLogo} alt="logo" />
                </Col>
            </Row>
            {
                localStorage.getItem('user') === STUDENT ?
                    <Row style={{ margin: '0.5em 0.5em' }}>
                        <Col md="3" xs="12" style={{ marginLeft: 'auto' }}>
                            <input className="form-control" type="text" placeholder='Search Faculty' aria-label="Search" onChange={handleChange} />
                        </Col>
                    </Row>
                    :
                    <div></div>
            }
            <Row className='chat-list-container'>
                {
                    showResults()
                }
            </Row>
        </Container>
    )
}

export default MessagesPage