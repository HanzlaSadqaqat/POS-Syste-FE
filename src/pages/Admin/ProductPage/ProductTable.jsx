import { Button, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

export default function ProductTable(props) {
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState();
  const [updateId, setUpdateId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    console.log("prop", props);
    setProducts(props.product);
  }, [props.product]);

  const handleEdit = (item) => {
    setUpdateId(item._id);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setQuantity(item.quantity);
  };
  const handleDeleteItem = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.delete(`/product/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      props.setIsDeleted(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateItem = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.patch(
        `/product/${id}`,
        {
          name,
          description,
          price,
          quantity,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setUpdateId("");
      props.setIsDeleted(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div class="overflow-x-auto w-full border-1 shadow-sm rounded-xl">
        <table class="w-full divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product Name
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quantity
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y w-full divide-gray-200">
            {products.length > 0 ? (
              products.map((item) => (
                <tr className=" hover:bg-gray-50">
                  <td class=" w-48 px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        {updateId && updateId === item._id ? (
                          <>
                            <div>
                              <Input
                                defaultValue={name}
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div class="text-sm font-medium text-gray-900 flex flex-col">
                              {item.name}
                              <span className="text-[10px] text-gray-400">
                                {item.category}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4  ">
                    {updateId && updateId === item._id ? (
                      <>
                        <div>
                          <Input
                            defaultValue={description}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div class="text-sm text-gray-900  ">
                          {item.description}
                        </div>
                      </>
                    )}
                  </td>
                  <td class="px-6 py-4  ">
                    {updateId && updateId === item._id ? (
                      <>
                        <div>
                          <Input
                            defaultValue={price}
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div class="text-sm text-gray-900  ">
                          $ {item.price}
                        </div>
                      </>
                    )}
                  </td>
                  <td class="px-6 py-4  ">
                    {updateId && updateId === item._id ? (
                      <>
                        <div>
                          <Input
                            defaultValue={quantity}
                            type="number"
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div class="text-sm text-gray-900  ">
                          {item.quantity}
                        </div>{" "}
                      </>
                    )}
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium  flex gap-2">
                    {updateId && updateId === item._id ? (
                      <>
                        <Button
                          type="primary"
                          ghost
                          onClick={() => handleUpdateItem(item._id)}
                        >
                          Save
                        </Button>
                        <Button danger onClick={() => setUpdateId("")}>
                          Discard
                        </Button>
                      </>
                    ) : (
                      <>
                        <span class="text-[20px] cursor-pointer">
                          <FaRegEdit onClick={() => handleEdit(item)} />
                        </span>
                        <span className="cursor-pointer text-[22px]">
                          <MdOutlineDelete
                            onClick={() => handleDeleteItem(item._id)}
                          />
                        </span>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
