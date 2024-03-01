import React from "react";
import { Space, Table, Tag } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
const DashboardTable = () => {
  return (
    <>
      {" "}
      <div className="p-2 pb-5 text-[24px] font-semibold text-gray-500">
        Orders List
      </div>
      <div class="overflow-x-auto border-1 shadow-sm rounded-xl">
        <table class="min-w-full divide-y divide-gray-200 ">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order Id
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
            {/* {categories.length > 0 ? (
            categories.map((item) => ( */}
            <tr className="hover:bg-gray-50">
              <td class="  overflow-hidden px-6 py-4 whitespace-nowrap ">
                <div class="flex w-48 items-center">
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {/* {update && update === item._id ? (
                          <div>
                            <Input
                              defaultValue={name}
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                            />
                          </div>
                        ) : ( */}
                      <>
                        <div class="text-sm text-gray-900 flex ">name</div>
                      </>
                      {/* )}{" "} */}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4  ">
                {/* {update && update === item._id ? (
                    <div>
                      <Textarea
                        defaultValue={description}
                        rows={4}
                        placeholder="Write description here"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  ) : ( */}
                <>
                  <div class="text-sm text-gray-900  ">description </div>
                </>
                {/* )} */}
              </td>

              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium  flex gap-2">
                {/* {update && update === item._id ? (
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
                  ) : ( */}
                <>
                  <span class="text-[20px] cursor-pointer">
                    <FaRegEdit />
                  </span>
                  <span className="cursor-pointer text-[22px]">
                    <MdOutlineDelete />
                  </span>
                </>
                {/* )} */}
              </td>
            </tr>
            {/* ))
          ) : (s
            <></>
          )} */}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default DashboardTable;
