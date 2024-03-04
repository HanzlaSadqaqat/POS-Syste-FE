import React, { useEffect, useState } from "react";
import UserSidebar from "./Comp/UserSidebar";
import axios from "axios";
import OrdersProcess from "./Comp/OrdersProcess";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [products, setProducts] = useState("");
  useEffect(() => {
    getCategories();
  }, []);
  const getCategoryId = (val) => {
    setCategoryId(val);
  };

  const getCategories = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("/category", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data.data);
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="grid grid-row-2 grid-flow-col h-screen">
        {/* <div className="col-span-1 bg-gray-200">Column 1</div> */}
        <div className="col-span-1 ">
          <UserSidebar
            body={<OrdersProcess categoryId={categoryId} />}
            categories={categories}
            getCategoryId={getCategoryId}
          />
        </div>
      </div>
    </div>
  );
}
