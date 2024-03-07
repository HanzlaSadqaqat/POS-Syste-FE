import React, { useEffect, useState } from "react";

import logo from "../../../../assets/images/logo.png";
import { Layout, Menu } from "antd";
import { TbLogout } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/reducers/slices/authSlice";
import ReportPage from "../../../Admin/ReportPage";

const { Header, Content, Footer, Sider } = Layout;

const UserSidebar = (props) => {
  const [selectedId, setSelectedId] = useState();
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedId && selectedId !== "6") {
      props.getCategoryId(props.categories[selectedId.key - 1]._id);
    }
  }, [selectedId]);

  useEffect(() => {
    const propData = props.categories.map((item, index) => ({
      key: String(index + 1),
      label: item.name,
    }));
    setCategories([...propData, {key:String(6), label:"Reports"}]);
  }, [props.categories]);

  const handleLogout = () => {
    dispatch(logout({}));
    localStorage.removeItem("accessToken");
  };

  return (
    <Layout hasSider className="">
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Header
          style={{ width: "" }}
          className="flex border border-blue-500 rounded-lg m-1   w-40 p-0 "
        >
          <img src={logo} alt="logo" />{" "}
          <span className="text-white    w-48 flex">User Pannel </span>{" "}
        </Header>{" "}
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          onSelect={(info) => {if(info.key !== "6") {setSelectedId(info)} else props.getReport()}}
          style={{
            border: "3px",
            overflow: "hidden",
          }}
          items={categories}
        />
        <Footer
          style={{
            backgroundColor: "transparent",
            color: "white",
            padding: 0,
            margin: 0,
            position: "absolute",
            width: "100%",
            left: 0,
            bottom: 10,
            display: "",
            justifyContent: "center",
          }}
        >
          <span>
            <span
              onClick={props.getReport()}
              className="flex text-[20px] w-fit hover:bg-white hover:bg-opacity-15 transition duration-300 cursor-pointer pl-3 p-2 rounded-full justify-center items-center gap-1 "
            >
              <TbLogout />
              <span className="text-[16px]">Reports</span>
            </span>
          </span>
          <span
            onClick={handleLogout}
            className="flex text-[20px] w-fit hover:bg-white hover:bg-opacity-15 transition duration-300 cursor-pointer pl-3 p-2 rounded-full justify-center items-center gap-1 "
          >
            <TbLogout />
            <span className="text-[16px]">Logout</span>
          </span>
        </Footer>
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        /> */}
        <Content
          style={{
            // margin: "24px 16px ",
            overflow: "initial",
          }}
          className=""
        >
          {props.body}
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
          }}
        ></Footer> */}
      </Layout>
    </Layout>
  );
};
export default UserSidebar;
