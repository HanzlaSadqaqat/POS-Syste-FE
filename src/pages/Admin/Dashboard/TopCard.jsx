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

export default function TopCard(prop) {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card className={`w-[270px] flex-wrap bg-blue-400 text-white`}>
      <CardHeader className="justify-between items-center flex ">
        <div className=" gap-3 flex justify-center items-center">
          <MdOutlineToday className="text-[24px] text-white" />

          <div className="flex flex-col gap-1 items-center justify-center ">
            <h4 className="text-small font-semibold leading-none text-[24px] flex gap-2 items-center">
              TODAY SALES
              <AiOutlineRise />
            </h4>
            {/* <h5 className="text-small tracking-tight text-default-400"></h5> */}
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small font-semibold text-[32px]">
        <div className=" flex  px-5">$ 450</div>
      </CardBody>
      <CardFooter className="gap-3"></CardFooter>
    </Card>
  );
}
