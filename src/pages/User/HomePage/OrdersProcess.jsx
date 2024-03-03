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

export default function OrdersProcess(props) {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectId, setSelectId] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState("0");
  const [disableKey, setDisableKey] = useState([]);
  const [max, setMax] = useState();
  useEffect(() => {
    getAllProducts();
  }, []);
  useEffect(() => {
    if (props.products) {
      const disable = props.products.filter((item) => {
        if (item.quantity <= 0) {
          return item._id;
        }
      });
      setDisableKey(disable.map((item) => item._id));
      setProducts(props.products);
    } else {
      setProducts([]);
    }
  }, [props.products]);
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

  const handleCreateOrder = async () => {
    const finalItem = selectedItems.map((item) => {
      const findItem = allProducts.find((ele) => ele._id === item._id);
      console.log(findItem);
      if (findItem.quantity < item.quantity) {
        alert(`${findItem.name} is only ${findItem.quantity} remains`);
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="grid grid-row-2 grid-flow-col ">
        {/* PRODUCTS SECTION */}
        <div className=" PRODUCTS col-span-2  h-screen">
          <div className="flex flex-col gap-3">
            <Table
              color={"primary"}
              radius={"none"}
              disabledKeys={disableKey}
              selectionMode="multiple"
              // defaultSelectedKeys={["2", "3"]}
              onSelectionChange={(e) => setSelectId([...e])}
              // aria-label="Example static collection table"
            >
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>PRICE</TableColumn>
                <TableColumn>TOTAL STOCK</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody>
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
        </div>

        {/* CALCULATE ORDER SECTION */}
        <div className="col-span-2 bg-yellow-100 h-full">
          <div className=" h-full">
            <div className="h-full">
              <Card className="rounded-none h-full">
                <CardHeader className="flex gap-3" radius="sm">
                  <div className="flex justify-between w-full items-center">
                    <p className="text-[32px]">Create Order</p>
                    <Button
                      className="bg-blue-500 text-white font-bold h-14"
                      onClick={handleCreateOrder}
                    >
                      Create
                    </Button>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="" style={{ height: "" }}>
                  <Table
                    removeWrapper
                    aria-label="Example static collection table"
                  >
                    <TableHeader>
                      <TableColumn>Product</TableColumn>
                      <TableColumn>Quantity</TableColumn>
                      <TableColumn>Price</TableColumn>
                    </TableHeader>
                    <TableBody>
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
                </CardBody>
                <Divider />
                <CardFooter className="flex justify-between p-4 px-10 bg-gray-200 rounded-none  font-bold">
                  <span className="text-[32px]">Total Bill</span>
                  <span className="text-[32px]">${total}</span>
                  {/* <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/nextui-org/nextui"
                  >
                    Visit source code on GitHub.
                  </Link> */}
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
