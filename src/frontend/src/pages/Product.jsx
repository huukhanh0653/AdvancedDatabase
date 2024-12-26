import { useContext, useState, useEffect } from 'react'
import {ShopContext} from "../Context/ShopContext"
import { useParams } from "react-router-dom"
import ProductHd from '../components/ProductHd';
import ProductDisplay from '../components/ProductDisplay';

const Product = () => {

  //const {all_products} = useContext(ShopContext);
  const {productId} = useParams();
  const { fetchProduct, product } = useContext(ShopContext);

  console.log("productId:", productId);
  //const [product, setProduct] = useState(null); // State to store product details
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const loadProduct = async () => {
      try {
          setLoading(true);
          await fetchProduct(productId);
      } catch (err) {
          setError(err.message || "Unexpected error occurred");
      } finally {
          setLoading(false);
      }
  };

  loadProduct();
}, [productId]);// Dependencies: productId and all_products

  if (!product){
    return <div>  Product not found! </div>
  }

  return (
    <section className='max_padd_container py-20'>
      <div >
        <ProductHd product={product[0]}/>
        <ProductDisplay product={product[0]}/>
      </div>
    </section>
  )
}

export default Product