import React, { useEffect, useState } from "react";
import OrderTable from "./comp/OrderTable";
import axios from "axios";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);

  const [currentPage, setCurrentPage] = useState("1");
  const getCurrentpage = (val) => {
    setCurrentPage(val);
  };
  useEffect(() => {
    getOrdersDetail();
  }, [currentPage]);

  //   useEffect(() => {
  //     getOrdersDetail();
  //     CardsDetail();
  //   }, []);
  const getOrdersDetail = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(`/order?&page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data.data;

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <OrderTable getPage={getCurrentpage} orders={orders} />
    </div>
  );
}
