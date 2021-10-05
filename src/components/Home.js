import React, { useState } from 'react';
import SideBar from './Sidebar';
import SidePanel from './SidePanel';
const Home = ({ user }) => {

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="App">
            <SideBar toggle={toggleSidebar} isOpen={isSidebarOpen} />
            <SidePanel toggleSidebar={toggleSidebar} sideBarIsOpen={isSidebarOpen} user={user} />
        </div>
    )
}

export default Home;