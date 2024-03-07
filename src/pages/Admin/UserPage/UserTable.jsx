import { Button, Input, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

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

export default function UserTable(props) {
  const [users, setUser] = useState([]);
  const [edit, setEdit] = useState();
  const [updateId, setUpdateId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  const handleEdit = (item) => {
    setUpdateId(item._id);
    setName(item.name);
    setEmail(item.email);
    setRole(item.role);
  };
  const handleDeleteItem = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.delete(`/auth/user/${id}`, {
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
        `/auth/user/${id}`,
        {
          role,
          name,
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
      <div className="overflow-x-auto w-full border-1 shadow-sm rounded-xl">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>

              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y w-full divide-gray-200">
            {users.length > 0 ? (
              users.map((item) => (
                <tr className="hover:bg-gray-50">
                  <td className=" w-48 px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
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
                            <div className="text-sm font-medium text-gray-900 flex flex-col">
                              {item.lastName}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4  ">
                    <>
                      <div className="text-sm text-gray-900  ">
                        {item.email}
                      </div>
                    </>
                  </td>
                  <td className="px-6 py-4  ">
                    {updateId && updateId === item._id ? (
                      <>
                        <div>
                          <Select
                            defaultValue={item.role}
                            style={{ width: 120 }}
                            onChange={(e) => setRole(e)}
                            options={selectRole}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-sm text-gray-900  ">
                          {item.role}
                        </div>
                      </>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium  flex gap-2">
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
                        <span className="text-[20px] cursor-pointer">
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
