import { faAlignLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from 'classnames';
import React from 'react';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import GuLogo from '../../images/Galgotias_University.png'

const CourseCard = ({ course }) => {
    return (
        <div class="card border-dark" style={{ margin: '0.5em' }}>
            <div class="card-header" style={{ color: '#2fa4e7' }}>{course.courseId}</div>
            <div class="card-body">
                <p class="card-text">Name : {course.name}</p>
                <p class="card-text">Semester : {course.semester}</p>
                <p class="card-text">Branch : {course.branch}</p>
            </div>
            <Link to={`/courseFiles/${course.courseId}`} style={{ alignSelf: 'center', paddingBottom: '10px' }}><Button size="sm" color="primary">See Files</Button></Link>
        </div>
    )
}

const StudentCourse = ({ toggleSidebar, sideBarIsOpen, student }) => {


    const courses = student.courses.map((course) => {

        return (
            <Col xs={12} md={4} key={course.courseId}>
                <CourseCard course={course} />
            </Col>
        )
    })

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
                        Courses<FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '5px' }} />
                    </Col>
                    <Col xs={12} md={6} style={{ textAlign: 'end' }}>
                        <img width="96px" height="90px" src={GuLogo} alt="logo" />
                    </Col>
                </Row>
                {
                    student.courses?.length > 0 ?
                        <div className="courses-cards">
                            <Row style={{ margin: '1.5em' }}>{courses}</Row>
                        </div>
                        :
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <ReactLoading type={"spin"} color={"blue"} height={'50px'} width={'50px'} />
                        </div>
                }

            </Container>
        </>
    );
}

export default StudentCourse;