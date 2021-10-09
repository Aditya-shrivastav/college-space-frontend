import React, { useState } from 'react';
import SideBar from './Sidebar';
import DashboardPage from './Dashboard';
import AttendancePage from './Attendance';


const Dashboard = ({ user, logout = () => { }, attendance = () => { } }) => {

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="App">
            <SideBar toggle={toggleSidebar} isOpen={isSidebarOpen} user={user} logout={logout} attendance={attendance} />
            <DashboardPage toggleSidebar={toggleSidebar} sideBarIsOpen={isSidebarOpen} user={user} />
        </div>
    )
}

const Attendance = ({ user, logout = () => { }, attendance = () => { } }) => {

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="App">
            <SideBar toggle={toggleSidebar} isOpen={isSidebarOpen} user={user} logout={logout} attendance={attendance} />
            <AttendancePage toggleSidebar={toggleSidebar} sideBarIsOpen={isSidebarOpen} user={user} />
        </div>
    )
}

export { Dashboard, Attendance };