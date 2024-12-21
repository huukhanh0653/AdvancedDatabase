import React from 'react';
import DefaultLayout from '@/src/admin/layout/DefaultLayout';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { categories } from '@/lib/publicData';
import { useEffect, useState, useMemo } from 'react';
import { Label } from "@/components/ui/label"
import { CategoryCard } from '@/src/admin/components/category-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';


function fetchCategories() {
  return categories;
}

export default function RegionalMenu() {
  const [data, setData] = useState([]);  
  const [category, setCategory] = useState(fetchCategories());  
  const [error, setError] = useState(null);  
  const [dishOfCategory, setDishOfCategory] = useState({})
  const [curCategory, setCurCategory] = useState('Sushi');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);

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
      const response = await fetch(`http://localhost:5000/admin/regional-dish-info${curBranch}`).then((response) => response.json());
      setDishOfCategory(response.data);

      setTotalPages(Math.ceil(response.total / 10));

      const data = await fetch(`http://localhost:5000/admin/regional-dishes${curBranch}&Category=${curCategory}&PageSize=10&CurrentPage=${currentPage}`).then((response) => response.json());
      setData(data);  
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchData();
  }, [curCategory]);  

  useEffect(() => {
    fetchData();
    }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage]);
  
  if (error) {
    return <div>Error: {error.message}</div>;  // Display error if any
  }
  
  
  return (
      <DefaultLayout>
          <Label className="text-2xl font-normal flex justify-between items-center mb-0 mt-3 ">Phân loại ({category.length})</Label>
          {/* loop to create card for categories */}
          <div className="grid grid-cols-10">
            {category.map((item) => (
            <CategoryCard key={item} title={item} itemCount={dishOfCategory[item] || 0} isSelected={curCategory === item}
            onClick={() => {
                setCurCategory(item);
            }} />
            ))}
          </div>
        <DataTable columns={columns} data={data} filterProps={{column: "dishName", placeholder: "Tìm món ăn bằng tên..."}}/>
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





