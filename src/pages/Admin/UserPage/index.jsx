import React, { useEffect, useState } from "react";
import Popup from "./popup";
import axios from "axios";
import UserTable from "./UserTable";

export default function User() {
  const [users, setUsers] = useState([]);
  const [deleteItem, setDeleteItem] = useState("");
  const [add, setAdd] = useState();
  useEffect(() => {
    getUsers();
  }, [add, deleteItem]);
  const setIsAdd = (val) => {
    setAdd(val);
  };
  const setIsDeleted = (val) => {
    setDeleteItem(val);
  };

  const getUsers = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("/auth/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setUsers(response.data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div className="">
      <div className="mt-10">
        <div className="flex flex-col gap-10">
          <Popup setIsAdd={setIsAdd} />
          {users.length && (
            <>
              <UserTable user={users} setIsDeleted={setIsDeleted} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
