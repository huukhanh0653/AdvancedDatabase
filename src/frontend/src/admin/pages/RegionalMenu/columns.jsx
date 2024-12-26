
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
    const [addOpen, setAddOpen] = React.useState(false)

    const handleAdd = async () => {
      let userinfo;
      let curBranch = -1;
      const _userbase64 = localStorage.getItem("user");
      if (_userbase64) {
        userinfo = JSON.parse(decodeURIComponent(escape(atob(_userbase64))));
      }
      if(userinfo.MaBP == 6) {
        curBranch = JSON.parse(localStorage.getItem("branch"));
      }
      const response = await fetch(`http://localhost:5000/admin/add_dish_to_branch?Staff=${userinfo.MaNV}&CurBranch=${curBranch}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          DishID: row.original.dishID,
        }),
      });
      if (response.ok) {
        console.log("Thêm món ăn thành công");
      }
      else {
        alert("Thêm món ăn thất bại");
      }
    }

    return (
      <>

      <AlertDialogComponent open= {addOpen} setOpen={setAddOpen} func={handleAdd} title={"Thêm món ăn"} description={"Thêm món ăn này vào thực đơn phục vụ hiện tại của chi nhánh?"} >
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
  