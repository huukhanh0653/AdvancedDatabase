import React from 'react';
import BossLayout from '@/src/admin/layout/BossLayout';
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
import { PopupModal } from '@/components/ui/modal';


function getCategory() {
  return categories;
}

export default function CompanyMenu() {
  const [data, setData] = useState([]);  
  const [category, setCategory] = useState(getCategory());  
  const [error, setError] = useState(null); 
  const [dishOfCategory, setDishOfCategory] = useState({})
  const [curCategory, setCurCategory] = useState('Sushi');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [AddDishOpen, setAddDishOpen] = useState(false);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };


  const fetchData = async () => {
    try {
      const menuInfo = await fetch('http://localhost:5000/company/menu-info').then((response) => response.json());
      setDishOfCategory(menuInfo.data);
      setTotalPages(Math.ceil(menuInfo.totalDish / 10));

      const data = await fetch(`http://localhost:5000/company/dishes?Category=${curCategory}&PageSize=10&CurrentPage=${currentPage}`).then((response) => response.json());
      console.log(data);
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
    <BossLayout>
        <Label className="text-2xl font-normal flex justify-between items-center mb-0 mt-3 ">Phân loại ({category.length})</Label>
        <div className="grid grid-cols-10">
          {category.map((item) => (
          <CategoryCard key={item} title={item} itemCount={dishOfCategory[item] || 0} isSelected={curCategory === item}
          onClick={() => {
              setCurCategory(item);
          }} />
          ))}
        </div>
      <PopupModal open={AddDishOpen} setOpen={setAddDishOpen} formComponent= {AddDishForm} props={{title: "Thêm món ăn", description: "Nhập thông tin của món ăn"}}>
        <Button className="w-[145px] text-sm font-semibold bg-[#1C1C1C] text-rose-300 hover:bg-rose-300 hover:text-black rounded-lg mr-1 ml-auto mb-0">
              Thêm món ăn
        </Button>
      </PopupModal>
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
    </BossLayout>
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

export function AdjustDishesRegion(dishes, region, checked) {
  if(checked) {
    // add region to dish in database
    console.log("Add region to dish in database");

  }
  else {
    // remove region from dish in database
    console.log("Remove region from dish in database");
  }
}

function AddDishForm({ className, setOpen }) {
  const handleSubmit = async (e) => {
    const response = await fetch('http://localhost:5000/admin/new_dish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dishName: e.target.dish_name.value,
        category: selectedOption,
        price: e.target.price.value,
        image: `https://drive.google.com/thumbnail?id=${e.target.dish_image.value}`,
      }),
    });

    if (response.ok) {
      setOpen(false);
    } else {
      alert("Thêm món ăn thất bại");
    }
    
  };
  const handleClose = () => {
      setOpen(false); // This will close the popup modal
  };
  const [categories, setCategory] = useState(getCategory());
  const [selectedOption, setSelectedOption] = useState(categories[1]);

  

  return (
      <form onSubmit={handleSubmit} className={cn("grid items-start gap-4", className)}>
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
            <Input type="text" id="dish_image" defaultValue="id ảnh gg drive" />
          </div>
          <Button type="submit">Thêm</Button>
          <Button onClick={handleClose} variant="outline">Hủy</Button>
      </form>
  )
}