import Category from "../pages/Admin/CategoryPage";
import Dashboard from "../pages/Admin/Dashboard";
import Pannel from "../pages/Admin/Index";
import Product from "../pages/Admin/ProductPage";
import User from "../pages/Admin/UserPage";
import Login from "../pages/LoginPage/Login";

const Routes = (isLogin) => {
  if (isLogin) {
    return [
      { path: "/admin", element: <Pannel /> },
      { path: "*", element: <Pannel /> },
    ];
  } else {
    return [
      { path: "/login", element: <Login /> },
      { path: "*", element: <Login /> },
    ];
  }
};

export default Routes;
