import React from "react";
import {
    Icon,
    Image,
    Menu,
    Sidebar
} from "semantic-ui-react";
import { Link } from 'react-router-dom'

export const NavBarMobile = ({
    children,
    leftItems,
    onPusherClick,
    onToggle,
    rightItems,
    visible
}) => (
        <Sidebar.Pushable>
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                vertical
                visible={visible}
                width='wide'
            >
                {leftItems.map(item => <Menu.Item {...item} />)}
            </Sidebar>
            <Sidebar.Pusher
                dimmed={visible}
                onClick={onPusherClick}
                style={{ minHeight: "100vh" }}
            >
                <Menu fixed="top" inverted>
                    <Menu.Item>
                        <Link to="/">
                            hebe.
                         </Link>
                        {/* <Image size="mini" src={require("../../../assets/logo.png")} /> */}
                    </Menu.Item>
                    <Menu.Item onClick={onToggle}>
                        <Icon name="sidebar" />
                    </Menu.Item>
                    <Menu.Menu position="right">
                        {rightItems.map(item => <Menu.Item {...item} />)}
                    </Menu.Menu>
                </Menu>
                {children}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );