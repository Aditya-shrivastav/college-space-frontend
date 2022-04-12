import { faAlignLeft, faChevronRight, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import classNames from 'classnames';
import { saveAs } from 'file-saver';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import app from '../firebaseConfig';
import { baseUrl, TEACHER } from '../shared/constants';
import GuLogo from '../images/Galgotias_University.png'
import ReactLoading from 'react-loading';

const storage = getStorage(app);

const CourseFilesPage = ({ toggleSidebar, sideBarIsOpen, course }) => {

    const [values, setValue] = useState({ file: null, courseFiles: [], filename: null, fetchCourseErr: null })
    const [isOpen, toggleModal] = useState(false);


    useEffect(() => {
        getCourseFiles();
    }, [])

    const getCourseFiles = () => {

        axios(`${baseUrl}/courses/getCourseFiles`, {
            method: 'GET',
            headers: {
                'x-auth-token': localStorage.getItem('token')
            },
            params: {
                facultyId: course.facultyId,
                courseId: course.courseId,
                semester: course.semester
            }
        }).then((resp) => {
            if (resp.data.success)
                setValue({ ...values, courseFiles: resp.data.courseFiles });
            else
                setValue({ ...values, fetchCourseErr: resp.data.message })
        })
    }

    const handleFileChange = (event) => {
        if (event.target.files[0]) {
            console.log(event.target.files[0])
            setValue({ ...values, file: event.target.files[0], filename: event.target.files[0].name });
        }
    }

    const toggle = () => {
        setValue({ ...values, filename: null, file: null })
        toggleModal(!isOpen)
    }

    const handleUpload = () => {


        if (!values.file) {
            NotificationManager.error('Please choose a file');
            return;
        }

        toggle();

        const storageRef = ref(storage, `courses/${course.courseId}/${course.facultyId}/${values.filename}`);

        const uploadTask = uploadBytesResumable(storageRef, values.file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        console.log('nothing')
                }
            },
            (error) => {
                console.log('error ocurred', error);
                return false;
            },
            () => {
                console.log(uploadTask.snapshot.ref);
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    axios(`${baseUrl}/courses/uploadCourseFiles`, {
                        method: 'PUT',
                        headers: {
                            'x-auth-token': localStorage.getItem('token'),
                            'Content-Type': 'application/json'
                        },
                        data: {
                            semester: course.semester,
                            courseId: course.courseId,
                            url,
                            name: values.filename
                        }
                    }).then((resp) => {
                        if (resp.data.success) {
                            NotificationManager.info('File uploaded Successfully!');
                            getCourseFiles();
                        } else {
                            NotificationManager.error(resp.data.message)
                        }
                    })
                    return url;
                })
            }

        )
    }

    const deleteFile = () => {
        console.log('hi')
    }

    const downloadFile = (url, name) => {
        saveAs(url, name)
    }

    const handleChange = (e) => {
        setValue({ ...values, filename: e.target.value })
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
            <Row id='panel-header-row' style={{ height: '50px', margin: '0 0.5em', padding: '0 0.2em', marginBottom: '3em' }}>
                <Col xs={6} style={{ alignSelf: 'center', fontFamily: 'Domine', fontSize: '18px', color: '#7EACF8' }}>
                    {course ? course.name : 'Course'}<FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '5px' }} />
                </Col>
                <Col className="gu-logo-page" xs={6} style={{ textAlign: 'end' }}>
                    <img width="96px" height="90px" src={GuLogo} alt="logo" />
                </Col>
            </Row>
            {
                localStorage.getItem('user') === TEACHER ?
                    <Row style={{ margin: '10px', marginBottom: '0', borderBottom: '1px solid #ffb3b3' }}>
                        <Col xs={12}>
                            <Modal isOpen={isOpen} toggle={toggle}>
                                <ModalHeader>Choose File:</ModalHeader>
                                <ModalBody>
                                    <div className="form-group">
                                        <input className="form-control" type="file" id="formFile" onChange={handleFileChange} />
                                    </div>
                                    {
                                        values.file ?
                                            <div className="form-group">
                                                <label className="col-form-label" for="filename">Save As : </label>
                                                <input type="text" className="form-control" id="filename" value={values.filename} onChange={(e) => handleChange(e)} />
                                            </div>
                                            :
                                            <div></div>
                                    }
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={handleUpload} size='sm'>
                                        Upload Files
                                    </Button>
                                    <Button onClick={toggle} size='sm' color="black">Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </Col>
                        <Col xs={3} style={{ marginLeft: 'auto', width: 'fit-content', padding: '10px' }}>
                            <Button color="primary" type="submit" size="sm" style={{ marginLeft: 'auto' }} onClick={toggle}>Upload Files</Button>
                        </Col>
                    </Row>
                    :
                    <div></div>
            }
            <Row style={{ marginLeft: '30px', marginTop: '10px' }}>
                <Col md={4} xs={10} style={{ fontSize: 'bold', borderBottom: '1px solid #999999', paddingBottom: '5px' }}>
                    <FontAwesomeIcon icon={faList} /> &nbsp; &nbsp; Uploaded Courses
                </Col>
            </Row>
            {
                values.courseFiles.length > 0 ?
                    <div className="uploaded-files" style={{ overflowX: 'hidden' }}>
                        <Row style={{ marginLeft: '35px', paddingTop: '5px' }}>
                            {
                                values.courseFiles.map((course) => {
                                    return (
                                        <>
                                            <Row className="course-file-row" style={{ padding: '8px' }} >
                                                <Col xs={10} >
                                                    <div>
                                                        {course.name}
                                                    </div>
                                                </Col>
                                                <Col xs={2} >
                                                    {/* <FontAwesomeIcon icon={faArrowAltCircleDown} style={{ fontSize: '20px', color: '#2fa4e7' }} /> */}
                                                    {
                                                        localStorage.getItem('user') === TEACHER ?
                                                            <Tooltip title="Delete" onClick={deleteFile}>
                                                                <IconButton>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            :
                                                            <></>
                                                    }
                                                    <Tooltip title="Download" onClick={() => downloadFile(course.url, course.name)}>
                                                        <IconButton>
                                                            <DownloadIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Col>
                                            </Row>
                                        </>
                                    )
                                })
                            }
                        </Row>
                    </div>
                    :
                    values.fetchCourseErr ?
                        <div style={{ margin: '1em', fontWeight: 'bold' }}>
                            {values.fetchCourseErr}
                        </div>
                        :
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <ReactLoading type={"spin"} color={"blue"} height={'50px'} width={'50px'} />
                        </div>
            }

            <NotificationContainer />

        </ Container >
    )
}

export default CourseFilesPage;