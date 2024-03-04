import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function Popup(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [order, setOrder] = useState({});

  useEffect(() => {
    setOrder(props.order);
  }, [props.order]);

  return (
    <>
      <Button
        onPress={onOpen}
        className="px-8 hover:text-blue-500 text-[25px] cursor-pointer bg-white"
      >
        <IoDocumentTextOutline />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 w-full">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <>
                  <Table aria-label="Example static collection table">
                    <TableHeader>
                      <TableColumn>Product</TableColumn>
                      <TableColumn>Quantity</TableColumn>
                      <TableColumn>Price</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow key="1">
                        <TableCell>Tony Reichert</TableCell>
                        <TableCell>CEO</TableCell>
                        <TableCell>Active</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
