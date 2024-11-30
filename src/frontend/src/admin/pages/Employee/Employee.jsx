import React from 'react';
import DefaultLayout from '@/src/admin/layout/DefaultLayout';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { columns } from './columns';
import { employees } from './data';
import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { PopupModal } from "@/components/ui/modal"
import { DatePicker } from '@/components/ui/date-picker';
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

async function fetchEmployees() {
  return employees;
}   

export default function Employee() {
  const [data, setData] = useState([]);  // Initialize empty array to store data
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track error state
  const [AddEmployeeOpen, setAddEmployeeOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await fetchEmployees();
        setData(employees);  // Update the state with fetched data
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
      <DefaultLayout>
         <div className="flex justify-between items-center mb-7 mt-0">
          <h1 className="text-2xl font-normal ">Nhân viên ({data.length})</h1>
          
            <PopupModal open={AddEmployeeOpen} setOpen={setAddEmployeeOpen} formComponent={AddEmployeeForm} props={{title: "Thêm nhân viên mới", description: "Nhập thông tin nhân viên"}}>
              <Button className="px-6 py-0 text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 rounded-lg ml-6">
                Thêm nhân viên
              </Button>
            </PopupModal>

          </div>
        <DataTable columns={columns} data={data} filterProps={{column: "HoTen", placeholder: "Tìm nhân viên bằng tên..."}}/>
      </DefaultLayout>
  )
}


function AddEmployeeForm({ className, setOpen }) {
  const handleClose = () => {
    setOpen(false); // This will close the popup modal
  };
  const [birthDate, setBirthDate] = useState(null);
  const [startDate, setStartDate] = useState(null);


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
        <Label htmlFor="dob">Ngày sinh</Label>
        <DatePicker
          date={birthDate} /* Pass state value */
          onDateChange={setBirthDate} /* Pass state handlers */
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="start_date">Ngày vào làm</Label>
        <DatePicker 
          date={startDate} /* Pass state value */
          onDateChange={setStartDate} /* Pass state handlers */
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Tên đăng nhập tài khoản POS</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="department">Mã bộ phận</Label>
        <Input id="department" defaultValue="1" />
      </div>
      <Button type="submit">Thêm</Button>
      <Button onClick={handleClose} variant="outline">Hủy</Button>
    </form>
  )
}


export function EditEmployeeForm({ className, setOpen }) {
  const handleClose = () => {
    setOpen(false); // This will close the popup modal
  };
  const [birthDate, setBirthDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [terminateDate, setTerminateDate] = useState(null);


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
        <Label htmlFor="dob">Ngày sinh</Label>
        <DatePicker
          date={birthDate} /* Pass state value */
          onDateChange={setBirthDate} /* Pass state handlers */
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="start_date">Ngày vào làm</Label>
        <DatePicker 
          date={startDate} /* Pass state value */
          onDateChange={setStartDate} /* Pass state handlers */
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="terminate_date">Ngày nghỉ việc</Label>
        <DatePicker 
          date={terminateDate} 
          onDateChange={setTerminateDate} 
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Tên đăng nhập tài khoản POS</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="department">Mã bộ phận</Label>
        <Input id="department" defaultValue="1" />
      </div>
      <Button type="submit">Sửa</Button>
      <Button onClick={handleClose} variant="outline">Hủy</Button>
    </form>
  )
}

export function TransferEmployeeForm({ className, setOpen }) {
  const handleClose = () => {
    setOpen(false); // This will close the popup modal
  };
  const [startDate, setStartDate] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Date:", startDate);
  };
  
  return (
    <form onSubmit={handleSubmit} className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="branch">Chi nhánh công tác hiện tại</Label>
        <Input type="text" id="branch" defaultValue="1" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="new_branch">Chi nhánh công tác mới</Label>
        <Input type="text" id="new_branch" defaultValue="2" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="start_date">Ngày bắt đầu công tác</Label>
        <DatePicker 
          date={startDate} /* Pass state value */
          onDateChange={setStartDate} /* Pass state handlers */
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="manager_confirm">Nhập mật khẩu quản lí để xác nhận</Label>
        <Input type="password" id="manager_confirm" defaultValue="****" />
      </div>
      <Button type="submit">Xác nhận</Button>
      <Button onClick={handleClose} variant="outline">Hủy</Button>
    </form>
  )
}


export function TerminateEmployeeForm({ className, setOpen }) {
  const handleClose = () => {
    setOpen(false); // This will close the popup modal
  };
  const [endDate, setEndDate] = useState(new Date());


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Date:", endDate);
  };
  
  return (
    <form onSubmit={handleSubmit} className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="end_date">Ngày nghỉ việc</Label>
        <DatePicker 
          date={endDate} /* Pass state value */
          onDateChange={setEndDate} /* Pass state handlers */
        />
      </div>
      <div className='flex justify-between'>
        <Button onClick={handleClose} variant="outline">Hủy</Button>
        <Button type="submit">Xác nhận</Button>
      </div>
    </form>
  )
}

export function WorkHistoryDetail({ className }) {
  const rowsPerPage = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const data = [
    { branch: "Hà Nội", startDate: "2024-11-01", endDate: "2024-11-15", department: "Nhân sự" },
    { branch: "TP. HCM", startDate: "2024-11-05", endDate: "2024-11-20", department: "Kế toán" },
    { branch: "Đà Nẵng", startDate: "2024-10-25", endDate: "2024-11-10", department: "Kỹ thuật" },
    { branch: "Cần Thơ", startDate: "2024-11-03", endDate: "2024-11-18", department: "Marketing" },
    { branch: "Hải Phòng", startDate: "2024-10-30", endDate: "2024-11-12", department: "Bán hàng" },
    { branch: "Nha Trang", startDate: "2024-11-07", endDate: "2024-11-21", department: "Thiết kế" },
    { branch: "Nha Trang", startDate: "2024-11-09", endDate: "2024-11-21", department: "Thiết kế" },
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
            <TableHead className="w-[100px]">Chi nhánh</TableHead>
            <TableHead >Ngày bắt đầu</TableHead>
            <TableHead >Ngày kết thúc</TableHead>
            <TableHead>Bộ phận</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          {data.slice(startIndex, endIndex).map((item) => {
            return (
            <React.Fragment key={`${item.branch}-${item.startDate}-${item.endDate}`}>
              <TableRow >
                <TableCell >{item.branch}</TableCell>
                <TableCell>{item.startDate}</TableCell>
                <TableCell>{item.endDate}</TableCell>
                <TableCell>{item.department}</TableCell>
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