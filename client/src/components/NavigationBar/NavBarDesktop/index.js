import React from "react";
import { Menu, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const NavBarDesktop = ({ items }) => (
  <div className="desktop-nav">
    <Menu text>
      <Container>
        <Menu.Item className="nav-logo">
          <Link to="/">hebe.</Link>
        </Menu.Item>
        <Menu.Menu position='right'>
          {items.map((item, i) => (
            <Menu.Item key={i}>
              <Link to={item.to}>{item.content}
              </Link>
            </Menu.Item>
          ))}
          <Menu.Item>
            <Link to="/cart"> Cart
        </Link>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  </div>
);
