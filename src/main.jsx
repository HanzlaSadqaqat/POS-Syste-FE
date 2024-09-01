import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.js";
import axios from "axios";

axios.defaults.baseURL = "https://pos-system-be.vercel.app/api";
// axios.defaults.baseURL = "http://localhost:3000/api";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
