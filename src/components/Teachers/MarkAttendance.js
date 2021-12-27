import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ReactLoading from 'react-loading';
import { baseUrl } from '../../shared/constants';
import axios from 'axios';
import { NotificationManager, NotificationContainer } from 'react-notifications';

const MarkAttendancePage = ({ toggleSidebar, sideBarIsOpen, course }) => {

    const [values, setValue] = useState({ section: null, date: null, totalStudents: [], presentStudents: [] })

    const handleChange = (field) => (event) => {
        console.log(field)
        setValue({ ...values, [field]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let currentDate = new Date();

        let selectedDate = new Date(values.date);

        if (selectedDate.getDay() === 0) {
            NotificationManager.error('Cannot mark attendance for Sunday!');
            return;
        }

        if (selectedDate.getTime() > currentDate.getTime()) {
            NotificationManager.error('Cannot mark attendance future dates');
            return;
        }

        if (!values.section || !values.date || values.section === 'None') {
            NotificationManager.error('Please specify both fields')
            return;
        }
        const students = await axios(`${baseUrl}/students/getStudentsFromCourse`, {
            method: "GET",
            headers: {
                "x-auth-token": localStorage.getItem('token')
            },
            params: {
                course: course.courseId,
                section: parseInt(values.section),
                semester: parseInt(course.semester)
            }
        }).then((resp) => {
            console.log(resp.data)
            return resp.data;
        })
        if (students.message === 'success')
            setValue({ ...values, totalStudents: students.students })
    }

    const submitAttendance = (e) => {
        e.preventDefault();
        const frm = document.getElementsByName('student-attendance-form')[0];
        console.log(frm)
        axios(`${baseUrl}/teachers/markAttendance`, {
            method: 'PUT',
            headers: {
                'x-auth-token': localStorage.getItem('token')
            },
            data: {
                semester: parseInt(course.semester),
                section: parseInt(values.section),
                date: values.date,
                students: values.presentStudents,
                courseId: course.courseId
            }
        }).then((resp) => {

            if (resp.data.message === 'success')
                NotificationManager.info('Attendance submitted');
            setValue({ section: null, date: null, totalStudents: [], presentStudents: [] })
            frm.reset()
        })
    }

    const handleChecked = (e) => {
        let isChecked = e.target.checked;
        if (isChecked && !values.presentStudents.includes(e.target.value)) {
            setValue({ ...values, presentStudents: [...values.presentStudents, e.target.value] })
        }

    }

    const handleCancel = (e) => {
        e.preventDefault();
        const frm = document.getElementsByName('student-attendance-form')[0];
        setValue({ section: null, date: null, totalStudents: [], presentStudents: [] })
        frm.reset()
    }

    return (
        < Container fluid className={classNames("content", { "is-open": sideBarIsOpen })}
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
                    Mark Attendance<FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '5px' }} />
                </Col>
            </Row>
            {
                course ?
                    <>
                        <Row>
                            <Col xs={12}>
                                <Form onSubmit={handleSubmit} name='student-attendance-form'>
                                    <Row >
                                        <Col xs={{ size: 6 }} md={{ size: 3, offset: 1 }}>
                                            <FormGroup>
                                                <Label>Select Section: </Label>
                                                <Input type="select" onChange={handleChange('section')}>
                                                    <option selected>None</option>
                                                    {
                                                        course.sections.map((section) => {
                                                            return (
                                                                <option>{section}</option>
                                                            )
                                                        })
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col xs={6} md={3}>
                                            <FormGroup>
                                                <Label>Select Date: </Label>
                                                <Input type="date" onChange={handleChange('date')} />
                                            </FormGroup>
                                        </Col>
                                        <Col xs={{ size: 5, offset: 4 }} md={{ size: 3, offset: 0 }} style={{ alignSelf: 'end', marginTop: '10px' }}>
                                            <Button type="submit" color="primary">SUBMIT</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                        {
                            values.totalStudents.length > 0 ?
                                <Row id="students-data" style={{ margin: '30px' }}>
                                    <Row style={{ borderBottom: '1px solid black', marginBottom: '30px', fontSize: '18px' }}>Students Name :</Row>
                                    <Form>
                                        <div className="students-list">
                                            <Row>
                                                {
                                                    values.totalStudents.map((student) => {
                                                        return (
                                                            <Col xs={12} style={{ margin: '5px' }}>
                                                                <Input type="checkbox" onChange={handleChecked} value={student.userId} /> <Label>{student.name}</Label>
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </Row>
                                        </div>
                                        <Row >
                                            <Button type="submit" size="sm" color="primary" style={{ width: 'fit-content', marginLeft: 'auto' }} onClick={submitAttendance}> SUBMIT</Button>
                                            <Button type='cancel' size="sm" color="gray" style={{ width: 'fit-content', marginRight: 'auto' }} onClick={handleCancel}> Cancel</Button>
                                        </Row>
                                    </Form>
                                </Row> :
                                <div></div>
                        }
                        <NotificationContainer />
                    </> :
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <ReactLoading type={"spin"} color={"blue"} height={'50px'} width={'50px'} />
                    </div>
            }

        </ Container>
    );
}

export default MarkAttendancePage;