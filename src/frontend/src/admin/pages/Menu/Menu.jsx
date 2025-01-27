import React from 'react';
import DefaultLayout from '@/src/admin/layout/DefaultLayout';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { columns } from './columns';
import { categories } from '@/lib/publicData';
import { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { DropdownOption } from '@/src/admin/components/dropdown';
import { CategoryCard } from '@/src/admin/components/category-card';

const getCategory = () => {
  return categories;
}

export default function Menu() {
  const [data, setData] = useState([]);  
  const [category, setCategory] = useState(getCategory());  
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
      const dishPerCategory = await fetch(`http://localhost:5000/admin/dish-per-category${curBranch}`).then((response) => response.json());
      setDishOfCategory(dishPerCategory);

      const totalSize = await fetch(`http://localhost:5000/admin/total-dish${curBranch}&Category=${curCategory}`);
      
      const total = await totalSize.json();
      setTotalPages(Math.ceil(total.TotalDish / 10));

      const data = await fetch(`http://localhost:5000/admin/dishes${curBranch}&Category=${curCategory}&PageSize=10&CurrentPage=${currentPage}`).then((response) => response.json());
      setData(data);  
    }
    catch (error) {
      console.error(error);
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
    return <div>Error: {error.message}</div>;  
  }
  
  
  return (
    <DefaultLayout>
        <Label className="text-2xl font-normal flex justify-between items-center mb-0 mt-3 ">Phân loại ({category.length})</Label>
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



export function EditDishForm({ className, setOpen, dish }) {
  const handleClose = () => {
      setOpen(false); // This will close the popup modal
  };
  const [categories, setCategory] = useState(getCategory());
  const [selectedOption, setSelectedOption] = useState(categories[1]);

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Selected Date:", birthDate);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("grid items-start gap-4", className)}>
        <div className="grid gap-2">
            <Label htmlFor="dish_id">Mã món ăn</Label>
            <Input disabled type="text" id="dish_id" defaultValue={dish.dishID} />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="dish_name">Tên món ăn</Label>
            <Input type="text" id="dish_name" defaultValue={dish.dishName} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Giá tiền</Label>
          <DropdownOption id = "category" className="w-full" options={categories} value={selectedOption} onValueChange={setSelectedOption}/>
        </div>
        <div className="grid gap-2">
            <Label htmlFor="price">Giá tiền</Label>
            <Input type = "money" id="price" defaultValue={dish.price}/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="dish_image">Hình ảnh</Label>
          <Input
            type="file"
            id="dish_image"
            onChange={(e) => console.log(e.target.files[0])} 
          />
        </div>
        <Button type="submit">Sửa</Button>
        <Button onClick={handleClose} variant="outline">Hủy</Button>
    </form>
  )
}

