
"use client";

import { Pen, ArrowUpDown, Trash, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PopupModal } from "@/components/ui/modal"
import React from "react";
import { AlertDialogComponent } from "@/src/admin/components/alert-dialog";
import { EditDishForm, AdjustDishesRegion } from "./CompanyMenu";
import { Badge } from '@/components/ui/badge';
import { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { use } from "react";

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
      const [editOpen, setEditOpen] = React.useState(false)
      const [deleteOpen, setDeleteOpen] = React.useState(false)
      const [northChecked, setNorthChecked] = React.useState(false)
      const [midChecked, setMidChecked] = React.useState(false)
      const [southChecked, setSouthChecked] = React.useState(false)

      const deleteDish = async () => {
        const res = await fetch(`http://localhost:5000/admin/delete_dish?DishID=${row.original.dishID}`, {
          method: "DELETE",
        });
        if (res.ok) {
          console.log("Deleted");
        }
        else {
          alert("Xóa món ăn thất bại");
        }
      }
      useEffect(() => {
        setNorthChecked(row.original.MB == 1)
        setMidChecked(row.original.MT == 1)
        setSouthChecked(row.original.MN == 1)
      }, [row.original])
      return (
        <>
        <PopupModal
          open={editOpen}
          setOpen={setEditOpen}
          props={{title:"Chỉnh sửa thông tin món ăn", description:"Nhập thông tin chỉnh sửa của món ăn"}}
          formComponent={EditDishForm}
          dish={row.original}
        >
        </PopupModal> 

        <AlertDialogComponent 
          open= {deleteOpen} 
          setOpen={setDeleteOpen} 
          func={deleteDish}
          title={"Bạn có chắc chắn muốn xóa không?"} 
          description={"Hành động này sẽ xóa hoàn toàn và không thể khôi phục !"} 
          >
        </AlertDialogComponent>


        <span className="flex items-center justify-center">
            {/* pen icon and delete icon */}
            <Button variant="ghost" onClick={() => setEditOpen(true)}>
                <Pen/>
            </Button>
            <Button variant="ghost" onClick={() => setDeleteOpen(true)}>
                <Trash/>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Khu vực</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={northChecked}
                  onCheckedChange={
                    () => {
                      setNorthChecked(!northChecked)
                      AdjustDishesRegion(row.original.dishID, "MB", northChecked)
                    }
                  }
                >
                  Miền Bắc
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={midChecked}
                  onCheckedChange={
                    () => {
                      setMidChecked(!midChecked)
                      AdjustDishesRegion(row.original.dishID, "MT", midChecked)
                    }
                  }
                >
                  Miền Trung
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={southChecked}
                  onCheckedChange={
                    () => {
                      setSouthChecked(!southChecked)
                      AdjustDishesRegion(row.original.dishID, "MN", southChecked)
                    }
                  }
                >
                  Miền Nam
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </span>
        </>
      )
    }},
    
  ];
  