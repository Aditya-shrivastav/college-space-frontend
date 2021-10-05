import React from 'react';
import { Container, Button, Row, Col } from 'reactstrap'
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';

const SidePanel = ({ toggleSidebar, sideBarIsOpen, user }) => {


    return (
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
            {console.log(user)}
            {
                user.success ?
                    <Row className="sidepanel" >
                        <div class="user-details">
                            <Row className="user-img">
                                <Col xs={12} >
                                    <img src="/default-user.jpg" className="rounded-circle" alt="default" height="150" width="150" />
                                </Col>
                                <Col xs={12} style={{ paddingTop: '30px' }}>
                                    <Button size="sm" color="primary">
                                        Update Profile
                                    </Button>
                                </Col>
                            </Row>
                            <Row className="user-info">
                                <Col xs={12} className="details">
                                    Name: {user.user.name}
                                </Col>
                                <Col xs={12} className="details">
                                    Email: {user.user.email}
                                </Col>
                                <Col xs={12} className="details">
                                    Section: {user.user.section}
                                </Col>
                                <Col xs={12} className="details">
                                    Semester: {user.user.semester}
                                </Col>
                                <Col xs={12} className="details">
                                    Branch: {user.user.branch}
                                </Col>
                                <Col xs={12} className="details" style={{ textAlign: 'center', color: 'red' }}>
                                    Other info will be shown once user data is retrieved from college!
                                </Col>
                            </Row>
                        </div>
                    </Row> :
                    <div></div>
            }
        </Container>
    )
}

export default SidePanel;