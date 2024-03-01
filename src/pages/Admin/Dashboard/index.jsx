import React, { useEffect, useState } from "react";
import Sidebar from "../../../componenets/Sidebar/Sidebar";
import DashboardTable from "./DashboardTable";
import Card from "../../../componenets/Card/Card";
import { AiOutlineRise } from "react-icons/ai";
import { MdOutlineAttachMoney, MdOutlineCalendarToday } from "react-icons/md";
import { TbClock24 } from "react-icons/tb";

export default function Dashboard() {
  const [changeTab, setChangeTab] = useState("1");

  const handleChangeTab = (val) => {
    setChangeTab(val);
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
            title={"$450"}
            text={"Today Sale"}
            icon2={
              <TbClock24 className="text-[28px] bg-blue-300 p-1 rounded-full" />
            }
            bottomText={"0 previous day states!"}
          />
          <Card
            bgColor={"bg-purple-500"}
            color={"text-white"}
            icon={
              <MdOutlineAttachMoney className="text-white rounded-lg bg-purple-400 p-2 text-[40px]" />
            }
            title={"21"}
            text={"Today Order"}
            icon2={
              <TbClock24 className="text-[28px] bg-purple-400 p-1 rounded-full" />
            }
            bottomText={"0 previous day states!"}
          />
          <Card
            bgColor={"bg-[#ad5c87]"}
            color={"text-white"}
            icon={
              <MdOutlineAttachMoney className="text-white rounded-lg bg-[#ad7b96] p-2 text-[40px]" />
            }
            title={"450"}
            text={"Total Orders"}
            icon2={
              <TbClock24 className="text-[28px] bg-[#ad7b96] p-1 rounded-full" />
            }
            bottomText={"0 previous day states!"}
          />
        </div>
        <div className="w-5/6">
          <DashboardTable />
        </div>
      </div>
    </>
  );
}
