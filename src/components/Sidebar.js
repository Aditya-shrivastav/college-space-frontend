import {
    faAlignJustify, faBook, faBookReader, faCircle, faEnvelope, faEnvelopeOpenText, faFileInvoice, faHome, faPaperPlane, faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { collection, getFirestore, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect } from "react";
import ReactLoading from 'react-loading';
import { NavLink as Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import app from '../firebaseConfig';
import { ADMIN, STUDENT, TEACHER } from "../shared/constants";
import history from "../shared/history";
const db = getFirestore(app);

const q = query(collection(db, "events"));
const q2 = query(collection(db, "admins"));



const SideBar = ({ isOpen, toggle = () => { }, logout = () => { }, attendance = () => { }, fetchCourses = () => { }, timeTable = () => { }, unreadEvents = () => { }, student }) => {

    //const [unreadEvents, setUnreadEvents] = useState(false)

    const handleLogout = () => {
        logout();
        history.push('/')
    }


    useEffect(() => {
        onSnapshot(q, async (docs) => {
            unreadEvents();
        })

        onSnapshot(q2, (docs) => {
            console.log('hi')
        })
    }, [])


    return (
        <div className={classNames("sidebar", { "is-open": isOpen })}>
            <div className="sidebar-header">
                <span color="info" onClick={toggle} style={{ color: "#fff" }}>
                    &times;
                </span>

                <h4><img src="/gu-logo.png" width="35" height="35" alt="logo" />  Galgotias University</h4>
            </div>
            <div className="side-menu">
                <Nav vertical className="list-unstyled pb-5">
                    <NavItem>
                        <NavLink tag={Link} to={"/dashboard"} activeClassName="sidebar-active-tab" >
                            <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} />
                            Dashboard
                        </NavLink>
                    </NavItem>
                    {
                        localStorage.getItem('user') === STUDENT ?
                            <>
                                <NavItem onClick={() => attendance()}>
                                    <NavLink tag={Link} to={"/attendance"} activeClassName="sidebar-active-tab">
                                        <FontAwesomeIcon icon={faBook} style={{ marginRight: '10px' }} />
                                        Attendance
                                    </NavLink>
                                </NavItem>
                                <NavItem onClick={() => timeTable()}>
                                    <NavLink tag={Link} to={"showTimeTable"} activeClassName="sidebar-active-tab">
                                        <FontAwesomeIcon icon={faFileInvoice} style={{ marginRight: '10px' }} />
                                        Time Table
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to={"/events"} activeClassName="sidebar-active-tab">
                                        <FontAwesomeIcon icon={faEnvelopeOpenText} style={{ marginRight: '10px' }} />
                                        Events
                                        {student.unreadEvents ? <FontAwesomeIcon icon={faCircle} style={{ marginLeft: '20px', color: 'white', fontSize: '12px' }} /> : <div></div>}
                                    </NavLink>
                                </NavItem>
                                <NavItem onClick={() => fetchCourses()}>
                                    <NavLink tag={Link} to={"/courses"} activeClassName="sidebar-active-tab">
                                        <FontAwesomeIcon icon={faBookReader} style={{ marginRight: '10px' }} />
                                        Courses
                                    </NavLink>
                                </NavItem>
                                {
                                    /*
    
                                        ******* WILL BE DEVELOPED IN THE NEXT PHASE OF APPLICATION ********
                                    
                                        <NavItem>
                                            <NavLink tag={Link} to={"/inventory"} activeClassName="sidebar-active-tab">
                                                <FontAwesomeIcon icon={faDollyFlatbed} style={{ marginRight: '10px' }} />
                                                Inventory
                                            </NavLink>
                                        </NavItem> 
                                    */
                                }
                                <NavItem>
                                    <NavLink tag={Link} to={"/others"} activeClassName="sidebar-active-tab">
                                        <FontAwesomeIcon icon={faAlignJustify} style={{ marginRight: '10px' }} />
                                        Others
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to={"/messages"} activeClassName="sidebar-active-tab">
                                        <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '10px' }} />
                                        Messages
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to={"/contactUs"} activeClassName="sidebar-active-tab">
                                        <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: '10px' }} />
                                        Contact Us
                                    </NavLink>
                                </NavItem>
                            </> :
                            localStorage.getItem('user') === TEACHER ?
                                <>
                                    <NavItem onClick={() => fetchCourses()}>
                                        <NavLink tag={Link} to={"/showCourses/attendance"} activeClassName="sidebar-active-tab">
                                            <FontAwesomeIcon icon={faBook} style={{ marginRight: '10px' }} />
                                            Mark Attendance
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to={"/showCourses/upload"} activeClassName="sidebar-active-tab">
                                            <FontAwesomeIcon icon={faFileInvoice} style={{ marginRight: '10px' }} />
                                            Sections
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to={"/messages"} activeClassName="sidebar-active-tab">
                                            <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '10px' }} />
                                            Messages
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to={"/contactUs"} activeClassName="sidebar-active-tab">
                                            <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: '10px' }} />
                                            Contact Us
                                        </NavLink>
                                    </NavItem>
                                </> :
                                localStorage.getItem('user') === ADMIN ?
                                    <>
                                        <NavItem>
                                            <NavLink tag={Link} to={"/addEvents"} activeClassName="sidebar-active-tab">
                                                <FontAwesomeIcon icon={faEnvelopeOpenText} style={{ marginRight: '10px' }} />
                                                Add Event
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to={"/addTimeTable"} activeClassName="sidebar-active-tab">
                                                <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: '10px' }} />
                                                Add Time Table
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to={"/addCourse"} activeClassName="sidebar-active-tab">
                                                <FontAwesomeIcon icon={faEnvelopeOpenText} style={{ marginRight: '10px' }} />
                                                Add course
                                            </NavLink>
                                        </NavItem>
                                    </> :
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <ReactLoading type={"spin"} color={"blue"} height={'50px'} width={'50px'} />
                                    </div>

                    }
                    <NavItem>
                        <NavLink onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px' }} />
                            Log Out
                        </NavLink>
                    </NavItem>
                </Nav>
            </div >
        </div >
    )
};

export default SideBar;
