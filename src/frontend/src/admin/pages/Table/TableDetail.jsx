import React, { useEffect, useState } from "react";
import DefaultLayout from "@/src/admin/layout/DefaultLayout";
import { OrderCard } from "./order-card";
import { Orders } from "./data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";




export default function TableDetail() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { tableID, billID } = useParams();




  const fetchData = async () => {
    const api = `http://localhost:5000/admin/bill-detail?billID=${billID}`;

    try {
      const response = await fetch(api, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json"
      }});

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log(data);

      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
    

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mt-5">
                    <h1 className="text-2xl font-normal pb-2">Chi tiết bàn ({data.length})</h1>
                      <Button 
                        onClick={() => navigate(`/table/${tableID}/${billID}/order`)}
                        className="bg-blue-500 text-white mr-3">Đặt món ăn
                      </Button>
                </div>
                <div className="grid grid-cols-4 gap-y-3">
                    {data.map((order, i) => (
                        <OrderCard 
                            className="col-span-5 pb-5"
                            key={i}
                            data={order.data}
                            orderID={order.orderID}
                            date={order.date}
                            time={order.time}
                            subTotal={order.subTotal}
                            createdBy={order.createdBy}
                            tableID={order.tableID}
                            isPending={order.isPending}
                        />
                    ))}
                </div>
            </div>
        </DefaultLayout>
    )
}