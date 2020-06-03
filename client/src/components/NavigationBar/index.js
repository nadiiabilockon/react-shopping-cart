import React, { Component } from "react";
import {
    Responsive
} from "semantic-ui-react";
import { Link } from 'react-router-dom'

import { NavBarMobile } from './NavBarMobile';
import { NavBarDesktop } from './NavBarDesktop';

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
        const { visible } = this.state;

        const leftItems = [
            { as: Link, content: "Shop", key: "shop", to: '/' },
            { as: Link, content: "Products", key: "products", to: '/products' }
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
                    />
                </Responsive>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
                </Responsive>
            </React.Fragment>
        );
    }
}