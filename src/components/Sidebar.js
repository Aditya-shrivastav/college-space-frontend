import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faBook,
    faFileInvoice,
    faEnvelopeOpenText,
    faPaperPlane,
    faBookReader,
    faDollyFlatbed,
    faAlignJustify
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen, toggle }) => (
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
                    <NavLink tag={Link} to={"/home"}>
                        <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} />
                        Dashboard
                    </NavLink>
                </NavItem>
                <NavItem>
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
                    <NavLink tag={Link} to={"/contactUs"}>
                        <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: '10px' }} />
                        Contact Us
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
    </div>
);

export default SideBar;
