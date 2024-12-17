import React from 'react'
import { TbArrowRight } from 'react-icons/tb'

const ProductHd = (props) => {
    const {product} = props;

    console.log("Product in ProductHd:", product);
  return (
    <div className='flex items-center flex-wrap gap-x-2 medium-16 my-4 capitalize'>
        Home <TbArrowRight /> Thực đơn <TbArrowRight /> {product.TenMon}
    </div>
  )
}

export default ProductHd