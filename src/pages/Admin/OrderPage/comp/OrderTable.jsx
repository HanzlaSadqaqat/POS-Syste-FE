import React, { useEffect, useState } from "react";
import { Button, DatePicker, Empty, Pagination, Input } from "antd";

import Popup from "./Popup";
import axios from "axios";
import html2pdf from "html2pdf.js";

import { FaRegFilePdf } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import moment from 'moment';

const OrderTable = (props) => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState("1");
  const [totalPage, setTotalPage] = useState(10);
  const [toDelete, setToDelete] = useState([]);
  const defaultDate = moment(new Date(), 'YYYY-MM-DD');

  useEffect(() => {
    setTotalPage(Math.ceil(props.orders.totalPages / 10) * 10);
    setOrders(props.orders.data);
    handleDate(defaultDate)
  }, [props.orders]);

  useEffect(() => {
    props.getPage(currentPage);
  }, [currentPage]);

  const deleteEntries = async () => {
    try {

      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "/order/delete",
        {
          toDelete
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

    } catch (error) {
      console.log(error);
    }
  };

  const handleDate = async (val) => {
    if (val) {
      console.log("IUHDI")
      const date = new Date(val);
      const formattedDate = date.toISOString();
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `/order?date=${formattedDate}&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setOrders(response.data.data);
    }
  };
  return (
    <div id="orderTable">
      <div className="">
        <Button
        onClick={() => deleteEntries()}
          className="flex p-3  text-[24px] h-12 w-fit justify-center"
        >
          <MdDelete />
        </Button>{" "}
      </div>
      <div className="flex justify-between pr-5">
        <span className="p-2 pb-5 text-[24px] font-semibold text-gray-500">
          Orders List
        </span>
        <span>
          {" "}
          <DatePicker onChange={handleDate} defaultValue={defaultDate}/>
        </span>
      </div>
      <div className="overflow-x-auto border-1 shadow-sm rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <input
                  type="checkbox"
                  className="mr-1 h-4 w-4 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                  checked={toDelete.length === 0 ? false : true}
                  onClick={() => {if (toDelete.length !== 0) setToDelete([]); else setToDelete([...orders])}}
                />
              </th>
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
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Payment Method
              </th>
            </tr>
          </thead>
          <tbody className="bg-white  divide-gray-200 w-full items-center  h-64">
            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <>
                  {console.log(order)}
                  <tr className="hover:bg-gray-50 border-b">
                    <>
                      <td
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <input
                          type="checkbox"
                          className="mr-1 h-4 w-4 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                          checked = {toDelete.findIndex((or) => or._id === order._id) !== -1 ? true : false}
                          disabled = {order.cash ? false : true}
                          onClick={() => {
                            if(toDelete.findIndex((or) => or._id === order._id) !== -1) {
                              const updatedItems = [...toDelete]; // Create a copy of the array
                              updatedItems.splice(toDelete.findIndex((or) => or._id === order._id), 1); // Remove the item at the specified index
                              setToDelete(updatedItems); // Update the state with the modified array
                            }else{
                              const updatedItems = [...toDelete]; // Create a copy of the array
                              updatedItems.splice(toDelete.findIndex((or) => or._id === order._id), 0,order); // Remove the item at the specified index
                              setToDelete(updatedItems); // Update the state with the modified array
                            }
                          }}
                        />
                      </td>
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
                      <td className="  overflow-hidden px-6 py-4 whitespace-nowrap ">
                        <Popup order={order} />
                      </td>
                      <td className="  overflow-hidden px-6 py-4 whitespace-nowrap ">
                        <>
                          <div className="text-sm text-gray-900  ">
                            {`${order.date.split("T")[0]}`}{" "}
                          </div>
                        </>
                      </td>
                      <td className="  overflow-hidden px-6 py-4 whitespace-nowrap ">
                        {order.totalPrice}
                      </td>
                      <td className="  overflow-hidden px-6 py-4 whitespace-nowrap ">
                        {order.cash ? "CASH" : "PIN"}
                      </td>
                    </>
                  </tr>
                </>
              ))
            ) : (
              <div className="left-0 absolute flex w-full border-none justify-center items-center">
                <Empty className="w-40 h-40  mt-10" />
              </div>
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-center my-5 mb-10">
        <Pagination
          loop
          showControls
          total={totalPage}
          initialPage={1}
          onChange={(num) => setCurrentPage(num)}
        />
      </div>
    </div>
  );
};
export default OrderTable;
