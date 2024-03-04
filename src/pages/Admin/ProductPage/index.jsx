import React, { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import Popup from "./Popup";
import axios from "axios";

export default function Category() {
  const [products, setProducts] = useState([]);
  const [deleteItem, setDeleteItem] = useState("");
  const [add, setAdd] = useState();
  useEffect(() => {
    getProducts();
  }, [add, deleteItem]);
  const setIsAdd = (val) => {
    setAdd(val);
  };
  const setIsDeleted = (val) => {
    setDeleteItem(val);
  };

  const getProducts = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("/product", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProducts(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
  return (
    <div className="">
      <div className="mt-10">
        <div className="flex flex-col gap-10">
          <Popup setIsAdd={setIsAdd} />
          {products.length && (
            <>
              <ProductTable product={products} setIsDeleted={setIsDeleted} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
