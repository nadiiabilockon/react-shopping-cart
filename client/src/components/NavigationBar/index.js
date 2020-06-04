import React, { useState } from "react";
import { Responsive, Menu, Container, Sticky } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./index.less";

import { NavBarMobile } from "./NavBarMobile";
import { NavBarDesktop } from "./NavBarDesktop";

export const NavigationBar = ({ contextRef, userInfo }) => {
    const [visible, setVisible] = useState(false);
    const userRole = userInfo.isAdmin === "true" ? "admin" : "user";

    const leftItems = [
        { allowedRoles: ["user", "admin"], content: "Shop", to: "/" },
        { allowedRoles: ["admin"], content: "Products", to: "/products" },
    ];

    const filtereItems = leftItems.filter(item => item.allowedRoles.some((role) => role === userRole))

    return (
        <Sticky context={contextRef} className="navbar">
            <ul className="info-bar">
                <Container textAlign="right">
                    {userInfo ? (
                        <React.Fragment>
                            <li>
                                <Link to="/account">My account</Link>
                            </li>
                            <li>&nbsp; · &nbsp;</li>
                            <li>
                                <Link to="/logout">Log out</Link>
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
                    items={filtereItems}
                    onToggle={() => setVisible((prevState) => !prevState)}
                    visible={visible}
                />
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <NavBarDesktop items={filtereItems} />
            </Responsive>
        </Sticky>
    );
};
