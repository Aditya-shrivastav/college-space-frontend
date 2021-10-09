import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import { Container, Button, Row, Col, Modal, ModalBody, ModalHeader } from 'reactstrap';
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import app from '../firebaseConfig';
import axios from 'axios';
import { baseUrl, STUDENT, TEACHER } from "../shared/constants";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const storage = getStorage(app);

const DashboardPage = ({ toggleSidebar, sideBarIsOpen, user }) => {

    const [values, setValue] = useState({
        file: null,
        isOpen: false,
        image: '/default-user.jpg'
    })

    const handleChange = (event) => {
        if (event.target.files[0]) {
            console.log(event.target.files[0])
            setValue({ ...values, file: event.target.files[0] });
        }
    }

    const handleUpload = () => {

        const storageRef = ref(storage, `user/images/${values.file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, values.file);

        toggleModal();

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
                            setValue({ ...values, image: url })
                    })
                    return url;
                })
            }

        )
    }

    const toggleModal = () => setValue({ ...values, isOpen: !values.isOpen });


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
                                    <img src={user.user.imageUrl ? user.user.imageUrl : values.image} className="rounded-circle" alt="default" height="150" width="150" />
                                </Col>
                                <Col xs={12} style={{ paddingTop: '30px' }}>
                                    <Modal isOpen={values.isOpen} toggle={toggleModal}>
                                        <ModalHeader toggle={toggleModal}>Choose File:</ModalHeader>
                                        <ModalBody>
                                            <input type="file" onChange={handleChange} />
                                            <Button size="sm" color="primary" onClick={handleUpload}>Update Image</Button>
                                        </ModalBody>
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
                    </Row> :
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <ReactLoading type={"spin"} color={"blue"} height={'50px'} width={'50px'} />
                    </div>
            }
        </Container>
    )
}

export default DashboardPage;