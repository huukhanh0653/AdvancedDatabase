import React from "react";
import { Input } from "@/components/ui/input";

export function TableSearch({ table, column, placeholder }) {
  

  return (
    <div className="flex items-center py-4">
        <Input
          placeholder={placeholder}
          value={(table.getColumn(column)?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn(column)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
    </div>
  );
}