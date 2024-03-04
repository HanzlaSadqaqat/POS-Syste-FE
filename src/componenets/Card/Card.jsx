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
  icon,
  text,
  icon2,
  bottomText,
}) {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card className={`w-[270px] flex-wrap ${bgColor} ${color}`}>
      <CardHeader className="justify-between items-center flex ">
        <div className=" gap-3 flex justify-center items-center text-[24px] w-full">
          {/* {icon} */}

          <div className="flex gap-1 items-center justify-between w-full pt-3 px-3">
            <h4 className="font-semibold leading-none text-[32px] w-40  flex gap-2 items-center">
              {title}
            </h4>
            <h5 className=" tracking-tight w-full h-10  flex justify-end">
              {" "}
              {icon}
            </h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0 py-0 text-small font-semibold text-[16px]">
        <div className=" flex  px-5"> {text}</div>
        <div className=" flex  px-5 items-center  gap-2 pb-4 pt-2">
          <h5 className=" tracking-tight h-10  flex items-center "> {icon2}</h5>
          <span>{bottomText}</span>
        </div>
      </CardBody>
    </Card>
  );
}
