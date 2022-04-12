import React, { useState } from 'react';
import ContactUsPage from './ContactUs';
import ConversationPage from './Conversation';
import CourseFilesPage from './courseFiles';
import DashboardPage from './Dashboard';
import MessagesPage from './Messages';
import SideBar from './Sidebar';
import AttendancePage from './Students/Attendance';
import StudentCourse from './Students/Courses';
import EventsPage from './Students/Events';
import OthersPage from './Students/Others';
import TimeTablePage from './Students/TimeTable';
import MarkAttendancePage from './Teachers/MarkAttendance';
import ShowCourse from './Teachers/showCourses';

const Dashboard = ({ user, student, logout = () => { }, attendance = () => { }, fetchCourses = () => { }, timeTable = () => { }, unreadEvents = () => { } }) => {

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="App">
            <SideBar toggle={toggleSidebar} isOpen={isSidebarOpen} user={user} logout={logout} attendance={attendance} fetchCourses={fetchCourses} timeTable={timeTable} unreadEvents={unreadEvents} student={student} />
            <DashboardPage toggleSidebar={toggleSidebar} sideBarIsOpen={isSidebarOpen} user={user} />
        </div>
    )
}

const Attendance = ({ student, logout = () => { }, attendance = () => { }, courses = () => { }, timeTable = () => { }, unreadEvents = () => { } }) => {

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="App">
            <SideBar toggle={toggleSidebar} isOpen={isSidebarOpen} logout={logout} attendance={attendance} fetchCourses={courses} timeTable={timeTable} unreadEvents={unreadEvents} student={student} />
            <AttendancePage toggleSidebar={toggleSidebar} sideBarIsOpen={isSidebarOpen} student={student} />
        </div>
    )
}

const FacultyCourses = ({ faculty, logout = () => { }, facultyCourses = () => { }, page }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="App">
            <SideBar toggle={toggleSidebar} isOpen={isSidebarOpen} logout={logout} fetchCourses={facultyCourses} />
            <ShowCourse toggleSidebar={toggleSidebar} sideBarIsOpen={isSidebarOpen} faculty={faculty} page={page} />
        </div>
    )
}

const MarkAttendance = ({ logout = () => { }, facultyCourses = () => { }, course }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="App">
            <SideBar toggle={toggleSidebar} isOpen={isSidebarOpen} logout={logout} fetchCourses={facultyCourses} />
            <MarkAttendancePage toggleSidebar={toggleSidebar} sideBarIsOpen={isSidebarOpen} course={course} />
        </div>
    )
}

const CourseFiles = ({ student, logout = () => { }, fetchCourses = () => { }, course, timeTable = () => { }, unreadEvents = () => { } }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="App">
            <SideBar toggle={toggleSidebar} isOpen={isSidebarOpen} logout={logout} fetchCourses={fetchCourses} timeTable={timeTable} unreadEvents={unreadEvents} student={student} />
            <CourseFilesPage toggleSidebar={toggleSidebar} sideBarIsOpen={isSidebarOpen} course={course} />
        </div>
    )
}

const StudentCoursePage = ({ logout = () => { }, student, attendance = () => { }, courses = () => { }, timeTable = () => { }, unreadEvents = () => { } }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="App">
            <SideBar toggle={toggleSidebar} isOpen={isSidebarOpen} logout={logout} attendance={attendance} fetchCourses={courses} timeTable={timeTable} unreadEvents={unreadEvents} student={student} />
            <StudentCourse toggleSidebar={toggleSidebar} sideBarIsOpen={isSidebarOpen} student={student} />
        </div>
    )
}


const TimeTable = ({ logout = () => { }, student, attendance = () => { }, courses = () => { }, timeTable = () => { }, unreadEvents = () => { } }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="App">
            <SideBar toggle={toggleSidebar} isOpen={isSidebarOpen} logout={logout} attendance={attendance} fetchCourses={courses} timeTable={timeTable} unreadEvents={unreadEvents} student={student} />
            <TimeTablePage toggleSidebar={toggleSidebar} sideBarIsOpen={isSidebarOpen} student={student} />
        </div>
    )
}


const Events = ({ logout = () => { }, student, attendance = () => { }, courses = () => { }, timeTable = () => { }, unreadEvents = () => { } }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="App">
            <SideBar toggle={toggleSidebar} isOpen={isSidebarOpen} logout={logout} attendance={attendance} fetchCourses={courses} timeTable={timeTable} unreadEvents={unreadEvents} student={student} />
            <EventsPage toggleSidebar={toggleSidebar} sideBarIsOpen={isSidebarOpen} student={student} />
        </div>
    )
}

const Messages = ({ logout = () => { }, student, attendance = () => { }, courses = () => { }, timeTable = () => { }, unreadEvents = () => { } }) => {

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="App">
            <SideBar toggle={toggleSidebar} isOpen={isSidebarOpen} logout={logout} attendance={attendance} fetchCourses={courses} timeTable={timeTable} unreadEvents={unreadEvents} student={student} />
            <MessagesPage toggleSidebar={toggleSidebar} sideBarIsOpen={isSidebarOpen} />
        </div>
    )
}

const Conversation = ({ logout = () => { }, student, attendance = () => { }, courses = () => { }, timeTable = () => { }, unreadEvents = () => { }, id, name }) => {

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="App">
            <SideBar toggle={toggleSidebar} isOpen={isSidebarOpen} logout={logout} attendance={attendance} fetchCourses={courses} timeTable={timeTable} unreadEvents={unreadEvents} student={student} />
            <ConversationPage toggleSidebar={toggleSidebar} sideBarIsOpen={isSidebarOpen} conversationId={id} name={name} />
        </div>
    )
}

const ContactUs = ({ user, student, logout = () => { }, attendance = () => { }, fetchCourses = () => { }, timeTable = () => { }, unreadEvents = () => { } }) => {

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="App">
            <SideBar toggle={toggleSidebar} isOpen={isSidebarOpen} user={user} logout={logout} attendance={attendance} fetchCourses={fetchCourses} timeTable={timeTable} unreadEvents={unreadEvents} student={student} />
            <ContactUsPage toggleSidebar={toggleSidebar} sideBarIsOpen={isSidebarOpen} />
        </div>
    )
}

const Others = ({ logout = () => { }, student, attendance = () => { }, courses = () => { }, timeTable = () => { }, unreadEvents = () => { } }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="App">
            <SideBar toggle={toggleSidebar} isOpen={isSidebarOpen} logout={logout} attendance={attendance} fetchCourses={courses} timeTable={timeTable} unreadEvents={unreadEvents} student={student} />
            <OthersPage toggleSidebar={toggleSidebar} sideBarIsOpen={isSidebarOpen} />
        </div>
    )
}

export { Dashboard, Attendance, FacultyCourses, MarkAttendance, CourseFiles, StudentCoursePage, TimeTable, Events, Messages, Conversation, ContactUs, Others };
