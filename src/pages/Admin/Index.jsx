import React, { useState } from "react";
import Sidebar from "../../componenets/Sidebar/Sidebar";
import Product from "./ProductPage";
import Dashboard from "./Dashboard";
import Category from "./CategoryPage";
import User from "./UserPage";

export default function Pannel() {
  const [changeTab, setChangeTab] = useState("0");
  const componenet = [<Dashboard />, <Category />, <Product />, <User />];
  const handleChangeTab = (val) => {
    setChangeTab(val - 1);
  };
  return (
    <div>
      <div>
        <Sidebar onChangeTab={handleChangeTab} body={componenet[changeTab]} />
      </div>
    </div>
  );
}
