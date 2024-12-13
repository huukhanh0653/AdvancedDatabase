import React, { useEffect, useState, useMemo } from "react";
import DefaultLayout from "@/src/admin/layout/DefaultLayout";
import { TableCard } from "./table-card";
import { tableInfo } from "./data";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";



const functionToFetchData = () => {
  return tableInfo;
}



export default function Table() {
  const [data, setData] = useState(functionToFetchData());
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      const tables = await functionToFetchData();
      setData(tables);
    } catch (error) {
      console.error(error);
    }
  }

  const filteredData = useMemo(() => {  
    return data.filter(row => {
        const matchesSearch = row.tableID.toString().toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });
  }, [data, searchQuery]);

  // const fetchData = async () => {
  //   try {
  //       const response = await fetch('http://localhost:1433/api/tables/');
  //       if (!response.ok) {
  //           throw new Error('Failed to fetch data');
  //       }
  //       let temp = await response.json();
  //       let data = []
  //       for (let i = 0; i < temp.length; i++) {
  //           if (temp[i].room === 'Bedroom') {
  //               data.push(temp[i])
  //           }
  //       }
  //       setData(data);
  //       setLoading(false);
  //   } catch (error) {
  //       toast.error('Error fetching data');
  //       setLoading(false);
  //   }
  // };
  

  useEffect(() => {
    fetchData();
  });
    

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mt-5">
                    <h1 className="text-2xl font-normal pb-2">Bàn ({filteredData.length})</h1>
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
    )
}

