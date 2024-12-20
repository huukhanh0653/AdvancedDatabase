import React, { useEffect, useState, useMemo } from "react";
import DefaultLayout from "@/src/admin/layout/DefaultLayout";
import { TableCard } from "./table-card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Table() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesSearch = row.tableID
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [data, searchQuery]);

  const fetchData = async () => {
    let curBranch;
    let userinfo;
    const _userbase64 = localStorage.getItem("user");
    if (_userbase64) {
      userinfo = JSON.parse(decodeURIComponent(escape(atob(_userbase64))));
    }
    if (userinfo.MaBP == 6) {
      curBranch = `?CurBranch=${localStorage.getItem("branch")}`;
    } else {
      curBranch = "";
    }

    const api = `http://localhost:5000/admin/info${curBranch}`;

    try {
        const response = await fetch(api, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json", 
            },
        });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json(); 
      setData(data); 
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between mt-5">
          <h1 className="text-2xl font-normal pb-2">
            Bàn ({filteredData.length})
          </h1>
        </div>
        <div className="flex items-center gap-2 justify-end w-full max-w-sm">
          <Input
            id="search"
            placeholder="Số bàn..."
            className="pl-8"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="pointer-events-none absolute size-4 select-none opacity-50 mr-2" />
        </div>
        <div className="grid grid-cols-4 gap-y-3">
          {filteredData.map((table, i) => (
            <TableCard
              className="col-span-5 pb-5"
              key={i}
              tableID={table.tableID}
              billID={table.billID}
              time={table.time}
              date={table.date}
              createdBy={table.createdBy}
              isPending={table.isPending}
              isPaid={table.isPaid}
            />
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
