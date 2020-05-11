import React from "react";
import {
    Image,
    Menu
} from "semantic-ui-react";
import { Link } from 'react-router-dom'

export const NavBarDesktop = ({ leftItems, rightItems }) => (
    <Menu fixed="top" inverted>
        <Menu.Item>
            <Link to="/">
                          hebe.

            </Link>
            {/* <Image size="mini" src={require("../../../assets/logo.png")} /> */}
        </Menu.Item>
        {leftItems.map(item => <Menu.Item {...item} />)}
        <Menu.Menu position="right">
            {rightItems.map(item => <Menu.Item {...item} />)}
        </Menu.Menu>
    </Menu>
);