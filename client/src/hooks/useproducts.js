import axios from "axios";
import { useEffect, useState } from "react";



export default function useProducts() {
    const [products, setProducts] = useState([]);


    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/product/all-product`);
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts();
    }, [])


    return products;
}

