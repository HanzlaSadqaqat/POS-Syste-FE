import React, { useState } from "react";
// import logo from '../../assets/images/logo-removebg-preview.png'
import logo from "../../assets/images/logo.png";
import { TbCategory } from "react-icons/tb";
import { FaUnity } from "react-icons/fa6";
import { RiUserAddLine } from "react-icons/ri";
import { MdOutlineSpaceDashboard } from "react-icons/md";

import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const items = [
  { text: "Dashboard", icon: MdOutlineSpaceDashboard, route: "/dashboard" },
  { text: "Categories", icon: TbCategory, route: "/category" },
  { text: "Products", icon: FaUnity, route: "/product" },
  { text: "Users", icon: RiUserAddLine, route: "/user" },
];
const barElements = items.map((item, index) => ({
  key: String(index + 1),
  icon: React.createElement(item.icon),
  label: item.text,
}));
const Sidebar = (props) => {
  const navigate = useNavigate();
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        className=""
      >
        <div className="demo-logo-vertical" />
        <Header className="flex border border-blue-500 rounded-lg m-1 pl-0">
          <img src={logo} alt="logo" />{" "}
          <span className="text-white ">Admin Panel </span>{" "}
        </Header>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onSelect={(e) => {
            console.log(e.key - 1);
            // navigate(items[e.key - 1].route);
            props.onChangeTab(e.key);
          }}
          className="mt-5"
          items={barElements}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
          backgroundColor: "white",
        }}
      >
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div className="relative">{props.body}</div>
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default Sidebar;
