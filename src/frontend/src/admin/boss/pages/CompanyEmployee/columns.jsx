
"use client";

import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { EditEmployeeForm, TransferEmployeeForm, WorkHistoryDetail, TerminateEmployeeForm } from "./CompanyEmployee";
import { Button } from "@/components/ui/button"
import { PopupModal } from "@/components/ui/modal"
import React from "react";
import { formattedDate } from "@/lib/utils";
import { AlertDialogComponent } from "@/src/admin/components/alert-dialog";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns = [
  {
    accessorKey: "MaNV",
    header: ({ column }) => {
      return (
        <Button 
          variant="ghost"
          className="flex items-center justify-start pl-0" // Loại bỏ padding trái và căn nội dung sang trái
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="pr-0">Mã NV</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "HoTen",
    header: "Họ Tên",
  },
  {
    accessorKey: "NgaySinh",
    header: ({ column }) => {
      return (
        <Button 
          variant="ghost"
          className="flex items-center justify-start pl-0" // Loại bỏ padding trái và căn nội dung sang trái
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="pr-0">Ngày sinh</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => formattedDate(row.original.NgaySinh),
  },
  {
    accessorKey: "NgayVaoLam",
    enableResizing: false,
    size: 200,
    header: ({ column }) => {
      return (
        <Button 
          variant="ghost"
          className="flex items-center justify-start pl-0" // Loại bỏ padding trái và căn nội dung sang trái
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="pr-0">Ngày vào làm</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => formattedDate(row.original.NgayVaoLam),
  },
  {
    accessorKey: "NgayNghiViec",
    header: ({ column }) => {
      return (
        <Button 
          variant="ghost"
          className="flex items-center justify-start pl-0" // Loại bỏ padding trái và căn nội dung sang trái
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="pr-0">Ngày nghỉ việc</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) =>
      row.original.NgayNghiViec ? (
        <span>
          {formattedDate(row.original.NgayNghiViec)}
        </span>
      ) : (
        <span>Đang Làm Việc</span> // "Still Working" in Vietnamese
      ),
  },
  {
    accessorKey: "CN_Hientai",
    header: "Chi Nhánh hiện tại",
  },
  {
    accessorKey: "Username",
    header: "Tên Đăng Nhập",
  },
  {
    accessorKey: "MaBP",
    header: ({ column }) => {
      return (
        <Button 
          variant="ghost"
          className="flex items-center justify-start pl-0" // Loại bỏ padding trái và căn nội dung sang trái
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="pr-0">Mã bộ phận</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
  id: "actions",
  cell: ({ row }) => {
    const [editOpen, setEditOpen] = React.useState(false)
    const [terminateOpen, setTerminateOpen] = React.useState(false)
    const [transferOpen, setTransferOpen] = React.useState(false)
    const [workHistoryOpen, setWorkHistoryOpen] = React.useState(false)
    const [reviewOpen, setReviewOpen] = React.useState(false)
    const [review, setReview] = React.useState(0);

    const getEmployeeReview = async () => {
      try {
        const response = await fetch(`http://localhost:5000/admin/employee-review?EmployeeID=${row.original.MaNV}`).then((response) => response.json());
        setReview(response['']);
      }
      catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getEmployeeReview();
    }, [row.original.MaNV]);
    return (
      <>
      <PopupModal
        open={editOpen}
        setOpen={setEditOpen}
        props={{title:"Chỉnh sửa thông tin nhân viên", description:"Nhập thông tin nhân viên"}}
        formComponent={EditEmployeeForm}
        employee = {row.original}
      >
      </PopupModal> 

      <PopupModal
        open={transferOpen}
        setOpen={setTransferOpen}
        props={{title:"Chuyển công tác nhân viên", description:"Nhập thông tin công tác mới"}}
        formComponent={TransferEmployeeForm}
        curBranch = {row.original.CN_Hientai}
        employeeID = {row.original.MaNV}
      >
      </PopupModal> 

      <PopupModal
        open={terminateOpen}
        setOpen={setTerminateOpen}
        props={{title:"Xác nhận thông tin nghỉ việc", description:"Nhập ngày nghỉ việc của nhân viên"}}
        formComponent={TerminateEmployeeForm}
        employeeID = {row.original.MaNV}
      >
      </PopupModal> 
      <PopupModal
        open={workHistoryOpen}
        setOpen={setWorkHistoryOpen}
        props={{title:"Lịch sử công tác", description:"Chi tiết lịch sử công tác của nhân viên"}}
        formComponent={WorkHistoryDetail}
        employeeID = {row.original.MaNV}
        employeeDepartment = {row.original.MaBP}
      >
      </PopupModal> 

      <AlertDialogComponent 
        open= {reviewOpen} 
        setOpen={setReviewOpen} 
        func={() => {}}
        title={"Điểm phục vụ của nhân viên"} 
        description={`Điểm phục vụ của nhân viên này là: ${review}`} 
        >
      </AlertDialogComponent>
      





      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Chức năng</DropdownMenuLabel>
          <DropdownMenuItem onClick= {setWorkHistoryOpen}>
            Xem lịch sử công tác
          </DropdownMenuItem>
          <DropdownMenuItem onClick= {setTransferOpen}>
            Chuyển công tác
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick= {setEditOpen}>
            Chỉnh sửa thông tin
          </DropdownMenuItem>
          <DropdownMenuItem onClick= {setReviewOpen}>
            Điểm đánh giá
          </DropdownMenuItem>
          <DropdownMenuItem onClick= {setTerminateOpen}>
            Xác nhận nghỉ việc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </>
    )
  }},
    
  ];
  