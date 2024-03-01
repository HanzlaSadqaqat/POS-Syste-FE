import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";
import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Textarea } from "@nextui-org/react";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const CategoryTable = (props) => {
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories, update]);

  const handleDeleteItem = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.delete(`/category/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      props.setIsDeleted(id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateItem = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.patch(
        `/category/${id}`,
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUpdate("");

      props.setIsDeleted(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setUpdate(item._id);
    setName(item.name);
    setDescription(item.description);
    console.log(item.description);
  };

  const onUpdateClick = () => {};
  return (
    <>
      <div class="overflow-x-auto border-1 shadow-sm rounded-xl">
        <table class="min-w-full divide-y divide-gray-200 ">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category Name
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {categories.length > 0 ? (
              categories.map((item) => (
                <tr className="hover:bg-gray-50">
                  <td class="  overflow-hidden px-6 py-4 whitespace-nowrap ">
                    <div class="flex w-48 items-center">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {update && update === item._id ? (
                            <div>
                              <Input
                                defaultValue={name}
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                              />
                            </div>
                          ) : (
                            <>
                              <div class="text-sm text-gray-900 flex ">
                                {item.name}
                              </div>
                            </>
                          )}{" "}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4  ">
                    {update && update === item._id ? (
                      <div>
                        <Textarea
                          defaultValue={description}
                          rows={4}
                          placeholder="Write description here"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    ) : (
                      <>
                        <div class="text-sm text-gray-900  ">
                          {item.description}
                        </div>
                      </>
                    )}
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium  flex gap-2">
                    {update && update === item._id ? (
                      <>
                        <Button
                          type="primary"
                          ghost
                          onClick={() => handleUpdateItem(item._id)}
                        >
                          Save
                        </Button>
                        <Button danger onClick={() => setUpdate("")}>
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
    </>
  );
};

export default CategoryTable;
