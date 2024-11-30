import React, { useEffect, useState } from "react";
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

  const fetchData = async () => {
    try {
      const tables = await functionToFetchData();
      setData(tables);
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
                    <h1 className="text-2xl font-normal pb-2">Bàn ({data.length})</h1>
                </div>
                <div className="flex items-center gap-2 justify-end w-full max-w-sm">
                  <Input
                    id="search"
                    placeholder="Số bàn..."
                    className="pl-8"
                  />
                  <Search className="pointer-events-none absolute size-4 select-none opacity-50 mr-2" />
                </div>
                <div className="grid grid-cols-4 gap-y-3">
                    {data.map((table, i) => (
                        <TableCard
                            className="col-span-5 pb-5"
                            key={i}
                            tableID={table.tableID}
                            billID={table.billID}
                            time={table.time}
                            date={table.date}
                            createdBy={table.createdBy}
                            isPending={table.isPending}
                        />
                    ))}
                </div>
            </div>
        </DefaultLayout>
    )
}

