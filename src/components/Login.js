import React, { useState } from 'react';
import { Form, Button } from 'reactstrap';
import { FormControl, InputLabel, IconButton, InputAdornment, Input } from '@material-ui/core';
import { Visibility, VisibilityOff, Email } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { NotificationManager, NotificationContainer } from 'react-notifications/';
import history from '../shared/history';

const Login = ({ login = () => { } }) => {

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
                NotificationManager.success('Logged in successfully!');
                history.push('/home')
            }
            else {
                NotificationManager.error('Login Error');
            }
        })

    }

    return (
        <div className="login-body container-fluid">
            <div className="row">
                <div className="mt-5 col-2 logo" style={{ textAlign: 'end' }}>
                    <img src="/Galgotias_University.png" alt="logo" width="55%" />
                </div>
                <div className="col-3 mt-4 p-10 intro">
                    <div style={{ marginTop: '70%', fontSize: '25px', fontStyle: 'italic', marginBottom: '10px', textDecoration: 'underline' }}>
                        College Space &nbsp; &nbsp;
                    </div>
                    <blockquote style={{ marginLeft: '40px', fontSize: '20px' }}>
                        :- “ Your One place solution for college ”
                    </blockquote>
                </div>
                <div className="login-form col-md-7 col-12">
                    <div className="col-12" style={{ height: 'inherit', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="row login-box" >
                            <div className="col-12" style={{ marginTop: '30px' }}>
                                <div className="col-12" style={{ textAlign: 'center', marginBottom: '15px' }}>LOGIN</div>
                                <div className="col-12" id="login-error" style={{ color: "red", height: 'fit-content', marginBottom: '15px' }}></div>
                                <Form onSubmit={handleSubmit} className="mb-3">
                                    <FormControl className="col-12 mb-2">
                                        <InputLabel htmlFor="input-with-icon-grid">Email</InputLabel>
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
                                    <Button type="submit" color="primary" className="col-12" >Login</Button>
                                </Form>
                                <div className="row mb-2">
                                    <div className="col-12" style={{ textAlign: 'center' }}>OR</div>
                                </div>
                                <div className="row" style={{ textAlign: 'center' }}>
                                    <div className="mb-3 col-12"><Link to="/changePassword">Forgot Password</Link></div>
                                    <div className="col-12">Don't Have an account? <Link to="/signup">Sign up</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NotificationContainer />
        </div>
    )
}

export default Login;