import React, { useMemo } from 'react';
import DefaultLayout from '@/src/admin/layout/DefaultLayout';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { columns } from './columns';
import { dishes, categories } from './data';
import { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { DropdownOption } from '@/src/admin/components/dropdown';
import { CategoryCard } from '@/src/admin/components/category-card';

const getCategory = () => {
  return categories;
}

async function fetchDishes() {
  return dishes;
}   

function countDishesByCategory(dishes) {
    const categoryCount = {};
  
    dishes.forEach((dish) => {
      const { category } = dish;
      if (categoryCount[category]) {
        categoryCount[category]++;
      } else {
        categoryCount[category] = 1;
      }
    });
    categoryCount["Tất cả"] = dishes.length;
    return categoryCount;
  }

export default function Menu() {
  const [data, setData] = useState([]);  
  const [category, setCategory] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 
  const [dishOfCategory, setDishOfCategory] = useState({})
  const [curCategory, setCurCategory] = useState('');

  
  const filteredData = useMemo(() => {
    return data.filter(row => {
      const matchesCategory = curCategory === '' || row.category === curCategory;
      return matchesCategory;
  })}, [data, curCategory]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const dishes = await fetchDishes();
        setData(dishes);  
        setCategory(categories);
        setLoading(false); 
      } catch (error) {
        setError(error);  
        setLoading(false); 
      }
    };

    fetchData();
  }, []);  
  useEffect(() => {
    setDishOfCategory(countDishesByCategory(data));
    }, [data]);

  if (loading) {
    return <div>Loading...</div>;  
  }

  if (error) {
    return <div>Error: {error.message}</div>;  
  }
  
  
  return (
      <DefaultLayout>
          <Label className="text-2xl font-normal flex justify-between items-center mb-0 mt-3 ">Phân loại ({category.length - 1})</Label>
          <div className="grid grid-cols-10">
            {category.map((item) => (
            <CategoryCard key={item} title={item} itemCount={dishOfCategory[item] || 0} isSelected={curCategory === item}
            onClick={() => {
                setCurCategory(item);
            }} />
            ))}
          </div>
        <DataTable columns={columns} data={filteredData} filterProps={{column: "name", placeholder: "Tìm món ăn bằng tên..."}}/>
      </DefaultLayout>
  )
}



export function EditDishForm({ className, setOpen }) {
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
              <Input type="text" id="dish_id" defaultValue="sashimi13" />
          </div>
          <div className="grid gap-2">
              <Label htmlFor="dish_name">Tên món ăn</Label>
              <Input type="text" id="dish_name" defaultValue="Sushi cá hồi" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Giá tiền</Label>
            <DropdownOption id = "category" className="w-full" options={categories} value={selectedOption} onValueChange={setSelectedOption}/>
          </div>
          <div className="grid gap-2">
              <Label htmlFor="price">Giá tiền</Label>
              <Input type = "money" id="price" defaultValue="12500" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dish_image">Hình ảnh</Label>
            <Input
              type="file"
              id="dish_image"
              onChange={(e) => console.log(e.target.files[0])} // Logs the selected file
            />
          </div>
          <Button type="submit">Sửa</Button>
          <Button onClick={handleClose} variant="outline">Hủy</Button>
      </form>
  )
}

