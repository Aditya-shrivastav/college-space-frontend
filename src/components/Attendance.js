import classNames from 'classnames';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Container, Button, Row, Col, Card, CardBody, CardHeader, CardText } from 'reactstrap';
import ReactLoading from 'react-loading';


const AttendanceCard = ({ subject }) => {
    return (
        <Card style={{ margin: '0.5em' }}>
            <CardHeader>{subject.name}</CardHeader>
            <CardBody>
                <CardText>Total Classes : {subject.total}</CardText>
                <CardText>Present: {subject.present}</CardText>
                <CardText>Percentage: {((subject.present / subject.total) * 100).toFixed(2)}</CardText>
            </CardBody>
        </Card>
    )
}

const AttendancePage = ({ toggleSidebar, sideBarIsOpen, user }) => {

    const attendance = user.attendance.map((subject) => {
        return (
            <Col xs={12} md={4} key={subject.name}>
                <AttendanceCard subject={subject} />
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
                    Attendance<FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '5px' }} />
                </Col>
            </Row>
            {
                user.attendance ?
                    <div className="attendance-cards">
                        <Row style={{ margin: '2em' }}>{attendance}</Row>
                    </div>
                    :
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <ReactLoading type={"spin"} color={"blue"} height={'50px'} width={'50px'} />
                    </div>
            }

        </Container>
    );
}

export default AttendancePage