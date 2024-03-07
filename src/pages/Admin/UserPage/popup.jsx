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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { MdAdd } from "react-icons/md";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { message } from "antd";

const selectRole = [
  {
    label: "ADMIN",
    value: "ADMIN",
  },
  {
    label: "USER",
    value: "USER",
  },
];

export default function Popup(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  const handleAdd = async () => {
    if (!email || !password) {
      return messageApi.open({
        type: "error",
        content: "Feilds are empty",
      });
    }
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        "/auth/user",
        {
          firstName,
          lastName,
          email,
          password,
          role: role.anchorKey,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      props.setIsAdd(response.data);
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
                  Add New User
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    label="First Name"
                    placeholder="Enter Name"
                    variant="bordered"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    autoFocus
                    label="Last Name"
                    placeholder="Enter Name"
                    variant="bordered"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <Input
                    autoFocus
                    label="Email"
                    placeholder="Enter email"
                    variant="bordered"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    autoFocus
                    label="Password"
                    placeholder="Enter Pasword"
                    type="password"
                    variant="bordered"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Select
                    placeholder="Select Role"
                    labelPlacement="outside"
                    variant="bordered"
                    disableSelectorIconRotation
                    onSelectionChange={(key) => setRole(key)}
                  >
                    {selectRole.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
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
