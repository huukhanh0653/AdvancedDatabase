import React, { useEffect, useMemo, useState } from "react";
import DefaultLayout from "@/src/admin/layout/DefaultLayout";
import ReservationCard from "./reservation-card";
import { reservations } from "./data";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";


const functionToFetchData = () => {
  return reservations;
}



export default function Reservation() {
  const [data, setData] = useState(functionToFetchData());
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState(new Date());

  const filteredData = useMemo(() => {
    return data.filter(row => {
        const formattedDate = new Intl.DateTimeFormat('en-GB').format(date); // "05/12/2024"
        const matchesDate = row.NgayDat === formattedDate.toString();
        const matchesSearch = row.SoDienThoai.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDate && matchesSearch;
    });
}, [data, date, searchQuery]);


  const updateDate = useMemo(() => {
    return (date) => {
      setDate(date);
    }
  }, [setDate]);

  const fetchData = async () => {
    try {
      const reservation = await functionToFetchData();
      setData(reservation);
    } catch (error) {
      console.error(error);
    }
  }

  // const testfetchData = async () => {
  //   let curBranch
  //   let userinfo;
  //   const _userbase64 = localStorage.getItem("user");
  //   if (_userbase64) {
  //     userinfo = JSON.parse(decodeURIComponent(escape(atob(_userbase64))));
  //   }
  //   if(userinfo.MaBP == 6) {
  //     curBranch=`?id=${localStorage.getItem('branch')}`;
  //   }
  //   else {
  //     curBranch = '';
  //   }
  //   const formattedDate = new Intl.DateTimeFormat('en-GB').format(date); 
  //   const api = `http://localhost:5000/admin/reservations${curBranch ? curBranch : ''}&date=2024-12-05`;
  //   try {
  //       const response = await fetch(api, 
  //         {
  //           method: "GET",
  //           headers: {
  //               "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (!response.ok) {
  //           throw new Error('Failed to fetch data');
  //       }
  //       let data = await response.json();
  //       console.log(data);
  //   } catch (error) {
  //       console.log('Error fetching data');
  //   }
  // };
  

  useEffect(() => {
    fetchData();
    // testfetchData();
  });
    

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mt-5">
                    <h1 className="text-2xl font-normal pb-2">Phiếu đặt bàn ({filteredData.length})</h1>
                </div>
                <div className="flex items-center gap-1 justify-end mr-7">
                  <DatePicker
                      date = {date}
                      onDateChange={updateDate}
                  />
                </div>
                <div className="flex items-center gap-1 justify-end w-full max-w-sm mb-3">
                  <Input
                    id="search"
                    placeholder="Số điện thoại đặt bàn..."
                    className="pl-8"
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  <Search className="pointer-events-none absolute size-4 select-none opacity-50 mr-2" />
                </div>
                <div className="grid grid-cols-5 gap-y-3">
                    {filteredData.map((row, i) => (
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
                            billID = {row.MaHoaDon}
                        />
                    ))}
                </div>
            </div>
        </DefaultLayout>
    )
}

