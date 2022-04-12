import React, { useState } from 'react';
import { Form, Button } from 'reactstrap';
import { FormControl, InputLabel, IconButton, InputAdornment, Input } from '@material-ui/core';
import { Visibility, VisibilityOff, Email } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { NotificationManager, NotificationContainer } from 'react-notifications/';
import history from '../shared/history';
import GuLogo from '../images/Galgotias_University.png'
import { Container, Row, Col } from 'reactstrap'

const Login = ({ login = () => { }, getUser = () => { } }) => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false
    })


    const handleChange = (field) => (event) => {
        setValues({ ...values, [field]: event.target.value });
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        login({
            email: values.email,
            password: values.password
        }).then((res) => {
            console.log(res)
            if (res.success) {
                history.push('/dashboard')
                return true;
            }
            else {
                NotificationManager.error('Login Error');
                document.getElementById('login-error').innerHTML = res.err
                return false;
            }
        }).then((res) => {
            console.log(res)
            if (res) {
                getUser()
                    .then((res) => {
                        if (!res.success) {
                            history.push('/login')
                            NotificationManager.error(res.message)
                        }
                    })
            }
        })

    }

    return (
        <Container fluid className="login-body container-fluid">
            <Row className='row' style={{ width: '100%', height: '100vh' }}>
                <Col className="login-first-col" lg="2" md="1" style={{ paddingTop: '2em' }}>
                    <div style={{ width: 'fit-content', margin: 'auto', padding: '1em' }}>
                        {/* <div className="first"> */}
                        <img src="./graduation-hat.png" alt="graduation-hat" />
                        {/* </div> */}
                        <div className='app-name'>College space</div>
                    </div>
                </Col>
                <Col className='login-second-col' lg="2" md="1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0' }}>
                    <div className="second">
                        <img src="./notebook2.png" alt="notebook" />
                    </div>
                </Col>
                <Col className='login-third-col' lg="2" md="1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0' }}>
                    <div className="quote" style={{}}>:- “ Your One place solution for college ”</div>
                </Col>
                <Col xs="12" md="7" lg="5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0' }}>
                    <div className="login-box">
                        <div className="col-12" style={{ marginTop: '30px', textAlign: 'center' }}>
                            <img width="106px" height="100px" src={GuLogo} alt="logo" />
                            <div className="col-12 login-name">LOGIN</div>
                            <div className="col-12" id="login-error" style={{ color: "red", height: 'fit-content', marginBottom: '15px' }}></div>
                            <Form onSubmit={handleSubmit} className="mb-3">
                                <FormControl className="col-12 mb-2 form-control">
                                    <InputLabel htmlFor="input-with-icon-grid input-label">Email</InputLabel>
                                    <Input
                                        type="email"
                                        onChange={handleChange('email')}
                                        value={values.email}
                                        id="input-with-icon-grid"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <Email />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <FormControl className="col-12 mb-5">
                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <div className='row' style={{ textAlign: 'center' }}>
                                    <div className="col-12 col-lg-5 forget-password"><Link to="/changePassword" style={{ textDecoration: 'none', color: '#008FE0' }}>Forgot Password</Link></div>
                                    <div className="col-lg-5 col-12 login-button">
                                        <Button type="submit" color="primary" style={{ borderRadius: '10px', width: '100%' }}>Login</Button>
                                    </div>
                                </div>
                            </Form>
                            <div className="row go-singup">
                                <div className="col-12">Don't Have an account?</div>
                                <div className='col-12'><Link to="/signup" style={{ textDecoration: 'none', color: '#008FE0' }}>Sign up</Link></div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <NotificationContainer />
        </Container>

    )
}

export default Login;