import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Input,
} from "@nextui-org/react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiReset } from "react-icons/bi";
import html2pdf from "html2pdf.js";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { Button } from "antd";
import axios from "axios";
import { FaRegFilePdf } from "react-icons/fa6";

export default function OrdersProcess(props) {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectId, setSelectId] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState("0");
  const [disableKey, setDisableKey] = useState([]);
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    selectCategory();
  }, [props.categoryId]);
  const selectCategory = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(`/product/${props.categoryId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data.data;
      const disable = data.filter((item) => {
        if (item.quantity <= 0) {
          return item._id;
        }
      });
      setDisableKey(disable.map((item) => item._id));
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllProducts = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("/product", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setAllProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("selectId", selectId);

    const data = selectId.map((id) => {
      const selectedItem = allProducts.find((item) => item._id === id);
      return {
        _id: selectedItem._id,
        name: selectedItem.name,
        price: selectedItem.price,
        quantity: 1,
      };
    });

    setSelectedItems(data);
  }, [selectId]);
  useEffect(() => {
    const price = selectedItems.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);
    console.log(price);

    setTotal(price);
  }, [selectedItems]);

  const handleQuantityChange = (id, val) => {
    let items = selectedItems.map((item) => {
      // const findMax= max.find
      if (item._id === id) {
        item.quantity = val;
      }
      return item;
    });
    console.log(items);

    setSelectedItems(items);
  };
  const handleGenerateBill = () => {};

  const handleCreateOrder = async () => {
    const finalItem = selectedItems.map((item) => {
      const findItem = allProducts.find((ele) => ele._id === item._id);
      console.log(findItem);
      if (findItem.quantity < item.quantity) {
        alert(`${findItem.name} is only ${findItem.quantity} remains`);
        return;
      }
      return {
        productId: item._id,
        name: item.name,
        price: item.price * item.quantity,
        quantity: item.quantity,
      };
    });
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "/order",
        {
          totalPrice: total,
          orders: [...finalItem],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      handleReset();
    } catch (error) {
      console.log(error);
    }
  };

  const generatePdf = () => {
    try {
      const element = document.getElementById("pdf");
      const opt = {
        margin: 0.5,
        filename: `Bill.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setSelectedItems([]);
    setSelectId([]);
    setTotal([]);
    selectCategory();
  };

  return (
    <>
      <div className="grid grid-row-2 grid-flow-col ">
        {/* PRODUCTS SECTION */}
        <div className=" PRODUCTS col-span-2  h-screen">
          <div className="flex flex-col gap-3 h-full ">
            <div className=" overflow-scroll">
              <Table
                color={"primary"}
                radius={"none"}
                disabledKeys={disableKey}
                selectionMode="multiple"
                selectedKeys={selectId}
                onSelectionChange={(e) => setSelectId([...e])}
                style={{
                  height: "100%",
                }}
                className="h-full border-2"
                // aria-label="Example static collection table"
              >
                <TableHeader>
                  <TableColumn>NAME</TableColumn>
                  <TableColumn>PRICE</TableColumn>
                  <TableColumn>TOTAL STOCK</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody style={{}}>
                  {products.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>$ {item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Chip>
                          {item.quantity > 0 ? "Active" : "Out of Stock"}
                        </Chip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <span className="flex gap-2 justify-end pr-4 ">
              <Button
                className="bg-yellow-400  text-white font-bold h-14 flex justify-center items-center gap-1"
                onClick={handleReset}
              >
                <BiReset />
                Reset
              </Button>
              <Button
                className="bg-blue-500 text-white font-bold h-14 flex justify-center items-center gap-1"
                onClick={handleCreateOrder}
              >
                <IoIosAddCircleOutline className="font-bold" />
                Create
              </Button>
            </span>
          </div>
        </div>

        {/* CALCULATE ORDER SECTION */}
        <div className="col-span-2 bg-yellow-100 h-full ">
          <div className=" h-full">
            <div className="h-full">
              <Card className="rounded-none h-full" id="pdf">
                <CardHeader className="flex gap-3" radius="sm">
                  <div className="flex justify-between w-full items-center">
                    <p className="text-[32px]">Create Order</p>
                    <span className="flex gap-2">
                      <Button
                        onClick={generatePdf}
                        className="flex p-3  text-[20px] h-12  w-fit justify-center"
                      >
                        <FaRegFilePdf />
                      </Button>{" "}
                    </span>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="h-1" style={{ height: "" }}>
                  <div className="h-5/6">
                    <Table
                      removeWrapper
                      aria-label="Example static collection table"
                      className=""
                    >
                      <TableHeader>
                        <TableColumn>Product</TableColumn>
                        <TableColumn>Quantity</TableColumn>
                        <TableColumn>Price</TableColumn>
                      </TableHeader>
                      <TableBody className="">
                        {selectedItems.map((item, index) => (
                          <TableRow key={item._id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="w-28">
                              <Input
                                type="number"
                                placeholder="0"
                                defaultValue={item.quantity}
                                labelPlacement="outside"
                                onChange={(e) =>
                                  handleQuantityChange(
                                    item._id,
                                    parseInt(e.target.value)
                                  )
                                }
                                startContent={
                                  <div className="pointer-events-none flex items-center"></div>
                                }
                              />
                            </TableCell>
                            <TableCell>{item.price * item.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardBody>
                <Divider />
                <CardFooter className="flex justify-between p-4 px-10 bg-gray-200 rounded-none  font-bold ">
                  <span className="text-[32px]">Total Bill</span>
                  <span className="text-[32px]">${total}</span>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
