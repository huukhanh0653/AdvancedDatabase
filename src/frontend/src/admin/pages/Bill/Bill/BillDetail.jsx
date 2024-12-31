import React, { useEffect, useState} from "react";
import DefaultLayout from "@/src/admin/layout/DefaultLayout";
import { CompletedOrderCard } from "../completed-order-card";
import { useParams } from "react-router-dom";







export default function BillDetail() {
  const [data, setData] = useState([]);
  const billID = useParams().billID;


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
                    <h1 className="text-2xl font-normal pb-2">Chi tiết hóa đơn ({data.length})</h1>
                </div>
                {/* <div className="flex items-center gap-2 justify-end w-full max-w-sm">
                  <Label htmlFor="search" className="sr-only">
                    Search
                  </Label>
                  <Input
                    id="search"
                    placeholder="Tìm phiếu đặt món..."
                    className="pl-8"
                  />
                  <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                </div> */}
                <div className="grid grid-cols-4 gap-y-3">
                    {data.map((order, i) => (
                        <CompletedOrderCard 
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