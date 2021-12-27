import { faAlignLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from 'classnames';
import React from 'react';
import ReactLoading from 'react-loading';
import { Button, Col, Container, Row } from 'reactstrap';


const AttendanceCard = ({ subject }) => {
    let percentage = ((subject.present / subject.total) * 100).toFixed(2)
    let percentColor = percentage < 70 ? 'bg-danger' : percentage < 80 ? 'bg-warning' : undefined
    return (
        <div className="card border-dark" style={{ margin: '0.5em' }}>
            <div className="card-header" style={{ color: '#2fa4e7' }}>{subject.name}</div>
            <div className="card-body">
                <p className="card-text">Total Classes : {subject.total}</p>
                <p className="card-text">Present: {subject.present}</p>
                <p className="card-text">Percentage :
                    <div className="progress">
                        <div className={`progress-bar ${percentColor}`} role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" style={{ width: `${percentage}%` }}> {percentage} %</div>
                    </div>
                </p>

            </div>
        </div>
    )
}

const AttendancePage = ({ toggleSidebar, sideBarIsOpen, student }) => {

    const attendance = student.attendance.map((subject) => {
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
                student.attendance?.length > 0 ?
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