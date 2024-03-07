import React, { useEffect, useState } from "react";
import UserSidebar from "./Comp/UserSidebar";
import axios from "axios";
import OrdersProcess from "./Comp/OrdersProcess";
import ReportPage from "../../Admin/ReportPage";


export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [products, setProducts] = useState("");
  const [getReports, setGetReports] = useState(false);
  
  useEffect(() => {
    getCategories();
  }, []);
  const getCategoryId = (val) => {
    setCategoryId(val);
    setGetReports(false)
  };

  const getReport  = () => {
    setGetReports(true)
  }

  const getCategories = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("/category", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data.data);
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="grid grid-row-2 grid-flow-col h-screen">
        <div className="col-span-1 ">
          <UserSidebar
            body={getReports? <ReportPage /> : <OrdersProcess categoryId={categoryId} />}
            categories={categories}
            getCategoryId={getCategoryId}
            getReport={getReport}
          />
        </div>
      </div>
    </div>
  );
}
