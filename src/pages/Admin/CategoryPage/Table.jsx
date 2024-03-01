import React, { useEffect, useState } from "react";

import { columns } from "./data";
import { Table } from "antd";

export default function TableTab(props) {
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    console.log("jadskjcaklsldcjaklsldcjl", props.categories);

    const data = props.categories.map((item) => ({
      //   _id: item._id,
      name: item.name,
      description: item.description,
      action: (
        <>
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            {update ? (
              <FaRegEdit
                onClick={() => {
                  setUpdate(false);
                }}
              />
            ) : (
              <div onClick={() => setUpdate(true)}>hello</div>
            )}
          </span>
        </>
      ),
    }));
    setCategories(data);
  }, [props.categories]);

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
  useEffect(() => {
    console.log(update);
  }, [update]);

  const onUpdateClick = () => {};

  return (
    <>
      <Table dataSource={categories} columns={columns} />;
    </>
  );
}
