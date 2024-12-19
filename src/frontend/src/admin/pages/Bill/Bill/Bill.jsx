import React from 'react';
import DefaultLayout from '@/src/admin/layout/DefaultLayout';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { useEffect, useState } from 'react';

import { bills } from './data';

async function fetchBills() {
  return bills;
}   

export default function Bill() {
  const [data, setData] = useState([]);  // Initialize empty array to store data
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track error state
  // const fetchData = async () => {
  //   let curBranch
  //   let userinfo;
  //   const _userbase64 = localStorage.getItem("user");
  //   if (_userbase64) {
  //     userinfo = JSON.parse(decodeURIComponent(escape(atob(_userbase64))));
  //   }
  //   if(userinfo.MaBP == 6) {
  //     curBranch=`?id=${localStorage.getItem('branch')}`;
  //   }
  //   else {
  //     curBranch = '';
  //   }
  //   const api = `http://localhost:5000/admin/bill${curBranch}`;
  //   try {
  //     const data = await fetch(api)  // Fetch data from API
  //     setData(data);  // Set data in state
  //     setLoading(false);  // Update loading state
  //   } catch (error) {
  //     setError(error);  // Update error state
  //     setLoading(false);  // Update loading state
  //   }
  // };

  useEffect(() => {  
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
        <h1 className="text-2xl font-normal flex justify-between items-center mb-2 mt-3">Hóa đơn đã hoàn thành ({data.length})</h1>
        <DataTable columns={columns} data={data} filterProps={{column: "NgayLap", placeholder: "Tìm hóa đơn theo ngày..."}}/>
      </DefaultLayout>
  )
}


