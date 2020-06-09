import React from "react";
import { Icon, Menu, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const NavBarMobile = ({ items, onToggle, visible, menuRef }) => (
  <div className="mobile-nav" ref={menuRef}>
    <Menu text>
      <Container>
        <Menu.Item>
          <Link to="/cart" onClick={() => onToggle(false)}>
            <Icon name="cart"></Icon>
          </Link>
        </Menu.Item>
        <Menu.Item className="nav-logo">
          <Link to="/" onClick={() => onToggle(false)}>
            hebe.
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item onClick={() => onToggle((prevState) => !prevState)}>
            <Icon name="sidebar" />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
    {visible && (
      <Menu vertical fluid text className="mobile-nav--toggle">
        <Container>
          {items.map((item, i) => (
            <Menu.Item key={i}>
              <Link onClick={() => onToggle(false)} to={item.to}>
                {item.content}
              </Link>
            </Menu.Item>
          ))}
        </Container>
      </Menu>
    )}
  </div>
);
