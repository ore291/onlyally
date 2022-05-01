import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaHeart, FaGem } from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";

export default function CustomSideBar() {
  return (
    <>
      <ProSidebar>
        <Menu>
          <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
          <SubMenu title="Components" icon={<FaHeart />}>
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
      ;
    </>
  );
}
