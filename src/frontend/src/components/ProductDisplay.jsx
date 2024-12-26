import { useContext, useState } from 'react'
import { MdStar } from 'react-icons/md'
import { ShopContext } from '../Context/ShopContext'

const ProductDisplay = (props) => {

  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product.MaMon, quantity);
    alert(`${quantity} ${product.TenMon} đã được thêm vào giỏ hàng!`);
  };

  return (
    <section>
      <div className='flex flex-col gap-14 xl:flex-row'>
        {/*left side */}
        <div className='flex gap-x-2 xl:flex-1'>
          <div className=''>
            <img src={product.HinhAnh} alt="prdctImg" />
          </div>
        </div>
        {/* right side */}
        <div className='flex-col flex xl:flex-[1.7]'>
          <h3 className='h3'>{product.TenMon}</h3>
          <p><span className='medium-12 text-tertiary'>Phân loại: </span> {product.PhanLoai} </p>
          <div className='flex justify-between items-center my-4 max-w-[555px]'>
            <div className='text-secondary bold-25 medium-20'> {product.GiaTien}
              {/* {product.GiaTien.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })} */}
            </div>
            <div>
              <span>Số lượng: </span>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="h-10 w-20 pl-5 bg-white border rounded-xl text-secondary"
              />
            </div>
          </div>
          <div className='mb-4'>
            <div className='flex flex-col mb-4 max-w-[555px]'>
              <input type="text" placeholder='Note' className='h-14 w-full pl-5 bg-white border border-black rounded-xl' />
            </div>
            <div className='flex flex-col gap-y-3 mb-4 max-w-[555px]'>
              <button onClick={handleAddToCart} className='btn_dark_outline !rounded-none uppercase reguar-14 tracking-widest'>Thêm vào giỏ hàng</button>
              <button className='btn_dark_rounded !rounded-none uppercase reguar-14 tracking-widest'>Mua ngay</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDisplay