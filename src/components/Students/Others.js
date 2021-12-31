import { faAlignLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from 'classnames';
import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import GuLogo from '../../images/Galgotias_University.png'

const OthersPage = ({ toggleSidebar, sideBarIsOpen }) => {

    return (
        <>
            <div className="vector"></div>
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
                    <Col xs={12} md={6} style={{ alignSelf: 'center', fontFamily: 'Domine', fontSize: '18px', color: '#7EACF8' }}>
                        Others<FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '5px' }} />
                    </Col>
                    <Col xs={12} md={6} style={{ textAlign: 'end' }}>
                        <img width="96px" height="90px" src={GuLogo} alt="logo" />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default OthersPage;