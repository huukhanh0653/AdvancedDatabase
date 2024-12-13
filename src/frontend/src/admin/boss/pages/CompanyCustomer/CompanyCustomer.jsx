import React from 'react';
import BossLayout from '@/src/admin/layout/BossLayout';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { columns } from './columns';
import { customers } from './data';
import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { PopupModal } from "@/components/ui/modal"
import { DropdownOption } from '@/src/admin/components/dropdown';

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

async function fetchCustomers() {
  return customers;
}   

export default function CompanyCustomer() {
  const [data, setData] = useState([]);  // Initialize empty array to store data
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track error state
  const [AddCustomerOpen, setAddCustomerOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customers = await fetchCustomers();
        setData(customers);  // Update the state with fetched data
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        setError(error);  // Handle error if any
        setLoading(false);  // Set loading to false even in case of error
      }
    };
    
    fetchData();
  }, []);  // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;  // Display loading message while fetching data
  }

  if (error) {
    return <div>Error: {error.message}</div>;  // Display error if any
  }
  return (
      <BossLayout>
         <div className="flex justify-between items-center mb-7 mt-0">
          <h1 className="text-2xl font-normal ">Khách hàng ({data.length})</h1>
          
            <PopupModal open={AddCustomerOpen} setOpen={setAddCustomerOpen} formComponent={AddCustomerForm} props={{title: "Thêm khách hàng", description: "Nhập thông tin khách hàng"}}>
              <Button className="px-6 py-0 text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 rounded-lg ml-6">
                Thêm khách hàng
              </Button>
            </PopupModal>

          </div>
        <DataTable columns={columns} data={data} filterProps={{column: "SDT", placeholder: "Tìm khách hàng bằng số điện thoại..."}}/>
      </BossLayout>
  )
}


function AddCustomerForm({ className, setOpen }) {
  const [gender, setGender] = useState("Nam");
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
        <Input type="text" id="name" defaultValue="Nguyễn Văn A" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="gender">Giới tính</Label>
        <DropdownOption id = "gender" className="w-full" options={["Nam", "Nữ"]} value={gender} onValueChange={setGender}/>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="user@example.flowers" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone_number">Số điện thoại</Label>
        <Input type="text" id="phone_number" defaultValue="0901234566" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="id_number">Căn cước công dân</Label>
        <Input type ="text" id="id_number" defaultValue="0791235503543" />
      </div>
      <Button type="submit">Thêm</Button>
      <Button onClick={handleClose} variant="outline">Hủy</Button>
    </form>
  )
}


export function EditCustomerForm({ className, setOpen }) {
  const [gender, setGender] = useState("Nam");

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
        <Input type="text" id="name" defaultValue="Nguyễn Văn A" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="gender">Giới tính</Label>
        <DropdownOption id = "gender" className="w-full" options={["Nam", "Nữ"]} value={gender} onValueChange={setGender}/>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="user@example.flowers" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone_number">Số điện thoại</Label>
        <Input type="text" id="phone_number" defaultValue="0901234566" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="id_number">Căn cước công dân</Label>
        <Input type ="text" id="id_number" defaultValue="0791235503543" />
      </div>
      <Button type="submit">Sửa</Button>
      <Button onClick={handleClose} variant="outline">Hủy</Button>
    </form>
  )
}


export function MemberShipDetail({ className }) {
  const rowsPerPage = 4;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);
  const data = [
    {
        MaThe: "KH609677",
        NgayLap: "26-12-2013",
        LoaiThe: "Normal",
        Discount: "5",
        MaNV: "990",
        isActive: "1",
        MaKH: "1"
    },
    {
        MaThe: "KH184234",
        NgayLap: "29-08-2014",
        LoaiThe: "Gold",
        Discount: "15",
        MaNV: "1094",
        isActive: "0",
        MaKH: "1"
    },
    {
        MaThe: "KH362333",
        NgayLap: "31-05-2010",
        LoaiThe: "Gold",
        Discount: "15",
        MaNV: "5091",
        isActive: "0",
        MaKH: "1"
    },
    {
        MaThe: "KH952362",
        NgayLap: "25-11-2018",
        LoaiThe: "Gold",
        Discount: "15",
        MaNV: "1675",
        isActive: "0",
        MaKH: "1"
    }
  ];
  
  const getData = async () => {
    return data;
  }
  useEffect(() => {
    getData();
  }, [])

  
  return (
    <>
      <Table className= "rounded-lg border border-gray-100">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Mã thẻ</TableHead>
            <TableHead >Ngày lập</TableHead>
            <TableHead>Loại thẻ</TableHead>
            <TableHead>Giảm giá (%)</TableHead>
            <TableHead>Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          {data.slice(startIndex, endIndex).map((item) => {
            return (
            <React.Fragment key={item.MaThe}>
              <TableRow >
                <TableCell >{item.MaThe}</TableCell>
                <TableCell>{item.NgayLap}</TableCell>
                <TableCell>{item.LoaiThe}</TableCell>
                <TableCell>{item.Discount}</TableCell>
                <TableCell>{item.isActive === "1" ? "Đang hoạt động" : "Ngưng hoạt động"}</TableCell>
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