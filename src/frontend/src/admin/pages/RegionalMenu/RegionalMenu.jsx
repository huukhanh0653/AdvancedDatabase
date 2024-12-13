import React from 'react';
import DefaultLayout from '@/src/admin/layout/DefaultLayout';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { dishes, categories } from './data';
import { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label"
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

export default function RegionalMenu() {
  const [data, setData] = useState([]);  // Initialize empty array to store data
  const [category, setCategory] = useState([]);  // Initialize empty array to store data
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track error state
  const [filteredData, setFilteredData] = useState([]);  // Track error state
  const [dishOfCategory, setDishOfCategory] = useState({})
  const [curCategory, setCurCategory] = useState("Tất cả");

  
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
      <DefaultLayout>
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
        <DataTable columns={columns} data={filteredData} filterProps={{column: "name", placeholder: "Tìm món ăn bằng tên..."}}/>
      </DefaultLayout>
  )
}





