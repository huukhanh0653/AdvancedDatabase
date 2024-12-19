import React from 'react';
import DefaultLayout from '@/src/admin/layout/DefaultLayout';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { dishes, categories } from './data';
import { useEffect, useState, useMemo } from 'react';
import { Label } from "@/components/ui/label"
import { CategoryCard } from '@/src/admin/components/category-card';



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
    return categoryCount;
  }

export default function RegionalMenu() {
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
        setData(dishes);  // Update the state with fetched data
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


  // const fetchData = async () => {
  //   const curBranch = localStorage.getItem('branch');
  //   const api = `http://localhost:1433/api/regional-menu/${curBranch ? curBranch : ''}`;
  //   try {
  //       const response = await fetch(api);
  //       if (!response.ok) {
  //           throw new Error('Failed to fetch data');
  //       }
  //       let data = await response.json();
  //       setData(data);
  //   } catch (error) {
  //       toast.error('Error fetching data');
  //   }
  // };

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





