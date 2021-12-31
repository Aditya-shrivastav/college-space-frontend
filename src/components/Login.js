import React, { useState } from 'react';
import { Form, Button } from 'reactstrap';
import { FormControl, InputLabel, IconButton, InputAdornment, Input } from '@material-ui/core';
import { Visibility, VisibilityOff, Email } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { NotificationManager, NotificationContainer } from 'react-notifications/';
import history from '../shared/history';
import GuLogo from '../images/Galgotias_University.png'

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
                NotificationManager.success('Logged in successfully!');
                history.push('/dashboard')
                return true;
            }
            else {
                NotificationManager.error('Login Error');
                return false;
            }
        }).then((res) => {
            console.log(res)
            if (res)
                getUser();
        })

    }

    return (
        <>
            <div className="login-body container-fluid" style={{ border: '1px solid black', minWidth: 'inherit', margin: 0, padding: 0, minHeight: 'inherit' }}>
                <svg width="438" height="338" viewBox="0 0 438 338" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M222.006 -141.035C280.118 -131.934 310.171 -92.9998 356.851 -68.798C400.407 -46.2154 374.816 -64.6025 391 -30.013C407.178 4.56345 448.069 22.8758 435 58C420.189 97.8078 375.016 95.9309 329 124C283.343 151.85 275.635 241.96 213 240C153.715 238.145 83.1627 354.348 31 336C-26.9682 315.609 -112.797 256.597 -123.321 214.409C-133.889 172.041 -49.2185 30.8695 -29 -10C-8.64063 -51.1543 -16.8286 -89.0719 29.7077 -120.033C76.1967 -150.963 157.237 -151.179 222.006 -141.035Z" fill="url(#paint0_linear_4_30)" />
                    <defs>
                        <linearGradient id="paint0_linear_4_30" x1="-124.229" y1="95.4763" x2="437.536" y2="95.4763" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#A1C4FD" />
                            <stop offset="1" stop-color="#C2E9FB" />
                        </linearGradient>
                    </defs>
                </svg>
                <svg width="1540" height="521" viewBox="0 0 1500 521" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M337.892 380.843C361.209 304.471 696.632 341.406 731.34 242.612C761.774 155.985 960.511 317.027 1037.66 258.412C1109.1 204.135 1166.94 146.282 1255.8 137.303C1337.01 129.096 1454.89 193.065 1537.46 126.67C1610.28 68.1137 1488.45 -51.2169 1525 25.1417C1561.45 101.284 1623.91 252.43 1586.77 333.698C1555.77 401.505 1489.56 500.287 1440.05 558.817C1377.59 632.657 1222.47 661.56 1125.84 657.479C1022.19 653.101 -108.441 730.909 -67.7653 638.767C-45.4998 588.33 320.271 438.556 337.892 380.843Z" fill="url(#paint0_linear_3_4)" />
                    <defs>
                        <linearGradient id="paint0_linear_3_4" x1="941.482" y1="798.25" x2="685.32" y2="213.88" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#A1C4FD" />
                            <stop offset="1" stop-color="#C2E9FB" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className='graduation-hat'></div>
                <div className='app-name'>College space</div>
                <div className="notebook"></div>
                <div className="quote">:- “ Your One place solution for college ”</div>
                <div className="row login-box" >
                    <div className="col-12" style={{ marginTop: '30px', textAlign: 'center' }}>
                        <img width="106px" height="100px" src={GuLogo} alt="logo" />
                        <div className="col-12" style={{ textAlign: 'center', marginBottom: '15px', marginTop: '25px', fontWeight: '600' }}>LOGIN</div>
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
                            <div className='row'>
                                <div className="col-6" style={{ marginTop: '8px' }}><Link to="/changePassword" style={{ textDecoration: 'none', color: '#008FE0' }}>Forgot Password</Link></div>
                                <div className="col-4" style={{ marginLeft: '35px' }}>
                                    <Button type="submit" color="primary" className="col-12" style={{ borderRadius: '10px' }}>Login</Button>
                                </div>
                            </div>
                        </Form>
                        <div className="row" style={{ textAlign: 'center', marginTop: '3em' }}>
                            <div className="col-12">Don't Have an account?</div>
                            <div className='col-12'><Link to="/signup" style={{ textDecoration: 'none', color: '#008FE0' }}>Sign up</Link></div>
                        </div>
                    </div>
                </div>
                <NotificationContainer />
            </div>
        </>
    )
}

export default Login;