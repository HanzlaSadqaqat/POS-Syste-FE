import React, { useState } from "react";
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
import { message } from "antd";

export default function Popup(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleAdd = async () => {
    if (!category || !description) {
      return messageApi.open({
        type: "error",
        content: "Feilds are empty",
      });
    }
    const accessToken = localStorage.getItem("accessToken");
    try {
      console.log(accessToken);
      const response = await axios.post(
        "/category",
        {
          name: category,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      props.setIsAdd(response.data);
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
      messageApi.open({
        type: "error",
        content: error.response.data.error,
      });
    }
  };

  return (
    <div>
      <>
        {contextHolder}
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
                  Add New Category
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Category Name"
                    placeholder="Enter Category"
                    variant="bordered"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <Textarea
                    label="Description"
                    minRows={4}
                    variant="bordered"
                    style={{
                      paddingTop: 10,
                    }}
                    labelPlacement="Description"
                    placeholder="Describe your category here"
                    className="w-full text"
                    onChange={(e) => setDescription(e.target.value)}
                  />
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
                  <Button color="primary" onPress={onClose} onClick={handleAdd}>
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
