import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const NavBarDesktop = ({ leftItems, rightItems }) => (
  <Menu inverted>
    <Menu.Item>
      <Link to="/">hebe.</Link>
    </Menu.Item>
    {leftItems.map((item) => (
      <Menu.Item {...item} />
    ))}
    <Menu.Menu position="right">
      {rightItems.map((item) => (
        <Menu.Item {...item} />
      ))}
    </Menu.Menu>
  </Menu>
);
