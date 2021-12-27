import { faAlignLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import classNames from 'classnames';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import app from '../firebaseConfig';
import { baseUrl, STUDENT, TEACHER } from "../shared/constants";

const storage = getStorage(app);

const DashboardPage = ({ toggleSidebar, sideBarIsOpen, user }) => {

    const [values, setValue] = useState({
        file: null,
        image: user.user.imageUrl ? user.user.imageUrl : '/default-user.jpg'
    })

    const [isOpen, toggle] = useState(false);

    const handleFileChange = (event) => {
        if (event.target.files[0]) {
            console.log(event.target.files[0])
            setValue({ ...values, file: event.target.files[0] });
        }
    }

    const handleUpload = (event) => {

        event.preventDefault()

        if (!values.file) {
            NotificationManager.error('Please choose a file');
            return;
        }

        toggleModal();

        const storageRef = ref(storage, `user/images/${values.file.name}`);

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
                    axios(`${baseUrl}/users/updateImage`, {
                        method: 'PUT',
                        headers: {
                            'x-auth-token': localStorage.getItem('token'),
                            'Content-Type': 'application/json'
                        },
                        data: { url }
                    }).then((res) => {
                        if (res.data.message === 'success')
                            setValue({ ...values, image: url });
                    })
                    return url;
                })
            }

        )
    }

    const toggleModal = () => toggle(!isOpen)


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
            <Row id='panel-header-row' style={{ height: '50px', margin: '0 0.5em', padding: '0 0.2em' }}>
                <Col xs={12} style={{ alignSelf: 'center', fontFamily: 'Domine', fontSize: '18px' }}>
                    Dashboard<FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '5px' }} />
                </Col>
            </Row>
            {
                user.success ?
                    <Row className="sidepanel" >
                        <div class="user-details">
                            <Row className="user-img">
                                <Col xs={12} >
                                    <img src={values.image} className="rounded-circle" alt="default" height="150" width="150" />
                                </Col>
                                <Col xs={12} style={{ paddingTop: '30px' }}>
                                    <Modal isOpen={isOpen} toggle={toggleModal}>
                                        <ModalHeader>Choose File:</ModalHeader>
                                        <ModalBody>
                                            <div className="form-group">
                                                <input className="form-control" type="file" id="formFile" onChange={handleFileChange} />
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={handleUpload} size='sm'>
                                                Upload Files
                                            </Button>
                                            <Button onClick={toggle} size='sm' color="black">Cancel</Button>
                                        </ModalFooter>
                                    </Modal>
                                    <Button size="sm" color="primary" onClick={toggleModal}>
                                        Upload Image
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
                                {
                                    user.user.userType === STUDENT ?
                                        <>
                                            <Col xs={12} className="details">
                                                Section: {user.user.section}
                                            </Col>
                                            <Col xs={12} className="details">
                                                Semester: {user.user.semester}
                                            </Col>
                                            <Col xs={12} className="details">
                                                Branch: {user.user.branch}
                                            </Col>
                                        </> :
                                        user.user.userType === TEACHER ?
                                            <>
                                                <Col xs={12} className="details">
                                                    Primary Subject: {user.user.subject}
                                                </Col>
                                                <Col xs={12} className="details">
                                                    Highest Degree: {user.user.degree}
                                                </Col>
                                                <Col xs={12} className="details">
                                                    Position : {user.user.position}
                                                </Col>
                                            </> :
                                            <>
                                                <Col xs={12} className="details">
                                                    Role: {user.user.role}
                                                </Col>
                                                <Col xs={12} className="details">
                                                    Highest Degree: {user.user.degree}
                                                </Col>
                                            </>

                                }
                                <Col xs={12} className="details" style={{ textAlign: 'center', color: 'red' }}>
                                    Other info will be shown once user data is retrieved from college!
                                </Col>
                            </Row>
                        </div>
                        <NotificationContainer />
                    </Row> :
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <ReactLoading type={"spin"} color={"blue"} height={'50px'} width={'50px'} />
                    </div>
            }
        </Container>
    )
}

export default DashboardPage;