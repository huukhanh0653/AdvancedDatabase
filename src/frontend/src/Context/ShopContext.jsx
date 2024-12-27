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

    const [cartItems, setCartItems] = useState({});
    const [all_products, setAll_products] = useState([]);
    const [product, setProduct] = useState(null); // State to store product details

    // useEffect(() => {
    //     fetch("http://localhost:5000/customer/menu").then((response) => response.json()).then((data) => setAll_products(data));
    // }, []);

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

    const addToCart = (product, quantity = 1) => {
        setCartItems((prev) => ({
            ...prev,
            [product.MaMon]: {
                ...product,
                quantity: (prev[product.MaMon]?.quantity || 0) + quantity,
            },
        }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId]) {
                if (updatedCart[itemId].quantity > 1) {
                    // Giảm số lượng nếu còn lớn hơn 1
                    updatedCart[itemId].quantity -= 1;
                } else {
                    // Xóa mục khỏi giỏ hàng nếu số lượng về 0
                    delete updatedCart[itemId];
                }
            }
            return updatedCart;
        });
    };
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const item = cartItems[itemId];
            totalAmount += item.GiaTien * item.quantity;
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const itemId in cartItems) {
            const item = cartItems[itemId];
            if (item.quantity > 0) {
                totalItem += item.quantity;
            }
        }
        return totalItem;
    };
    
    // const getProductById = (id) => {
    //     return all_products.find((product) => product.MaMon === id);
    //   };

    const contextValue = { all_products, cartItems, addToCart, removeFromCart, getTotalCartItems, getTotalCartAmount, product, fetchProduct, cartItems}

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