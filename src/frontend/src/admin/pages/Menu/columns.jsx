
"use client";

import { Pen, ArrowUpDown, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PopupModal } from "@/components/ui/modal"
import React from "react";
import { AlertDialogComponent } from "@/src/admin/components/alert-dialog";
import { EditDishForm } from "./Menu";

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
      accessorKey: "id",
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
      accessorKey: "name",
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
        header: ({ column }) => {
        return (
          <Button 
            variant="ghost"
            className="flex items-center justify-start pl-0" // Loại bỏ padding trái và căn nội dung sang trái
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="pr-0">Trạng thái</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
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
      const [editOpen, setEditOpen] = React.useState(false)
      const [deleteOpen, setDeleteOpen] = React.useState(false)
      const [deleteOption, setDeleteOption] = React.useState(false)
      return (
        <>
        <PopupModal
          open={editOpen}
          setOpen={setEditOpen}
          props={{title:"Chỉnh sửa thông tin món ăn", description:"Nhập thông tin chỉnh sửa của món ăn"}}
          formComponent={EditDishForm}
        >
        </PopupModal> 

        <AlertDialogComponent open= {deleteOpen} setOpen={setDeleteOpen} setValue={setDeleteOption} title={"Bạn có chắc chắn muốn xóa không?"} description={"Hành động này sẽ xóa hoàn toàn và không thể khôi phục !"} >
        </AlertDialogComponent>





        <span className="flex items-center justify-center">
            {/* pen icon and delete icon */}
            <Button variant="ghost" onClick={() => setEditOpen(true)}>
                <Pen/>
            </Button>
            <Button variant="ghost" onClick={() => setDeleteOpen(true)}>
                <Trash/>
            </Button>
        </span>
        </>
      )
    }},
    
  ];
  