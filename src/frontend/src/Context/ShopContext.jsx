import { createContext } from "react";
import all_products from "../assets/all_products"
import { useState } from "react";
import CartItems from "../pages/CartItems";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_products.length+1; index++) {
        cart[index] = 0;
        
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [cartItems, setcartItems] = useState(getDefaultCart())

    const addToCart = (itemId) => {
        setcartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
    }

    const removeFromCart = (itemId) => {
        setcartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems){
            if (cartItems[item] > 0){
                let itemInfo = all_products.find((product) => product.id === Number(item));
                totalAmount += itemInfo.old_price * cartItems[item];
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

    const contextValue = { all_products, cartItems, addToCart, removeFromCart, getTotalCartItems, getTotalCartAmount }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;