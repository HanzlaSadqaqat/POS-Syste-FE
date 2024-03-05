// import React, { useEffect, useState } from "react";
// import { DatePicker, Empty, Pagination } from "antd";

// import Popup from "./Popup";
// import axios from "axios";

// const DashboardTable = (props) => {
//   const [orders, setOrders] = useState([]);
//   const [currentPage, setCurrentPage] = useState("1");
//   const [totalPage, setTotalPage] = useState(10);
//   useEffect(() => {
//     setTotalPage(Math.ceil(props.orders.totalPages / 10) * 10);
//     setOrders(props.orders.data);
//   }, [props.orders]);
//   useEffect(() => {
//     props.getPage(currentPage);
//   }, [currentPage]);
//   const handleDate = async (val) => {
//     if (val) {
//       const date = new Date(val);
//       const formattedDate = date.toISOString();
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.get(
//         `/order?date=${formattedDate}&page=${currentPage}`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       console.log(response.data.data);
//       setOrders(response.data.data);
//     }
//   };
//   return (
//     <>
//       {" "}
//       <div className="flex justify-between pr-5">
//         <span className="p-2 pb-5 text-[24px] font-semibold text-gray-500">
//           Orders List
//         </span>
//         <span>
//           {" "}
//           <DatePicker onChange={handleDate} />
//         </span>
//       </div>
//       <div className="overflow-x-auto border-1 shadow-sm rounded-xl">
//         <table className="min-w-full divide-y divide-gray-200 w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Order Id
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Report
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Date
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Total Price
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white  divide-gray-200 w-full items-center  h-64">
//             {orders && orders.length > 0 ? (
//               orders.map((order, index) => (
//                 <>
//                   <tr className="hover:bg-gray-50 border-b">
//                     <>
//                       <td className="  overflow-hidden px-6 py-4 whitespace-nowrap ">
//                         <div className="flex w-48 items-center">
//                           <div className="">
//                             <div className="text-sm font-medium text-gray-900">
//                               <>
//                                 <div className="text-sm  text-gray-900 flex ">
//                                   {order._id}
//                                   <span></span>
//                                 </div>
//                               </>
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className=" py-4 whitespace-nowrap text-right text-sm font-medium  flex gap-2">
//                         <Popup order={order} />
//                       </td>
//                       <td className=" py-4">
//                         <>
//                           <div className="text-sm text-gray-900  ">
//                             {`${order.date.split("T")[0]}`}{" "}
//                           </div>
//                         </>
//                       </td>
//                       <td className="px-14 py-4 whitespace-nowrap text-right text-sm font-medium  flex gap-2">
//                         {order.totalPrice}
//                       </td>
//                     </>
//                   </tr>
//                 </>
//               ))
//             ) : (
//               <div className="left-0 absolute flex w-full border-none justify-center items-center">
//                 <Empty className="w-40 h-40  mt-10" />
//               </div>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div className="w-full flex justify-center my-5 mb-10">
//         <Pagination
//           loop
//           showControls
//           total={totalPage}
//           initialPage={1}
//           onChange={(num) => setCurrentPage(num)}
//         />
//       </div>
//     </>
//   );
// };
// export default DashboardTable;
