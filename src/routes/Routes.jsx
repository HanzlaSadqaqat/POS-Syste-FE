import Category from "../pages/Admin/CategoryPage";
import Dashboard from "../pages/Admin/Dashboard";
import Pannel from "../pages/Admin/Index";
import Product from "../pages/Admin/ProductPage";
import User from "../pages/Admin/UserPage";
import Login from "../pages/LoginPage/Login";
import HomePage from "../pages/User/UserPage";

const Routes = (props) => {
  if (props.isLogin) {
    if (props.role !== "USER") {
      return [
        { path: "/admin", element: <Pannel /> },
        { path: "*", element: <Pannel /> },
      ];
    } else {
      return [
        { path: "/user", element: <HomePage /> },
        { path: "*", element: <HomePage /> },
      ];
    }
  } else {
    return [
      { path: "/login", element: <Login /> },
      { path: "*", element: <Login /> },
    ];
  }
};

export default Routes;
