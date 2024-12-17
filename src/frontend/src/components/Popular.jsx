import React, { useEffect, useState } from 'react';
import Item from './Item';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/"); // Your API endpoint
        if (!response.ok) throw new Error("Failed to fetch popular products");
        const data = await response.json();
        setPopularProducts(data);
      } catch (error) {
        console.error("Error fetching popular products:", error);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <section className='bg-primary'>
        <div className='max_padd_container py-12 xl:py-28 xl:w-[88%]'>
            <h3 className='h3 text-center'> Món mới </h3>
            <hr className='h-[3px] md:w-1/2 mx-auto bg-gradient-to-l from-transparent via-black to-transparent mb-16'/>
            {/*container*/}
            <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
                {popularProducts.map((item) => (
                    <Item key={item.MaMon} id={item.MaMon} image={item.HinhAnh} name={item.TenMon} old_price={item.GiaTien} ></Item>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Popular