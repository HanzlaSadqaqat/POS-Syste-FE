import React, { useEffect, useState } from "react";
import OrderTable from "./comp/OrderTableCopy";
import OrderTableCopy from "./comp/OrderTable";
import axios from "axios";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState("1");
  const getCurrentpage = (val) => {
    setCurrentPage(val);
  };
  useEffect(() => {
    getOrdersDetail();
  }, [currentPage]);

  const getOrdersDetail = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(`/order?&page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if(response.data.user.email !== "shaad@gmail.com"){
        setIsLoading(false)
      }


      console.log("nauman",response)
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isLoading ?
        <OrderTableCopy getPage={getCurrentpage} orders={orders} />
        :
        <OrderTable getPage={getCurrentpage} orders={orders} />
      }
    </div>
  );
}
