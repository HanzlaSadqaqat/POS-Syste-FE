import React, { useEffect, useState } from "react";

import logo from "../../../../assets/images/logo.png";
import { Layout, Menu } from "antd";
import { TbLogout } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/reducers/slices/authSlice";
const { Header, Content, Footer, Sider } = Layout;

const UserSidebar = (props) => {
  const [selectedId, setSelectedId] = useState();
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedId) {
      props.getCategoryId(props.categories[selectedId.key - 1]._id);
    }
  }, [selectedId]);
  useEffect(() => {
    setCategories(
      props.categories.map((item, index) => ({
        key: String(index + 1),
        label: item.name,
      }))
    );
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
          // padding: 10,
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
          // defaultSelectedKeys={["1"]}
          onSelect={(info) => setSelectedId(info)}
          style={{
            border: "3px",

            // height: "80%",
            overflow: "hidden",
          }}
          items={categories}
        />
        <Footer
          style={{
            // height: "10%",
            backgroundColor: "transparent",
            color: "white",
            padding: 0,
            margin: 0,
            position: "absolute",
            width: "100%",
            left: 0,
            bottom: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
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
