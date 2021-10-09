import React from 'react'
import Login from './Login'
import { Dashboard, Attendance } from './Home'
import Signup from './Signup'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { loginUser, signupUser, getUser, logoutReducer, fetchAttendace } from '../redux/actionCreator'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => {
    return {
        login: state.login,
        signup: state.signup,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loginUser: (creds) => loginUser(creds),
        signupUser: (creds) => signupUser(creds),
        getUser: () => getUser(),
        logout: () => logoutReducer(),
        fetchAttendace: () => fetchAttendace()
    }, dispatch)
}

class Main extends React.Component {

    render() {

        const PrivateRoute = ({ component: Component, ...rest }) => {

            return (
                <Route {...rest} render={props => (
                    this.props.login.isAuthenticated ?
                        <Component {...props} />
                        : <Redirect to={{
                            pathname: '/'
                        }} />
                )} />
            );
        };


        return (
            <div style={{ width: '100vw', height: '100vh' }}>
                <Switch>
                    <Route exact path="/" component={() => <Login login={this.props.loginUser} getUser={this.props.getUser} />} />
                    <Route path="/signup" component={() => <Signup signup={this.props.signupUser} />} />
                    <PrivateRoute path="/dashboard" component={() => <Dashboard user={this.props.user} logout={this.props.logout} attendance={this.props.fetchAttendace} />} />
                    <PrivateRoute path="/attendance" component={() => <Attendance user={this.props.user} logout={this.props.logout} attendance={this.props.fetchAttendace} />} />
                    <Redirect to="/" />
                </Switch>
            </div >
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));