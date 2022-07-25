import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import {useDispatch} from "react-redux";
import { fetchProductFail, fetchProductSuccess } from "../cartRedux/productRedux";
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat,filters,sort}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilterdProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(()=>{
     const fetchProductsCat = async () => {
      try {
        
        const res = await axios.get(
          cat
            ? `http://localhost:5200/api/products?cat=${cat}`
            : "http://localhost:5200/api/products"
        );
        setProducts(res.data);
        dispatch(fetchProductSuccess({product: res.data}));
      } catch (error) {
        console.log(error);
        dispatch(fetchProductFail());
      }
     }
     fetchProductsCat();
  },[cat])

  //filter
  useEffect(()=>{
    cat && setFilterdProducts(products.filter((item) => Object.entries(filters).every(([key,value]) => 
      item[key].includes(value)
    )))
  },[filters,cat,products])
  //sort 
  useEffect(()=>{
   if(sort === "newest") {
    setFilterdProducts(prev => [...prev].sort((a,b) => a.createdAt - b.createdAt))
   }
   if(sort === "asc") {
    setFilterdProducts(prev => [...prev].sort((a,b) => a.price - b.price))
   }
   if(sort === "desc") {
    setFilterdProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
   }
  },[sort])
  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products.slice(0,8).map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
