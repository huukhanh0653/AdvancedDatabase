import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
        
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [cartItems, setcartItems] = useState(getDefaultCart())
    const [all_products, setAll_products] = useState([]);
    const [product, setProduct] = useState(null); // State to store product details

    useEffect(() => {
        fetch("http://localhost:5000/customer/menu").then((response) => response.json()).then((data) => setAll_products(data));
    }, []);

    //Fetch a single product by ID
    const fetchProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/customer/product/${productId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch product: ${response.statusText}`);
            }
            const data = await response.json();
            setProduct(data); // Update the product state
            return data; // Optionally return the product data
        } catch (error) {
            console.error("Error fetching product:", error);
            throw error; // Allow components to handle the error
        }
    };

    const addToCart = (itemId, quantity = 1) => {
        setcartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + quantity, // Add the specified quantity or default to 1
        }));
    };

    const removeFromCart = (itemId) => {
        setcartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems){
            if (cartItems[item] > 0){
                let itemInfo = all_products.find((product) => product.MaMon === Number(item));
                totalAmount += itemInfo.GiaTien * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems){
            if (cartItems[item] > 0){
                totalItem +=cartItems[item];
            }
        }
        return totalItem;
    }

    const getProductById = (id) => {
        return all_products.find((product) => product.MaMon === id);
      };

    const contextValue = { all_products, cartItems, addToCart, removeFromCart, getTotalCartItems, getTotalCartAmount, product, fetchProduct, getProductById}

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { ShopContextProvider, ShopContext };