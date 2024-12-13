import React from 'react';
import BossLayout from '@/src/admin/layout/BossLayout';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { columns } from './columns';
import { dishes, categories } from './data';
import { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label"
import { PopupModal } from "@/components/ui/modal"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { DropdownOption } from '@/src/admin/components/dropdown';
import { CategoryCard } from '@/src/admin/components/category-card';


function getCategory() {
  return categories.slice(1);
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

export default function CompanyMenu() {
  const [data, setData] = useState([]);  // Initialize empty array to store data
  const [category, setCategory] = useState([]);  // Initialize empty array to store data
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track error state
  const [filteredData, setFilteredData] = useState([]);  // Track error state
  const [dishOfCategory, setDishOfCategory] = useState({})
  const [curCategory, setCurCategory] = useState("Tất cả");
  const [AddDishOpen, setAddDishOpen] = useState(false);

  
  function filterDishesByCategory(data, curCategory) {
    if (curCategory === "Tất cả") {
        setFilteredData(data)
    }
    else {
        const filteredData = data.filter((dish) => dish.category === curCategory);
        setFilteredData(filteredData);
    }
  }

  useEffect(() => {
    filterDishesByCategory(data, curCategory);
  }, [curCategory]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const dishes = await fetchDishes();
        setData(dishes);  // Update the state with fetched data
        setFilteredData(dishes);
        setCategory(categories);
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        setError(error);  // Handle error if any
        setLoading(false);  // Set loading to false even in case of error
      }
    };

    
    
    fetchData();
  }, []);  // Empty dependency array means this effect runs once when the component mounts
  useEffect(() => {
    setDishOfCategory(countDishesByCategory(data));
    }, [data]);

  if (loading) {
    return <div>Loading...</div>;  // Display loading message while fetching data
  }

  if (error) {
    return <div>Error: {error.message}</div>;  // Display error if any
  }
  
  
  return (
      <BossLayout>
          <Label className="text-2xl font-normal flex justify-between items-center mb-0 mt-3 ">Phân loại ({category.length - 1})</Label>
          {/* loop to create card for categories */}
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
        <DataTable columns={columns} data={filteredData} filterProps={{column: "name", placeholder: "Tìm món ăn bằng tên..."}}/>
      </BossLayout>
  )
}



function AddDishForm({ className, setOpen }) {
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
            <Button type="submit">Thêm</Button>
            <Button onClick={handleClose} variant="outline">Hủy</Button>
        </form>
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
          <div className="grid gap-2">
            <Label>Khu vực</Label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="south" 
                  checked={southChecked}
                  onCheckedChange={setSouthChecked}
                />
                <label
                  htmlFor="south"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Nam
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="west" 
                  checked={westChecked}
                  onCheckedChange={setWestChecked}
                />
                <label
                  htmlFor="west"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Tây
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="north" 
                  checked={northChecked}
                  onCheckedChange={setNorthChecked}
                />
                <label
                  htmlFor="north"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Bắc
                </label>
              </div>
            </div>
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

