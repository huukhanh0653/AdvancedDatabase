import React from 'react';
import DefaultLayout from '@/src/admin/layout/DefaultLayout';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { columns } from './columns';
import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { PopupModal } from "@/components/ui/modal"
import { DropdownOption } from '../../components/dropdown';
import { formattedDate } from '@/lib/utils';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


export default function Customer() {
  const [data, setData] = useState([]);  
  const [error, setError] = useState(null);  
  const [AddCustomerOpen, setAddCustomerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [totalSize, setTotalSize] = useState(0);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const fetchData = async () => {
    try {
      const totalSize= await fetch(`http://localhost:5000/admin/total-customer`).then((response) => response.json());
      setTotalSize(totalSize.TotalCustomer);
      setTotalPages(Math.ceil(totalSize.TotalCustomer / 10));

      const data = await fetch(`http://localhost:5000/admin/customers?PageSize=10&CurrentPage=${currentPage}`).then((response) => response.json());
      setData(data);  // Set data in state
    } catch (error) {
      setError(error);  // Update error state
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [currentPage]);  // Empty dependency array means this effect runs once when the component mounts
  

  if (error) {
    return <div>Error: {error.message}</div>;  // Display error if any
  }
  return (
      <DefaultLayout>
         <div className="flex justify-between items-center mb-7 mt-0">
          <h1 className="text-2xl font-normal ">Khách hàng ({totalSize})</h1>
          
            <PopupModal open={AddCustomerOpen} setOpen={setAddCustomerOpen} formComponent={AddCustomerForm} props={{title: "Thêm khách hàng", description: "Nhập thông tin khách hàng"}}>
              <Button className="px-6 py-0 text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 rounded-lg ml-6">
                Thêm khách hàng
              </Button>
            </PopupModal>

          </div>
        <DataTable columns={columns} data={data} filterProps={{column: "phoneNumber", placeholder: "Tìm khách hàng bằng số điện thoại..."}}/>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </DefaultLayout>
  )
}


function AddCustomerForm({ className, setOpen, customer }) {
  const [gender, setGender] = useState("Nam");
  const handleClose = () => {
    setOpen(false); // This will close the popup modal
  };


  const handleSubmit = async (e) => {
    const response = await fetch("http://localhost:5000/admin/new_customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: e.target.full_name.value,
        phoneNumber: e.target.phone_number.value,
        ssn: e.target.id_number.value,
        isMale: gender === "Nam" ? 1 : 0,
        email: e.target.email.value,
      }),
    });
    
    if (response.ok) {
      console.log("Thêm khách hàng mới thành công");
    }
    else {
      alert("Thêm khách hàng mới thất bại");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="name">Họ tên</Label>
        <Input type="text" id="full_name" defaultValue="Nguyen Van A" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="gender">Giới tính</Label>
        <DropdownOption id = "gender" className="w-full" options={["Nam", "Nữ"]} value={gender} onValueChange={setGender}/>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="nguyenvana@example" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone_number">Số điện thoại</Label>
        <Input type="text" id="phone_number" defaultValue="sdt.." />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="id_number">Căn cước công dân</Label>
        <Input type ="text" id="id_number" defaultValue="cccd..." />
      </div>
      <Button className= "bg-blue-500 text-white" type="submit">Thêm</Button>
      <Button onClick={handleClose} variant="outline">Hủy</Button>
    </form>
  )
}


export function EditCustomerForm({ className, setOpen, customer }) {
  const [gender, setGender] = useState(customer.gender === "Male" ? "Nam" : "Nữ");

  const handleClose = () => {
    setOpen(false); // This will close the popup modal
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Date:", birthDate);
  };
  
  return (
    <form onSubmit={handleSubmit} className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="name">Họ tên</Label>
        <Input type="text" id="name" defaultValue={customer.fullName} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="gender">Giới tính</Label>
        <DropdownOption id = "gender" className="w-full" options={["Nam", "Nữ"]} value={gender} onValueChange={setGender}/>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue={customer.email} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone_number">Số điện thoại</Label>
        <Input type="text" id="phone_number" defaultValue={customer.phoneNumber} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="id_number">Căn cước công dân</Label>
        <Input type ="text" id="id_number" defaultValue={customer.CCCD} />
      </div>
      <Button className= "bg-blue-500 text-white" type="submit">Sửa</Button>
      <Button onClick={handleClose} variant="outline">Hủy</Button>
    </form>
  )
}


export function MemberShipDetail({ className, customerID }) {
  const rowsPerPage = 4;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetch(`http://localhost:5000/admin/member?CustomerID=${customerID}`).then((response) => response.json());
      setData(data);  
      setTotalPages(Math.ceil(data.length / 4));
    } catch (error) {
      setError(error);  
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  
  return (
    <>
      <Table className= "rounded-lg border border-gray-100 w-[450px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">Mã thẻ</TableHead>
            <TableHead >Ngày lập</TableHead>
            <TableHead>Loại thẻ</TableHead>
            <TableHead className="w-[100px]">Tiền tích lũy</TableHead>
            <TableHead className="w-[100px]">Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          {data.slice(startIndex, endIndex).map((item) => {
            return (
            <React.Fragment key={item.MaThe}>
              <TableRow >
                <TableCell >{item.MaThe}</TableCell>
                <TableCell>{formattedDate(item.NgayLap)}</TableCell>
                <TableCell>{item.LoaiThe}</TableCell>
                <TableCell>{item.DiemTichLuy}</TableCell>
                <TableCell>{item.IsActive == "1" ? "Đang hoạt động" : "Ngưng hoạt động"}</TableCell>
              </TableRow>
            </React.Fragment>
            )
          })}

        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={ 
                startIndex === 0 ? "pointer-events-none opacity-50 " : "cursor-pointer hover:bg-gray-200 active:bg-gray-300"
              }
              onClick={() => {
                setStartIndex(startIndex - rowsPerPage);
                setEndIndex(endIndex - rowsPerPage);
              }} />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className={
                endIndex === data.length ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-gray-200 active:bg-gray-300"
              }
              onClick={() => {
                setStartIndex(startIndex + rowsPerPage); //10
                setEndIndex(endIndex + rowsPerPage); //10 + 10 = 20
              }} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

    </>
  )
}