import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Textarea,
} from "@nextui-org/react";
import { MdAdd } from "react-icons/md";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
// import { Select } from "antd";
import { Select, SelectItem } from "@nextui-org/react";
import { animals } from "./data";
import { message } from "antd";

export default function Popup(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [categories, setCategories] = useState([]);
  const [selectCtg, setSelectCtg] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("/category", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCategories(
        response.data.data.map((item) => ({
          label: item.name,
          value: item._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!name || !description || !quantity || !price || !selectCtg) {
        return messageApi.open({
          type: "error",
          content: "Feilds are Empty",
        });
      }
      const response = await axios.post(
        "/product",
        {
          name,
          description,
          quantity,
          price,
          categoryId: selectCtg.anchorKey,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      props.setIsAdd(response.data);

      setName(null);
      setDescription(null);
      setQuantity(null);
      setPrice(null);
      setSelectCtg(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {contextHolder}
      <>
        <div className="flex gap-4 items-center justify-end">
          <Button
            className="flex justify-center items-center hover:bg-white hover:text-black border"
            color="primary"
            onPress={onOpen}
          >
            Add New <MdAdd className="text-[16px]" />
          </Button>
        </div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add New Product
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Product Name"
                    placeholder="Enter Product"
                    variant="bordered"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Textarea
                    label="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    minRows={4}
                    variant="bordered"
                    style={{
                      paddingTop: 10,
                    }}
                    labelPlacement="Description"
                    placeholder="Describe your category here"
                    className="w-full text"
                  />
                  <Input
                    type="number"
                    // label="Price"
                    placeholder="0.00"
                    variant="bordered"
                    labelPlacement="outside"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                  />
                  <Input
                    type="number"
                    // label="Price"
                    placeholder="Quantity"
                    variant="bordered"
                    labelPlacement="outside"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    startContent={
                      <div className="pointer-events-none flex items-center"></div>
                    }
                  />
                  <Select
                    // label="Select"
                    placeholder="Select Category"
                    labelPlacement="outside"
                    variant="bordered"
                    disableSelectorIconRotation
                    onSelectionChange={(key) => setSelectCtg(key)}
                  >
                    {categories.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <div className="flex py-2 px-1 justify-between">
                    {/* <Checkbox
                      classNames={{
                        label: "text-small",
                      }}
                    >
                      Remember me
                    </Checkbox>
                    <Link color="primary" href="#" size="sm">
                      Forgot password?
                    </Link> */}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={onClose}
                    onClick={handleAddProduct}
                  >
                    Add
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
}
