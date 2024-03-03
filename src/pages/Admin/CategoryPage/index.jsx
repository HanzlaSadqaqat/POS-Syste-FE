import React, { useEffect, useState } from "react";
import Sidebar from "../../../componenets/Sidebar/Sidebar";
import { Button, Form, Input, Radio, message } from "antd";
import CategoryTable from "./CategoryTable";
import TextArea from "antd/es/input/TextArea";
import { MdAdd } from "react-icons/md";

import Popup from "./Popup";
import axios from "axios";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [deleteItem, setDeleteItem] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const [add, setAdd] = useState();
  useEffect(() => {
    getCategories();
  }, [add, deleteItem]);
  const setIsAdd = (val) => {
    setAdd(val);
  };
  const setIsDeleted = (val) => {
    setDeleteItem(val);
  };

  const getCategories = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("/category", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCategories(response.data.data);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.response.data,
      });
    }
  };
  return (
    <div className="">
      {contextHolder}
      <div className="mt-10">
        <div className="flex flex-col gap-10">
          <Popup setIsAdd={setIsAdd} />
          {categories.length && (
            <>
              <CategoryTable
                categories={categories}
                setIsDeleted={setIsDeleted}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
