import { faAlignLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Mail, MailOutline, Person } from '@mui/icons-material';
import {
    Avatar, Box,
    Card, Container as MContainer, CssBaseline, Grid,
    InputAdornment, TextField, Typography, useTheme
} from '@mui/material';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
const ContactUsPage = ({ toggleSidebar, sideBarIsOpen }) => {

    const theme = useTheme()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const submitHandler = () => {
        console.log(name, email, phoneNumber, message)
        setName('')
        setEmail('')
        setMessage('')
        setPhoneNumber('')
    }


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
                    Contact Us<FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '5px' }} />
                </Col>
            </Row>
            <Row>
                <MContainer component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '12px',
                                [theme.breakpoints.up('md')]: {
                                    width: '600px',
                                    p: 6,
                                },
                                [theme.breakpoints.down('md')]: {
                                    width: '450px',
                                    p: 2,
                                },
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <MailOutline />
                            </Avatar>
                            <Typography component="h1" variant="h5" sx={{ mb: 5 }}>
                                Contact Us
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid sx={{
                                    [theme.breakpoints.up('md')]: {
                                        pr: 1.3,
                                    },
                                }}
                                    item
                                    xs={12}
                                    md={6}>
                                    <TextField
                                        sx={{ mb: 3 }}
                                        id="outlined-name"
                                        label="Full Name"
                                        required
                                        value={name}
                                        InputProps={{
                                            startAdornment: <InputAdornment position='start'>
                                                <Person />
                                            </InputAdornment>
                                        }}
                                    />
                                    <TextField
                                        id="outlined-name"
                                        label="Email"
                                        required
                                        value={name}
                                        InputProps={{
                                            startAdornment: <InputAdornment position='start'>
                                                < Mail />
                                            </InputAdornment>
                                        }}
                                    />
                                </Grid>

                                <Grid sx={{
                                    [theme.breakpoints.up('md')]: {
                                        pr: 1.3,
                                    },
                                }}
                                    item
                                    xs={12}
                                    md={6}>
                                    <TextField
                                        id="outlined-name"
                                        label="Query"
                                        required
                                        multiline
                                        minRows={5}
                                        value={name}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                color="primary"
                                style={{ margin: '10px' }}
                                size='large'
                                onClick={submitHandler}
                            >
                                Send Message
                            </Button>
                        </Card>
                    </Box>
                </MContainer>
            </Row>
        </Container>
    )
}

export default ContactUsPage