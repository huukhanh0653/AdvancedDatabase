
"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Eye, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
export const columns = [
    {
      accessorKey: "MaHD",
      header: ({ column }) => {
        return (
          <Button 
            variant="ghost"
            className="flex items-center justify-start pl-0" // Loại bỏ padding trái và căn nội dung sang trái
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="pr-0">Mã hóa đơn</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "GiamGia",
      header: "Giảm giá",
    },
    {
      accessorKey: "TongHoaDon",
      header: ({ column }) => {
        return (
          <Button 
            variant="ghost"
            className="flex items-center justify-start pl-0" // Loại bỏ padding trái và căn nội dung sang trái
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="pr-0">Tổng hóa đơn</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "MaThe",
      header: ({ column }) => {
        return (
          <Button 
            variant="ghost"
            className="flex items-center justify-start pl-0" // Loại bỏ padding trái và căn nội dung sang trái
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="pr-0">Mã thẻ</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "NgayLap",
      header: ({ column }) => {
        return (
          <Button 
            variant="ghost"
            className="flex items-center justify-start pl-0" // Loại bỏ padding trái và căn nội dung sang trái
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="pr-0">Ngày lập</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "isEatIn",
      header: "Loại hóa đơn",
      cell: ({ row }) => (
        <span>
          {row.original.isEatIn ? "Dùng tại chỗ" : "Mang về"}
        </span>
      ),
    },
    {
    id: "actions",
    cell: ({ row }) => {
      const navigate = useNavigate(); // Initialize navigate
      return (
        <>
          <Button onClick={() => navigate(`/bill/${row.original.MaHD}`)} className= "justify-center items-center" variant="ghost" >
              <Eye/>
          </Button>
        </>
      )
    }},
  ];
  