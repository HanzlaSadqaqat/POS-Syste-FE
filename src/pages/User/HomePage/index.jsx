import React, { useEffect, useState } from "react";
import UserSidebar from "./UserSidebar";
import axios from "axios";
import OrdersProcess from "./OrdersProcess";

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
  useEffect(() => {
    getProducts();
  }, [categoryId]);

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

  const getProducts = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log(categoryId);
      const response = await axios.get(`product/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProducts(response.data.data);
      console.log(response.data.data);
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
            body={<OrdersProcess products={products} />}
            categories={categories}
            getCategoryId={getCategoryId}
          />
        </div>
      </div>
    </div>
  );
}
