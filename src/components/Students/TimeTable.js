import { faAlignLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { Button, Col, Container, Row } from 'reactstrap';
import GuLogo from '../../images/Galgotias_University.png'

const TableCard = ({ time, today }) => {

    console.log(time, today)
    return (
        <div class="card" style={{ margin: '0.5em' }}>
            <div class="card-header" style={{ color: '#2fa4e7' }}>{time}</div>
            <div class="card-body">
                <p class="card-text">Subject : {today[time].subject}</p>
                <p class="card-text">Class Room : {today[time].class}</p>
            </div>
        </div>
    )
}

const TimeTablePage = ({ toggleSidebar, sideBarIsOpen, student }) => {


    const [today, setDay] = useState('sunday');

    const handleChange = (event) => {
        event.preventDefault();
        setDay(event.target.value);
    }


    const getTodayTimeTable = () => {

        const currentDate = new Date();

        let day = currentDate.getDay();

        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

        let options = '';

        setDay(days[day]);

        for (let i = 0; i < 7; i++) {
            if (i === day) {
                options += `<option value=${days[day]} selected>${days[day].toUpperCase()}</option>`;
            }
            else {
                options += `<option value=${days[i]} >${days[i].toUpperCase()}</option>`;
            }
        }

        document.getElementById("selectedDay").innerHTML = `${options}`;
    }

    useEffect(() => {
        getTodayTimeTable();
    }, [])

    const RenderTimeTable = () => {

        console.log(today)
        console.log(student.timeTable)


        let keys = Object.keys(student.timeTable[today])

        keys = keys.reverse()

        if (keys.length === 0) {
            return (
                <Col xs={12}>
                    It's Holiday! Enjoy.
                </Col>
            )
        }

        const todayTimeTable = keys.map((key) => {

            return (
                <Col xs={12} md={4} lg={3}>
                    <TableCard time={key.toString()} today={student.timeTable[today]} />
                </Col>
            )
        });

        return todayTimeTable;

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
                    Time Table<FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '5px' }} />
                </Col>
                <Col className="gu-logo-page" xs={6} style={{ textAlign: 'end' }}>
                    <img width="96px" height="90px" src={GuLogo} alt="logo" />
                </Col>
            </Row>
            <Row style={{ margin: '30px' }}>
                <Col xs={12} md={3} style={{ marginLeft: 'auto', width: 'fit-content', padding: '10px' }}>
                    <div id="selectDay" style={{ fontSize: '20px', fontFamily: 'Ubuntu' }}>
                        <select id="selectedDay" onChange={handleChange}></select>
                    </div>
                </Col>
            </Row>
            {
                Object.keys(student.timeTable).length > 0 ?
                    <div className='timetable-cards'>
                        <Row style={{ margin: '2em' }}>
                            {
                                RenderTimeTable()
                            }
                        </Row>
                    </div>
                    :
                    student.timeTableErr ?
                        <div style={{ margin: '1em', fontWeight: 'bold' }}>
                            {student.timeTableErr}
                        </div>
                        :
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <ReactLoading type={"spin"} color={"blue"} height={'50px'} width={'50px'} />
                        </div>
            }
        </Container>
    )
}

export default TimeTablePage;