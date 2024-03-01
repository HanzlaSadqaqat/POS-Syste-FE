import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Routes from "./routes/Routes";
import axios from "axios";
import { NextUIProvider } from "@nextui-org/react";

const AppRouter = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);

  console.log(isLogin);
  return useRoutes(Routes(isLogin));
};
function App() {
  return (
    <NextUIProvider>
      <Router>
        <AppRouter />
      </Router>
    </NextUIProvider>
  );
}

export default App;
