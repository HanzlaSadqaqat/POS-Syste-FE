import React, { useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { message } from "antd";
import useMessage from "antd/es/message/useMessage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/reducers/slices/authSlice";
const Login = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("USER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      if (email && password) {
        const response = await axios.post("/auth/login", {
          email,
          password,
          role: formLayout,
        });
        messageApi.open({
          type: "error",
          content: response.data.message,
        });
        const config = {
          email: response.data.user.email,
          accessToken: response.data.user.accessToken,
          isLogin: true,
          role: response.data.user.role,
        };
        dispatch(loginSuccess(config));
        localStorage.setItem("accessToken", response.data.user.accessToken);
        // navigate("/admin");
      } else if (!email & !password) {
        messageApi.open({
          type: "error",
          content: "Enter your credentials",
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Incomplete Credentials",
        });
      }
    } catch (error) {
      messageApi.open({ type: "error", content: error.response.data.message });
    }
  };

  return (
    <div className="w-full flex">
      {contextHolder}

      <div className="w-6/12 bg-blue-950 flex justify-center ">
        <img src={logo} alt="" className="image" />
      </div>
      <Form
        // {...formItemLayout}
        layout={formLayout}
        form={form}
        className=" flex flex-col justify-center h-screen w-6/12 items-center"
        initialValues={{
          layout: formLayout,
        }}
        onValuesChange={onFormLayoutChange}
      >
        <span className="flex flex-col items-center w-3/6 bg-white justify-center py-20 rounded border-2 shadow-md">
          <Form.Item label="" name="layout" className="w-full ">
            <Radio.Group
              value={formLayout}
              className=" w-full flex justify-center"
            >
              <Radio.Button value="USER" className="text-blue-400">
                User
              </Radio.Button>
              <Radio.Button value="ADMIN">Admin</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="" className="w-4/5   ">
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="hover:border-blue-500 focus:border-blue-500"
              required={true}
            />
          </Form.Item>
          <Form.Item label="" className="w-4/5">
            <Input
              placeholder="Password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="hover:border-blue-500  focus:border-blue-500"
            />
          </Form.Item>
          <Form.Item className="w-4/5">
            <Button
              type="submit"
              className="w-full border-blue-600 hover:bg-blue-600 hover:text-white"
              onClick={handleLogin}
            >
              LOGIN
            </Button>
          </Form.Item>
        </span>
      </Form>
    </div>
  );
};
export default Login;
