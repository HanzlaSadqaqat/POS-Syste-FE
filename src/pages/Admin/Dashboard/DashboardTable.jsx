import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { FaArrowAltCircleRight, FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import Popup from "./Popup";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
const DashboardTable = (props) => {
  const [orders, setOrders] = useState([]);
  const [selectIndex, setSelectIndex] = useState(false);
  useEffect(() => {
    console.log(props.orders);
    setOrders(props.orders);
  });

  return (
    <>
      {" "}
      <div className="p-2 pb-5 text-[24px] font-semibold text-gray-500">
        Orders List
      </div>
      <div className="overflow-x-auto border-1 shadow-sm rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order Id
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Report
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white  divide-gray-200 w-full">
            {orders.map((order, index) => (
              <>
                <tr className="hover:bg-gray-50 border-b">
                  <>
                    <td className="  overflow-hidden px-6 py-4 whitespace-nowrap ">
                      <div className="flex w-48 items-center">
                        <div className="">
                          <div className="text-sm font-medium text-gray-900">
                            <>
                              <div className="text-sm  text-gray-900 flex ">
                                {order._id}
                                <span></span>
                              </div>
                            </>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className=" py-4 whitespace-nowrap text-right text-sm font-medium  flex gap-2">
                      <Popup order={order} />
                    </td>
                    <td className=" py-4">
                      <>
                        <div className="text-sm text-gray-900  ">
                          {`${order.date.split("T")[0]}`}{" "}
                        </div>
                      </>
                    </td>
                    <td className="px-14 py-4 whitespace-nowrap text-right text-sm font-medium  flex gap-2">
                      {order.totalPrice}
                    </td>
                  </>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default DashboardTable;
