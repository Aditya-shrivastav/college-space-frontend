import React from "react";
import ReactLoading from 'react-loading'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faBook,
    faFileInvoice,
    faEnvelopeOpenText,
    faPaperPlane,
    faBookReader,
    faDollyFlatbed,
    faAlignJustify,
    faSignOutAlt,
    faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { STUDENT, TEACHER, ADMIN } from "../shared/constants";
import history from "../shared/history";

const SideBar = ({ isOpen, toggle, user, logout, attendance }) => {

    const handleLogout = () => {
        logout();
        history.push('/')
    }

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
                        <NavLink tag={Link} to={"/dashboard"}>
                            <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} />
                            Dashboard
                        </NavLink>
                    </NavItem>
                    {
                        user.user.userType === STUDENT ?
                            <>
                                <NavItem onClick={() => attendance()}>
                                    <NavLink tag={Link} to={"/attendance"}>
                                        <FontAwesomeIcon icon={faBook} style={{ marginRight: '10px' }} />
                                        Attendance
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to={"/timeTable"}>
                                        <FontAwesomeIcon icon={faFileInvoice} style={{ marginRight: '10px' }} />
                                        Time Table
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to={"/events"}>
                                        <FontAwesomeIcon icon={faEnvelopeOpenText} style={{ marginRight: '10px' }} />
                                        Events
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to={"/courses"}>
                                        <FontAwesomeIcon icon={faBookReader} style={{ marginRight: '10px' }} />
                                        Courses
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to={"/inventory"}>
                                        <FontAwesomeIcon icon={faDollyFlatbed} style={{ marginRight: '10px' }} />
                                        Inventory
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to={"/others"}>
                                        <FontAwesomeIcon icon={faAlignJustify} style={{ marginRight: '10px' }} />
                                        Others
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to={"/messages"}>
                                        <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '10px' }} />
                                        Messages
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to={"/contactUs"}>
                                        <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: '10px' }} />
                                        Contact Us
                                    </NavLink>
                                </NavItem>
                            </> :
                            user.user.userType === TEACHER ?
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} to={"/mark-attendance"}>
                                            <FontAwesomeIcon icon={faBook} style={{ marginRight: '10px' }} />
                                            Mark Attendance
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to={"/sections"}>
                                            <FontAwesomeIcon icon={faFileInvoice} style={{ marginRight: '10px' }} />
                                            Sections
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to={"/messages"}>
                                            <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '10px' }} />
                                            Messages
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to={"/contactUs"}>
                                            <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: '10px' }} />
                                            Contact Us
                                        </NavLink>
                                    </NavItem>
                                </> :
                                user.user.userType === ADMIN ?
                                    <>
                                        <NavItem>
                                            <NavLink tag={Link} to={"/addEvents"}>
                                                <FontAwesomeIcon icon={faEnvelopeOpenText} style={{ marginRight: '10px' }} />
                                                Add Event
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to={"/addTimeTable"}>
                                                <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: '10px' }} />
                                                Add Time Table
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to={"/addCourse"}>
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
