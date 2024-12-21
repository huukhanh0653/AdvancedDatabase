import React from 'react';
import DefaultLayout from '@/src/admin/layout/DefaultLayout';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';


export default function Bill() {
  const [data, setData] = useState([]);  // Initialize empty array to store data
  const [error, setError] = useState(null);  // Track error state
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
      const totalSize = await fetch(`http://localhost:5000/admin/total-bill${curBranch}`);
      
      const total = await totalSize.json();
      setTotalSize(total.TotalBill);
      setTotalPages(Math.ceil(total.TotalBill / 10));
    }
    catch (error) {
      console.error(error);
    }
    try {
      const data = await fetch(`http://localhost:5000/admin/bill${curBranch}&PageSize=10&CurrentPage=${currentPage}`).then((response) => response.json());
      setData(data);  // Set data in state
    } catch (error) {
      setError(error);  // Update error state
      setLoading(false);  // Update loading state
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
        <h1 className="text-2xl font-normal flex justify-between items-center mb-2 mt-3">Hóa đơn đã hoàn thành ({totalSize})</h1>
        <DataTable columns={columns} data={data} filterProps={{column: "NgayLap", placeholder: "Tìm hóa đơn theo ngày..."}}/>
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


