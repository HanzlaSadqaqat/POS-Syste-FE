import React, { useEffect, useState } from "react";
import Sidebar from "../../../componenets/Sidebar/Sidebar";
import Card from "../../../componenets/Card/CardMini";
import { AiOutlineRise } from "react-icons/ai";
import { MdOutlineAttachMoney, MdOutlineCalendarToday } from "react-icons/md";
import { TbClock24, TbTruckDelivery } from "react-icons/tb";
import axios from "axios";

export default function Report() {
  
  const todays_Report = async () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("accessToken",accessToken)
    const response = await axios.post(
      "/report",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
        <div className="flex flex-wrap  w-full justify-center items-center">
          <Card
            bgColor={"bg-blue-400"}
            color={"text-white"}
            title="Z REPORT"
            todays_Report={todays_Report}
          />
        </div>
      </div>
  );
}
