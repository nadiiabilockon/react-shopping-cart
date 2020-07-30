import React, { useState, useEffect, useRef } from "react";
import { Responsive, Container, Sticky } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import "./index.less";

import { NavBarMobile } from "./NavBarMobile";
import { NavBarDesktop } from "./NavBarDesktop";

export const NavigationBar = ({ contextRef, userInfo }) => {
    const [visible, setVisible] = useState(false);
    const menuRef = useRef(null);
    const userRole = userInfo?.isAdmin === "true" ? "admin" : "user";

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    const leftItems = [
        { allowedRoles: ["user", "admin"], content: "Shop", to: "/" },
        { allowedRoles: ["admin"], content: "Products", to: "/products" },
        { allowedRoles: ["admin"], content: "Orders", to: "/orders" }
    ];

    const filtereItems = leftItems.filter(item => item.allowedRoles.some((role) => role === userRole))

    return (
        <Sticky context={contextRef} className="navbar" data-testid="headerComponent">
            <ul className="info-bar">
                <Container textAlign="right">
                    {userInfo ? (
                        <React.Fragment>
                            <li>
                                <Link to="/account">My account</Link>
                            </li>
                            <li>&nbsp; · &nbsp;</li>
                            <li onClick={handleLogout}>
                                <Link to="/">Log out</Link>
                            </li>
                        </React.Fragment>
                    ) : (
                            <React.Fragment>
                                <li>
                                    <Link to="/signin">Log in</Link>
                                </li>
                                <li>&nbsp; · &nbsp;</li>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </React.Fragment>
                        )}
                </Container>
            </ul>
            <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
                <NavBarMobile
                    menuRef={menuRef}
                    items={filtereItems}
                    onToggle={setVisible}
                    visible={visible}
                />
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <NavBarDesktop items={filtereItems} />
            </Responsive>
        </Sticky>
    );
};
