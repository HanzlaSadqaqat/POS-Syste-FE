import React, { useEffect, useState } from "react";
// import logo from '../../assets/images/logo-removebg-preview.png'
import logo from "../../assets/images/logo.png";
import { TbCategory } from "react-icons/tb";
import { FaUnity } from "react-icons/fa6";
import { RiUserAddLine } from "react-icons/ri";
import { MdOutlineSpaceDashboard, MdReport } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

import { Layout, Menu, theme } from "antd";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/reducers/slices/authSlice";
import axios from "axios";
const { Header, Content, Footer, Sider } = Layout;

const items = [
  { text: "Dashboard", icon: MdOutlineSpaceDashboard, route: "/dashboard" },
  { text: "Categories", icon: TbCategory, route: "/category" },
  { text: "Products", icon: FaUnity, route: "/product" },
  { text: "Users", icon: RiUserAddLine, route: "/user" },
  { text: "Order History", icon: MdOutlineSpaceDashboard, route: "/history" },
  { text: "Reports", icon: MdReport, route: "/reports" }, 
];
const barElements = items.map((item, index) => ({
  key: String(index + 1),
  icon: React.createElement(item.icon),
  label: item.text,
}));
const Sidebar = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(
        loginSuccess({ isLogin: false, accessToken: "", role: "", email: "" })
      );
      localStorage.removeItem("accessToken");
    } catch (error) {
      console.log(error);
    }
  };

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
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="demo-logo-vertical" />
            <Header className="flex border border-blue-500 rounded-lg m-1 pl-0">
              <img src={logo} alt="logo" />{" "}
              <span className="text-white ">Admin </span>{" "}
            </Header>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              onSelect={(e) => {
                props.onChangeTab(e.key);
              }}
              className="mt-5"
              items={barElements}
            />
          </div>
          <Footer
            style={{
              backgroundColor: "transparent",
              color: "white",
            }}
            className="flex gap-2 items-center cursor-pointer"
          >
            <div
              onClick={handleLogout}
              className="flex gap-2 items-center cursor-pointer p-2  rounded-xl hover:bg-white hover:bg-opacity-10 transition duration-300"
            >
              <FiLogOut className="text-[20px]" />
              Logout
            </div>
          </Footer>
        </div>
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
      </Layout>
    </Layout>
  );
};
export default Sidebar;
