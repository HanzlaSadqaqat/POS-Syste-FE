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

export default function OrdersProcess(props) {
  const [products, setProducts] = useState([]);
  const [selectId, setSelectId] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState("0");
  useEffect(() => {
    if (props.products) {
      setProducts(props.products);
    } else {
      setProducts([]);
    }
  }, [props.products]);
  useEffect(() => {
    const data = products.filter((item) => selectId.includes(item._id));
    setSelectedItems(data);
  }, [selectId]);
  useEffect(() => {
    const price = selectedItems.reduce((acc, cur) => {
      console.log(acc.price, cur.price);
      return acc + cur.price;
    }, 0);
    console.log(price);

    setTotal(price);
  }, [selectedItems]);

  const handleQuantityChange = (id, val) => {
    console.log(val);
    console.log(id);
    console.log(selectedItems);
    const items = selectedItems.map((item, index) => {
      if (item._id === id) {
      }
    });
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
                      <Chip>{item.quantity > 0 ? "Active" : "Inactive"}</Chip>
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
                    <Button className="bg-blue-500 text-white font-bold h-14">
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
                      {selectedItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="w-28">
                            <Input
                              type="number"
                              placeholder="0"
                              defaultValue={1}
                              labelPlacement="outside"
                              style={
                                {
                                  // width: "20px",
                                }
                              }
                              onChange={(e) =>
                                handleQuantityChange(item._id, e.target.value)
                              }
                              startContent={
                                <div className="pointer-events-none flex items-center">
                                  {/* <span className="text-default-400 text-small">
                                    $
                                  </span> */}
                                </div>
                              }
                            />
                          </TableCell>
                          <TableCell>{item.price}</TableCell>
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
