
"use client";

import { ArrowUpDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react";
import { AlertDialogComponent } from "@/src/admin/components/alert-dialog";
import { Badge } from '@/components/ui/badge';

export const columns = [
  {
    accessorKey: "image",
    header: "Món ăn",
    cell: ({ row }) => {
      return (
        <img src={row.original.image} alt="food" className="w-[70px] h-[70px] rounded-xl" />
      )
    },
  },
  {
    accessorKey: "dishID",
    header: ({ column }) => {
      return (
        <Button 
          variant="ghost"
          className="flex items-center justify-start pl-0" // Loại bỏ padding trái và căn nội dung sang trái
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="pr-0">Mã món ăn</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "dishName",
    header: "Tên món ăn",
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button 
          variant="ghost"
          className="flex items-center justify-start pl-0" // Loại bỏ padding trái và căn nội dung sang trái
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="pr-0">Phân loại</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
      accessorKey: "availability",
      header: "Tình trạng",
      cell: ({ row }) => {
        return (
          <Badge 
            variant={row.original.availability === 1 ? "success" : "danger"}
            className={row.original.availability === 1 ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}>
            {row.original.availability === 1 ? "Đang phục vụ" : "Ngưng phục vụ"}
          </Badge>
        )
      },
  },
  {
    accessorKey: "deliverable",
    header: "Giao hàng",
      cell: ({ row }) => {
        return (
          <Badge 
            variant={row.original.deliverable === 1 ? "success" : "danger"}
            className={row.original.deliverable === 1 ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}>
            {row.original.deliverable === 1 ? "Có" : "Không"}
          </Badge>
        )
      },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button 
          variant="ghost"
          className="flex items-center justify-start pl-0" // Loại bỏ padding trái và căn nội dung sang trái
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="pr-0">Giá món ăn</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
  id: "actions",
  cell: ({ row }) => {
    const [addOpen, setAddOpen] = React.useState(false)
    const [addOption, setAddOption] = React.useState(false)
    return (
      <>

      <AlertDialogComponent open= {addOpen} setOpen={setAddOpen} setValue={setAddOption} title={"Thêm món ăn"} description={"Thêm món ăn này vào thực đơn phục vụ hiện tại của chi nhánh?"} >
      </AlertDialogComponent>




      <span className="flex items-center">
          {/* pen icon and delete icon */}
          <Button variant="ghost" onClick={() => setAddOpen(true)}>
              <Plus/>
          </Button>
      </span>
      </>
    )
  }},
    
  ];
  