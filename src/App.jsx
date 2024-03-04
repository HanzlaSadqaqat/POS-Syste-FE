import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Routes from "./routes/Routes";
import axios from "axios";
import { NextUIProvider } from "@nextui-org/react";
import { loginSuccess } from "./redux/reducers/slices/authSlice";
import { useState } from "react";
import { Spin } from "antd";

const AppRouter = () => {
  const auth = useSelector((state) => state.auth);
  // const isLogin = useSelector((state) => state.auth.isLogin);

  return useRoutes(Routes({ isLogin: auth.isLogin, role: auth.role }));
};
function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const checkSession = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("/session", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return {
        role: response.data.role,
        isLogin: response.data.message === "Authorized" ? true : false,
      };
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getSession = async () => {
    try {
      const session = await checkSession();
      dispatch(loginSuccess({ isLogin: session.isLogin, role: session.role }));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  getSession();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  } else {
    return (
      <NextUIProvider>
        <Router>
          <AppRouter />
        </Router>
      </NextUIProvider>
    );
  }
}

export default App;
