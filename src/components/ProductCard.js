"use client"
import React from 'react'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import ProductCardItem from './ProductCardItem'

const ProductCard = ({ productItem }) => {
  return (
    <Provider store={store}>
      <ProductCardItem productItem ={productItem} />
    </Provider>
  );
};

export default ProductCard;
