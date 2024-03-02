import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import logo from "../../../assets/images/logo.png";
import { Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const UserSidebar = (props) => {
  const [selectedId, setSelectedId] = useState();
  const [categories, setCategories] = useState([]);
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
        }}
      >
        <Header className="flex border border-blue-500 rounded-lg m-1 pl-0">
          <img src={logo} alt="logo" />{" "}
          <span className="text-white ">User Pannel </span>{" "}
        </Header>{" "}
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onSelect={(info) => setSelectedId(info)}
          style={{
            border: "3px",

            height: "80%",
          }}
          items={categories}
        />
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
