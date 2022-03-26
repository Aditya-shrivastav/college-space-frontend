import React from 'react'
import Login from './Login'
import { Dashboard, Attendance, FacultyCourses, MarkAttendance, CourseFiles, StudentCoursePage, TimeTable, Events, Messages, Conversation, ContactUs, Others } from './Home'
import Signup from './Signup'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { loginUser, signupUser, getUser, logoutReducer, fetchAttendace, fetchCoursesOfFaculty, fetchStudentCourses, fetchStudentTimeTable, fetchUnreadEvents } from '../redux/actionCreator'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { STUDENT } from '../shared/constants'

const mapStateToProps = (state) => {
    return {
        login: state.login,
        signup: state.signup,
        user: state.user,
        student: state.student,
        faculty: state.faculty
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loginUser: (creds) => loginUser(creds),
        signupUser: (creds) => signupUser(creds),
        getUser: () => getUser(),
        logout: () => logoutReducer(),
        fetchAttendace: () => fetchAttendace(),
        fetchFacultyCourses: () => fetchCoursesOfFaculty(),
        fetchStudentCourses: () => fetchStudentCourses(),
        fetchTimeTable: () => fetchStudentTimeTable(),
        fetchUnreadEvents: () => fetchUnreadEvents()
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

        const AttendanceRouter = ({ match }) => {
            return (
                this.props.faculty.courses ?
                    <MarkAttendance logout={this.props.logout} facultyCourses={this.props.fetchFacultyCourses} course={this.props.faculty.courses.filter((course) => course.courseId === match.params.id)[0]} /> :
                    <MarkAttendance logout={this.props.logout} facultyCourses={this.props.fetchFacultyCourses} />
            )
        }

        const CourseFileRouter = ({ match }) => {
            return (
                localStorage.getItem('user') === STUDENT ?
                    (this.props.student.courses ?
                        <CourseFiles student={this.props.student} logout={this.props.logout} fetchCourses={this.props.fetchStudentCourses} course={this.props.student.courses.filter((course) => course.courseId === match.params.id)[0]} timeTable={this.props.fetchTimeTable} unreadEvents={this.props.fetchUnreadEvents} /> :
                        <CourseFiles student={this.props.student} logout={this.props.logout} fetchCourses={this.props.fetchStudentCourses} timeTable={this.props.fetchTimeTable} unreadEvents={this.props.fetchUnreadEvents} />) :
                    this.props.faculty.courses ?
                        <CourseFiles logout={this.props.logout} fetchCourses={this.props.fetchFacultyCourses} course={this.props.faculty.courses.filter((course) => course.courseId === match.params.id)[0]} /> :
                        <CourseFiles logout={this.props.logout} fetchCourses={this.props.fetchFacultyCourses} />
            )
        }

        const CourseRouter = ({ match }) => {
            return (
                match.params.page === 'attendance' ?
                    <FacultyCourses faculty={this.props.faculty} logout={this.props.logout} facultyCourses={this.props.fetchFacultyCourses} page="attendance" /> :
                    <FacultyCourses faculty={this.props.faculty} logout={this.props.logout} facultyCourses={this.props.fetchFacultyCourses} page="upload" />
            )
        }

        const ConversationRouter = ({ match }) => {
            console.log(match.params)
            return (
                match.params.id ?
                    <Conversation logout={this.props.logout} student={this.props.student} attendance={this.props.fetchAttendace} courses={this.props.fetchStudentCourses} timeTable={this.props.fetchTimeTable} unreadEvents={this.props.fetchUnreadEvents} id={match.params.id} name={match.params.name} /> :
                    <Conversation logout={this.props.logout} student={this.props.student} attendance={this.props.fetchAttendace} courses={this.props.fetchStudentCourses} timeTable={this.props.fetchTimeTable} unreadEvents={this.props.fetchUnreadEvents} />
            )
        }

        const DashBoard = () => {
            return (
                localStorage.getItem('user') === STUDENT ?
                    <Dashboard user={this.props.user} student={this.props.student} logout={this.props.logout} attendance={this.props.fetchAttendace} fetchCourses={this.props.fetchStudentCourses} timeTable={this.props.fetchTimeTable} unreadEvents={this.props.fetchUnreadEvents} /> :
                    <Dashboard user={this.props.user} logout={this.props.logout} fetchCourses={this.props.fetchFacultyCourses} />
            )
        }

        const ContactUS = () => {
            return (
                localStorage.getItem('user') === STUDENT ?
                    <ContactUs user={this.props.user} student={this.props.student} logout={this.props.logout} attendance={this.props.fetchAttendace} fetchCourses={this.props.fetchStudentCourses} timeTable={this.props.fetchTimeTable} unreadEvents={this.props.fetchUnreadEvents} /> :
                    <ContactUs user={this.props.user} logout={this.props.logout} fetchCourses={this.props.fetchFacultyCourses} />
            )
        }


        return (
            <div style={{ width: '100vw', height: '100vh' }}>
                <Switch>
                    <Route exact path="/" component={() => <Login login={this.props.loginUser} getUser={this.props.getUser} />} />
                    <Route path="/signup" component={() => <Signup signup={this.props.signupUser} />} />
                    <PrivateRoute path="/dashboard" component={DashBoard} />
                    {/* <PrivateRoute path="/contactUs" component={ContactUS} /> */}
                    <PrivateRoute path="/attendance" component={() => <Attendance student={this.props.student} logout={this.props.logout} attendance={this.props.fetchAttendace} courses={this.props.fetchStudentCourses} timeTable={this.props.fetchTimeTable} unreadEvents={this.props.fetchUnreadEvents} />} />
                    <PrivateRoute path="/showCourses/:page" component={CourseRouter} />
                    <PrivateRoute path="/markAttendance/:id" component={AttendanceRouter} />
                    <PrivateRoute path="/courses" component={() => <StudentCoursePage logout={this.props.logout} student={this.props.student} attendance={this.props.fetchAttendace} courses={this.props.fetchStudentCourses} timeTable={this.props.fetchTimeTable} unreadEvents={this.props.fetchUnreadEvents} />} />
                    <PrivateRoute path="/courseFiles/:id" component={CourseFileRouter} />
                    <PrivateRoute path="/events" component={() => <Events logout={this.props.logout} student={this.props.student} attendance={this.props.fetchAttendace} courses={this.props.fetchStudentCourses} timeTable={this.props.fetchTimeTable} unreadEvents={this.props.fetchUnreadEvents} />} />
                    <PrivateRoute path="/showTimeTable" component={() => <TimeTable logout={this.props.logout} student={this.props.student} attendance={this.props.fetchAttendace} courses={this.props.fetchStudentCourses} timeTable={this.props.fetchTimeTable} unreadEvents={this.props.fetchUnreadEvents} />} />
                    <PrivateRoute path="/messages" component={() => <Messages logout={this.props.logout} student={this.props.student} attendance={this.props.fetchAttendace} courses={this.props.fetchStudentCourses} timeTable={this.props.fetchTimeTable} unreadEvents={this.props.fetchUnreadEvents} />} />
                    <PrivateRoute path="/conversation/:id/:name" component={ConversationRouter} />
                    <PrivateRoute path="/others" component={() => <Others logout={this.props.logout} student={this.props.student} attendance={this.props.fetchAttendace} courses={this.props.fetchStudentCourses} timeTable={this.props.fetchTimeTable} unreadEvents={this.props.fetchUnreadEvents} />} />
                    <Redirect to="/" />
                </Switch>
            </div >
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));