import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { ShopContext } from '../context/ShopContext';

const Item = ({ id, name, image, old_price }) => {

  const { addToCart, cartItems } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const product = {
      MaMon: id, // Map `id` to `MaMon`
      TenMon: name, // Map `name` to `TenMon`
      HinhAnh: image, // Map `image` to `HinhAnh`
      GiaTien: old_price, // Map `old_price` to `GiaTien`
    };

    addToCart(product, quantity); // Truyền sản phẩm cùng số lượng tùy chỉnh
    alert(`${quantity} ${product.TenMon} đã được thêm vào giỏ hàng!`);

  };

  return (
    <div className='rounded-x1 overflow-hidden shadow-lg'>
      <div className='relative flexCenter group overflow-hidden transition-all duration-100'>
        <Link to={`/product/${id}`} className='h-12 w-12 bg-white rounded-full flexCenter absolute top-1/2 bottom-1/2 !py-2 z-20 scale-0 group-hover:scale-100 transition-all duration-700'> <FaSearch className='scale-125 hover:rotate-90 hover:scale-125 transition-all duration-200' /> </Link>
        <img src={image} alt="productImg" className='w-full block object-cover group-hover:scale-110 transition-all duration-1000' />
      </div>
      <div className='p-4 overflow-hidden'>
        <h4 className='flexCenter my-[6px] medium-16 line-clamp-2 text-orange-600'>{name}</h4>
        <div className='flexCenter gap-5'>
          <div className='bold-16'>
            {old_price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </div>
          {/*<div className='text-secondary bold-16 line-through'>{old_price}</div>*/}
        </div>
        <div className='flexCenter gap-9'>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
          />
          <button onClick={handleAddToCart} className={"btn_secondary_rounded"}><MdOutlineAddShoppingCart
            className="p-1 h-6 w-8" /> </button>
        </div>
      </div>
    </div>
  )
}

export default Item