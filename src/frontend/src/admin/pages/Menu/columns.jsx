
"use client";

import { Pen, ArrowUpDown, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PopupModal } from "@/components/ui/modal"
import React, { useEffect } from "react";
import { AlertDialogComponent } from "@/src/admin/components/alert-dialog";
import { EditDishForm } from "./Menu";
import { Badge } from "@/components/ui/badge"

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
              variant={row.original.availability == true ? "success" : "danger"}
              className={row.original.availability == true ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}>
              {row.original.availability == true ? "Đang phục vụ" : "Ngưng phục vụ"}
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
              variant={row.original.deliverable == true ? "success" : "danger"}
              className={row.original.deliverable == true ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}>
              {row.original.deliverable == true ? "Có" : "Không"}
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
      const [deleteOpen, setDeleteOpen] = React.useState(false)
      
      return (
        <>
        <AlertDialogComponent 
          open= {deleteOpen} 
          setOpen={setDeleteOpen} 
          func={() => {}}
          title={"Ngưng phục vụ món ăn"} 
          description={"Hành động này sẽ cập nhật trạng thái món ăn thành ngưng phục vụ!"} 
          >
        </AlertDialogComponent>


        <span className="flex items-center justify-center">
            {/* pen icon and delete icon */}
            <Button variant="ghost" onClick={() => setDeleteOpen(true)}>
                <Pen/>
            </Button>
        </span>
        </>
      )
    }},
    
  ];
  