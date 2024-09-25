import { createContext, useContext, useEffect, useState } from "react";


const WishlistContext = createContext();
 const WishlistProvider = ({children}) =>{
    const [wishlist, setWishlist] =  useState([]);

    useEffect(()=>{
        let existingWishlistitems = localStorage.getItem("wishlist");
        if(existingWishlistitems) setWishlist(JSON.parse(existingWishlistitems))
    },[])

    const isProductInWishlist = (productId)=>{
        return wishlist.some((item)=> item._id === productId)
    }

    const toggleWishlist = (product) =>{
        let updateWishlist;
        if(isProductInWishlist(product._id)){
            updateWishlist = wishlist.filter(item => item._id !== product._id);
        } else {
            updateWishlist = [...wishlist, product]
        }
        setWishlist(updateWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updateWishlist))
    };

    return (
        <WishlistContext.Provider value={[wishlist, setWishlist, isProductInWishlist, toggleWishlist]} >
            {children}
        </WishlistContext.Provider>
    )
 }
 const useWishlist = () => useContext(WishlistContext);
 export { useWishlist, WishlistProvider };