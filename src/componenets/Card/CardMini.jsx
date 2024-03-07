import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import { AiOutlineRise } from "react-icons/ai";
import { MdOutlineToday } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbClock24 } from "react-icons/tb";

export default function TopCard({
  bgColor,
  color,
  title,
  todays_Report,
}) {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card className={`w-[270px] cursor-pointer flex-wrap ${bgColor} ${color}`} >
      <CardHeader className="justify-between items-center flex ">
        <div className=" gap-3 flex justify-center items-center text-[24px] w-full" onClick={() => todays_Report()}>
          <div className="p-5">
            <h4 className={"font-semibold leading-none text-[32px] w-full  flex gap-2 items-center"}>
              {title}
            </h4>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
