import React, { useEffect, useState } from "react";
import Sidebar from "../../../componenets/Sidebar/Sidebar";
import Card from "../../../componenets/Card/Card";
import { AiOutlineRise } from "react-icons/ai";
import { MdOutlineAttachMoney, MdOutlineCalendarToday } from "react-icons/md";
import { TbClock24, TbTruckDelivery } from "react-icons/tb";
import axios from "axios";
// import DashboardTable from "./comp/DashboardTable";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [todaySale, setTodaySale] = useState(0);
  const [todayOrders, setTodayOrders] = useState([]);
  const [previousDay, setPrviousDay] = useState({ sale: 0, order: 0 });
  const [currentPage, setCurrentPage] = useState("1");
  const [totalOrders, setTotalOrders] = useState(0);
  // const getCurrentpage = (val) => {
  //   setCurrentPage(val);
  // };
  // useEffect(() => {
  //   getOrdersDetail();
  // }, [currentPage]);

  useEffect(() => {
    CardsDetail();
  }, []);
  const CardsDetail = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("/order/status", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;
      setTodayOrders(data.today.length);
      const sale = data.today.reduce((acc, cur) => acc + cur.totalPrice, 0);
      setTodaySale(`${sale}`);
      setPrviousDay({
        sale: data.preDay?.reduce((acc, cur) => acc + cur.totalPrice, 0),
        order: data.preDay.length,
      });
      setTotalOrders(data.totalOrders);
    } catch (error) {
      console.log(error);
    }
  };
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
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-wrap gap-10 py-10 w-full justify-center">
          <Card
            bgColor={"bg-blue-400"}
            color={"text-white"}
            icon={
              <MdOutlineAttachMoney className="text-white rounded-lg bg-blue-300 p-2 text-[40px]" />
            }
            title={`$ ${todaySale}`}
            text={"Today Sale"}
            icon2={
              <TbClock24 className="text-[28px] bg-blue-300 p-1 rounded-full" />
            }
            bottomText={`${previousDay.sale} previous day states!`}
          />
          <Card
            bgColor={"bg-purple-500"}
            color={"text-white"}
            icon={
              <TbTruckDelivery className="text-white rounded-lg bg-purple-400 p-2 text-[40px]" />
            }
            title={todayOrders}
            text={"Today Order"}
            icon2={
              <TbClock24 className="text-[28px] bg-purple-400 p-1 rounded-full" />
            }
            bottomText={`${previousDay.order} previous day states!`}
          />
          <Card
            bgColor={"bg-[#ad5c87]"}
            color={"text-white"}
            icon={
              <TbTruckDelivery className="text-white rounded-lg bg-[#ad7b96] p-2 text-[40px]" />
            }
            title={`${totalOrders}`}
            text={"Total Orders"}
            icon2={
              <TbClock24 className="text-[28px] bg-[#ad7b96] p-1 rounded-full" />
            }
            bottomText={`0 previous day states!`}
          />
        </div>
        <div className="flex flex-wrap gap-10 py-10 w-full justify-center">
          <Card
            bgColor={"bg-blue-400"}
            color={"text-white"}
            icon={
              <MdOutlineAttachMoney className="text-white rounded-lg bg-blue-300 p-2 text-[40px]" />
            }
            title={`$ ${todaySale}`}
            text={"Today Sale"}
            icon2={
              <TbClock24 className="text-[28px] bg-blue-300 p-1 rounded-full" />
            }
            bottomText={`${previousDay.sale} previous day states!`}
          />
          <Card
            bgColor={"bg-purple-500"}
            color={"text-white"}
            icon={
              <TbTruckDelivery className="text-white rounded-lg bg-purple-400 p-2 text-[40px]" />
            }
            title={todayOrders}
            text={"Today Order"}
            icon2={
              <TbClock24 className="text-[28px] bg-purple-400 p-1 rounded-full" />
            }
            bottomText={`${previousDay.order} previous day states!`}
          />
          <Card
            bgColor={"bg-[#ad5c87]"}
            color={"text-white"}
            icon={
              <TbTruckDelivery className="text-white rounded-lg bg-[#ad7b96] p-2 text-[40px]" />
            }
            title={`${totalOrders}`}
            text={"Total Orders"}
            icon2={
              <TbClock24 className="text-[28px] bg-[#ad7b96] p-1 rounded-full" />
            }
            bottomText={`0 previous day states!`}
          />
        </div>
        <div className="w-5/6">
          {/* <DashboardTable getPage={getCurrentpage} orders={orders} /> */}
        </div>
      </div>
    </>
  );
}
