
"use client";

import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { EditCustomerForm, MemberShipDetail } from "./Customer";
import { Button } from "@/components/ui/button"
import { PopupModal } from "@/components/ui/modal"
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlertDialogComponent } from "../../components/alert-dialog";

export const columns = [
    {
      accessorKey: "MaKH",
      header: ({ column }) => {
        return (
          <Button 
            variant="ghost"
            className="flex items-center justify-start pl-0" // Loại bỏ padding trái và căn nội dung sang trái
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="pr-0">Mã KH</span>
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
      accessorKey: "Email",
      header: "Email",
    },
    {
      accessorKey: "SDT",
      header: "Số Điện Thoại",
    },
    {
      accessorKey: "GioiTinh",
      header: ({ column }) => {
        return (
          <Button 
            variant="ghost"
            className="flex items-center justify-start pl-0" // Loại bỏ padding trái và căn nội dung sang trái
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="pr-0">Giới tính</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "Username",
      header: "Tên Đăng Nhập",
    },
    {
    id: "actions",
    cell: ({ row }) => {
      const [editOpen, setEditOpen] = React.useState(false)
      const [createMemberOpen, setCreateMemberOpen] = React.useState(false)
      const [createMemberOption, setCreateMemberOption] = React.useState(false)
      const [memberOpen, setMemberOpen] = React.useState(false)
      const [deleteOpen, setDeleteOpen] = React.useState(false)
      const [deleteOption, setDeleteOption] = React.useState(false)

      return (
        <>
        <PopupModal
          open={editOpen}
          setOpen={setEditOpen}
          props={{title:"Chỉnh sửa thông tin khách hàng", description:"Nhập thông tin chỉnh sửa của khách hàng"}}
          formComponent={EditCustomerForm}
        >
        </PopupModal> 

        <PopupModal
          open={memberOpen}
          setOpen={setMemberOpen}
          props={{title:"Thông tin thành viên", description:"Thông tin chi tiết lịch sử thẻ thành viên"}}
          formComponent={MemberShipDetail}
        >
        </PopupModal> 
        

        <AlertDialogComponent open= {deleteOpen} setOpen={setDeleteOpen} setValue={setDeleteOption} title={"Bạn có chắc chắn muốn xóa không?"} description={"Hành động này sẽ xóa hoàn toàn và không thể khôi phục !"} >
        </AlertDialogComponent>
        
        <AlertDialogComponent open= {createMemberOpen} setOpen={setCreateMemberOpen} setValue={setCreateMemberOption} title={"Tạo thẻ thành viên?"} description={"Xác nhận tạo thêm thẻ thành viên!"} >
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
            <DropdownMenuItem onClick= {setMemberOpen}>
              Xem thông tin thành viên
            </DropdownMenuItem>
            <DropdownMenuItem onClick= {setCreateMemberOpen}>
              Tạo thẻ thành viên
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick= {setEditOpen}>
              Chỉnh sửa thông tin
            </DropdownMenuItem>
            <DropdownMenuItem onClick= {setDeleteOpen}>
              Xóa khách hàng
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </>
      )
    }},
    
  ];
  