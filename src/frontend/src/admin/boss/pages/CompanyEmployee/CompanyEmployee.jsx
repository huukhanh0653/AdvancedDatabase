import React from 'react';
import BossLayout from '@/src/admin/layout/BossLayout';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { columns } from './columns';
import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { PopupModal } from "@/components/ui/modal"
import { DatePicker } from '@/components/ui/date-picker';
import { formattedDate } from "@/lib/utils";
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


export default function CompanyEmployee() {
  const [data, setData] = useState([]);  // Initialize empty array to store data
  const [error, setError] = useState(null);  // Track error state
  const [AddEmployeeOpen, setAddEmployeeOpen] = useState(false);
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
    let curBranch
    let userinfo;
    const _userbase64 = localStorage.getItem("user");
    if (_userbase64) {
      userinfo = JSON.parse(decodeURIComponent(escape(atob(_userbase64))));
    }
    if(userinfo.MaBP == 6) {
      curBranch=`?CurBranch=${localStorage.getItem('branch')}`;
    }
    else {
      curBranch = '';
    }
    try {
      const totalSize = await fetch(`http://localhost:5000/company/total-employee`);

      const total = await totalSize.json();

      setTotalSize(total.TotalEmployee);
      setTotalPages(Math.ceil(total.TotalEmployee / 10));
    }
    catch (error) {
      console.error(error);
    }
    try {
      const data = await fetch(`http://localhost:5000/company/employees${curBranch}&PageSize=10&CurrentPage=${currentPage}`).then((response) => response.json());
      setData(data); 
    } catch (error) {
      setError(error);  
    }
  };




  useEffect(() => {
    fetchData();
  }, [currentPage]);  
  if (error) {
    return <div>Error: {error.message}</div>;  
  }
  return (
      <BossLayout>
         <div className="flex justify-between items-center mb-7 mt-0">
          <h1 className="text-2xl font-normal ">Nhân viên ({totalSize})</h1>
          
            <PopupModal open={AddEmployeeOpen} setOpen={setAddEmployeeOpen} formComponent={AddEmployeeForm} props={{title: "Thêm nhân viên mới", description: "Nhập thông tin nhân viên"}}>
              <Button className="px-6 py-0 text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 rounded-lg ml-6">
                Thêm nhân viên
              </Button>
            </PopupModal>

          </div>
        <DataTable columns={columns} data={data} filterProps={{column: "HoTen", placeholder: "Tìm nhân viên bằng tên..."}}/>
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
      </BossLayout>
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
        <Label htmlFor="department">Mã bộ phận</Label>
        <Input id="department" defaultValue="1" />
      </div>
      <Button type="submit">Thêm</Button>
      <Button onClick={handleClose} variant="outline">Hủy</Button>
    </form>
  )
}


export function EditEmployeeForm({ className, setOpen, employee }) {
  const handleClose = () => {
    setOpen(false); // This will close the popup modal
  };
  const [birthDate, setBirthDate] = useState(employee.NgaySinh);
  const [startDate, setStartDate] = useState(employee.NgayVaoLam);
  const [terminateDate, setTerminateDate] = useState(employee.NgayNghiViec);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Date:", birthDate);
  };
  
  return (
    <form onSubmit={handleSubmit} className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="name">Họ tên</Label>
        <Input type="text" id="name" defaultValue={employee.HoTen}/>
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
        <Label htmlFor="department">Mã bộ phận</Label>
        <Input id="department" defaultValue={employee.MaBP} />
      </div>
      <Button className="bg-blue-500 text-white" type="submit">Sửa</Button>
      <Button onClick={handleClose} variant="outline">Hủy</Button>
    </form>
  )
}

export function TransferEmployeeForm({ className, setOpen, curBranch }) {
  const handleClose = () => {
    setOpen(false); // This will close the popup modal
  };
  const [startDate, setStartDate] = useState(new Date());


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Date:", startDate);
  };
  
  return (
    <form onSubmit={handleSubmit} className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="branch">Chi nhánh công tác hiện tại</Label>
        <Input type="text" id="branch" defaultValue={curBranch} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="new_branch">Chi nhánh công tác mới</Label>
        <Input type="text" id="new_branch" defaultValue="Chi nhánh mới..." />
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
        <Input type="password" id="manager_confirm" defaultValue="" />
      </div>
      <Button className="bg-blue-500 text-white" type="submit">Xác nhận</Button>
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

export function WorkHistoryDetail({ className, employeeID, employeeDepartment }) {
  const rowsPerPage = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [data, setData] = useState([]);
  
  
  const fetchData = async () => {
    try {
      const data = await fetch(`http://localhost:5000/company/work-history?employeeID=${employeeID}`).then((response) => response.json());
      setData(data);  
    } catch (error) {
      setError(error); 
    }
  }
  useEffect(() => {
    fetchData();
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
            <React.Fragment key={`${item.MaCN}-${item.NgayBatDau}-${item.NgayKetThuc}`}>
              <TableRow >
                <TableCell >{item.MaCN}</TableCell>
                <TableCell>{formattedDate(item.NgayBatDau)}</TableCell>
                <TableCell>{formattedDate(item.NgayKetThuc)}</TableCell>
                <TableCell>{employeeDepartment}</TableCell>
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