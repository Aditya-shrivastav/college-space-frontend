import React, { useState } from 'react';
import { Form, Button } from 'reactstrap';
import { FormControl, InputLabel, IconButton, InputAdornment, Input, TextField, Select, MenuItem } from '@material-ui/core';
import { Visibility, VisibilityOff, Email } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications'

const Signup = ({ signup = () => { } }) => {

    const [values, setValues] = useState({
        email: '',
        name: '',
        branch: '',
        semester: '',
        section: '',
        password: '',
        confirmPassword: '',
        userType: '',
        showConfirmPassword: false,
        showPassword: false
    })

    const handleChange = (field) => (event) => {
        setValues({ ...values, [field]: event.target.value });
    }

    const handleClickShowPassword = (field) => (event) => {
        setValues({ ...values, [field]: !values[field] });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        signup({
            email: values.email,
            password: values.password,
            confirmPassowrd: values.confirmPassword,
            section: values.section,
            semester: values.semester,
            userType: values.userType,
            name: values.name,
            branch: values.branch
        }).then((res) => {
            if (res.success) {
                NotificationManager.success('Signed up successfully!');
            }
            else {
                NotificationManager.error('Singup Error');
            }
        })
    }

    return (
        <div className="login-body container-fluid">
            <div className="row">
                <div className="mt-5 col-2 signup-logo" style={{ textAlign: 'end' }}>
                    <img src="/Galgotias_University.png" alt="logo" width="55%" />
                </div>
                <div className="col-3 mt-4 p-10 signup-intro">
                    <div style={{ marginTop: '70%', fontSize: '25px', fontStyle: 'italic', marginBottom: '10px', textDecoration: 'underline' }}>
                        College Space &nbsp; &nbsp;
                    </div>
                    <blockquote style={{ marginLeft: '40px', fontSize: '20px' }}>
                        :- “ Your One place solution for college ”
                    </blockquote>
                </div>
                <div className="signup-form col-md-7 col-12">
                    <div className="col-12" style={{ height: 'inherit', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="row signup-box" >
                            <div className="col-12" style={{ marginTop: '30px' }}>
                                <div className="col-12" style={{ textAlign: 'center', marginBottom: '15px' }}>SIGN UP</div>
                                <div className="col-12" id="login-error" style={{ color: "red", height: 'fit-content', marginBottom: '15px' }}></div>
                                <Form onSubmit={handleSubmit} className="mb-3">
                                    <FormControl className="col-12 mb-2">
                                        <TextField required id="standard-basic" label="Name" variant="standard" value={values.name} onChange={handleChange('name')} />
                                    </FormControl>
                                    <FormControl className="col-12 mb-2">
                                        <InputLabel required htmlFor="input-with-icon-grid">Email</InputLabel>
                                        <Input
                                            required
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
                                    <FormControl className="col-sm-3 col-12 mb-2 section">
                                        <InputLabel required id="standard-label">Section</InputLabel>
                                        <Select
                                            required
                                            value={values.section}
                                            onChange={handleChange('section')}
                                            label="section"
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl className="col-sm-3 col-12 mb-2 form semester">
                                        <InputLabel required id="standard-label">Semester</InputLabel>
                                        <Select
                                            required
                                            value={values.semester}
                                            onChange={handleChange('semester')}
                                            label="semester"
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={6}>6</MenuItem>
                                            <MenuItem value={7}>7</MenuItem>
                                            <MenuItem value={8}>8</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl className="col-sm-3 col-12 form mb-2 userType">
                                        <InputLabel required id="standard-label">User</InputLabel>
                                        <Select
                                            required
                                            value={values.userType}
                                            onChange={handleChange('userType')}
                                            label="userType"
                                        >
                                            <MenuItem value={"Student"}>Student</MenuItem>
                                            <MenuItem value={"Teacher"}>Teacher</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl className="col-12 mb-2 branch">
                                        <InputLabel required id="standard-label">Branch</InputLabel>
                                        <Select
                                            required
                                            value={values.branch}
                                            onChange={handleChange('branch')}
                                            label="branch"
                                        >
                                            <MenuItem value={"CSE"}>Computer Sceince</MenuItem>
                                            <MenuItem value={"ME"}>Mechanical</MenuItem>
                                            <MenuItem value={"CE"}>Civil</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl className="col-12 mb-2">
                                        <InputLabel required htmlFor="standard-adornment-password">Password</InputLabel>
                                        <Input
                                            required
                                            id="standard-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword('showPassword')}
                                                    >
                                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    <FormControl className="col-12 mb-3">
                                        <InputLabel required htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                                        <Input
                                            required
                                            id="standard-adornment-password"
                                            type={values.showConfirmPassword ? 'text' : 'password'}
                                            value={values.confirmPassword}
                                            onChange={handleChange('confirmPassword')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword('showConfirmPassword')}
                                                    >
                                                        {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    <Button type="submit" color="primary" className="col-12 mt-2" >Sign up</Button>
                                </Form>
                                <div className="row mb-2">
                                    <div className="col-12" style={{ textAlign: 'center' }}>OR</div>
                                </div>
                                <div className="row" style={{ textAlign: 'center' }}>
                                    <div className="col-12">Have an account? <Link to="/">Login</Link></div>
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

export default Signup;