import React, { Component } from "react";
import {
    Responsive
} from "semantic-ui-react";
import { Link } from 'react-router-dom'

import { NavBarMobile } from './NavBarMobile';
import { NavBarDesktop } from './NavBarDesktop';

const NavBarChildren = ({ children }) => (
    <React.Fragment>{children}</React.Fragment>
);

export class NavigationBar extends Component {
    state = {
        visible: false
    };

    handlePusher = () => {
        const { visible } = this.state;

        if (visible) this.setState({ visible: false });
    };

    handleToggle = () => this.setState({ visible: !this.state.visible });

    render() {
        const { children } = this.props;
        const { visible } = this.state;

        const leftItems = [
            { as: Link, content: "Shop", key: "shop", to: '/' },
            { as: Link, content: "My Boyfriends Back", key: "boyfriendsBack", to: '/' }
        ];

        const rightItems = [
          { as: Link, to: "/cart", content: "Cart", key: "cart" },
          { as: Link, to: "/signin", content: "Login", key: "login" },
          { as: Link, to: "/register", content: "Register", key: "register" },
        ];

        return (
            <React.Fragment>
                <Responsive {...Responsive.onlyMobile}>
                    <NavBarMobile
                        leftItems={leftItems}
                        onPusherClick={this.handlePusher}
                        onToggle={this.handleToggle}
                        rightItems={rightItems}
                        visible={visible}
                    >
                        <NavBarChildren>{children}</NavBarChildren>
                    </NavBarMobile>
                </Responsive>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
                    <NavBarChildren>{children}</NavBarChildren>
                </Responsive>
            </React.Fragment>
        );
    }
}