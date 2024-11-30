import React, { useEffect, useState } from "react";
import DefaultLayout from "@/src/admin/layout/DefaultLayout";
import ReservationCard from "./reservation-card";
import { reservations } from "./data";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";


const functionToFetchData = () => {
  return reservations;
}



export default function Reservation() {
  const [data, setData] = useState(functionToFetchData());

  const fetchData = async () => {
    try {
      const reservation = await functionToFetchData();
      setData(reservation);
    } catch (error) {
      console.error(error);
    }
  }
  

  useEffect(() => {
    fetchData();
  });
    

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mt-5">
                    <h1 className="text-2xl font-normal pb-2">Phiếu đặt bàn ({data.length})</h1>
                </div>
                <div className="flex items-center gap-2 justify-end w-full max-w-sm">
                  <Input
                    id="search"
                    placeholder="Số điện thoại đặt bàn..."
                    className="pl-8"
                  />
                  <Search className="pointer-events-none absolute size-4 select-none opacity-50 mr-2" />
                </div>
                <div className="grid grid-cols-5 gap-y-3">
                    {data.map((row, i) => (
                        <ReservationCard
                            className="col-span-5 pb-5"
                            key={i}
                            reservationID = {row.MaDatBan} 
                            reservationDate = {row.NgayDat}
                            reservationTime = {row.GioDat}
                            paxNumber ={row.SoLuong}
                            fullName = {row.HoTen} 
                            phoneNumber = {row.SoDienThoai}
                            note = {row.GhiChu}
                        />
                    ))}
                </div>
            </div>
        </DefaultLayout>
    )
}

