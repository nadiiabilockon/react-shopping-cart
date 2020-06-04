import React from "react";
import { Icon, Menu, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const NavBarMobile = ({ items, onToggle, visible }) => (
  <div className="mobile-nav">
    <Menu text>
      <Container>
        <Menu.Item>
          <Link to="/cart">
            <Icon name="cart"></Icon>
          </Link>
        </Menu.Item>
        <Menu.Item className="nav-logo">
          <Link to="/">hebe.</Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item onClick={onToggle}>
            <Icon name="sidebar" />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
    <Menu
      vertical
      fluid
      text
      className="mobile-nav--toggle"
      style={{ display: visible ? "block" : "none" }}
    >
      <Container>
        {items.map((item, i) => (
          <Menu.Item key={i}>
            <Link to={item.to}>{item.content}
            </Link>
          </Menu.Item>
        ))}
      </Container>
    </Menu>
  </div>
);
