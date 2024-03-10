import React, { useEffect, useState } from "react";
import UserSidebar from "./Comp/UserSidebar";
import axios from "axios";
import OrdersProcess from "./Comp/OrdersProcess";
import ReportPage from "../../Admin/ReportPage";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [products, setProducts] = useState("");
  const [setReports, setSetReports] = useState(false);
  
  useEffect(() => {
    getCategories();
  }, []);

  const getCategoryId = (val) => {
    setCategoryId(val);
    setSetReports(false)
  };

  const getReport  = () => {
    setSetReports(true)
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
        {console.log("NAUMAN",setReports)}
        <div className="col-span-1 ">
          <UserSidebar
            body={setReports? <ReportPage /> : <OrdersProcess categoryId={categoryId} />}
            categories={categories}
            getCategoryId={getCategoryId}
            getReport={getReport}
          />
        </div>
      </div>
    </div>
  );
}
