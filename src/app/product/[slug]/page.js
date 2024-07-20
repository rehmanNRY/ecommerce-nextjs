"use client"
import ProductPage from '@/components/ProductPage';
import React from 'react'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'

const Product = ({ params }) => {
  return (
    <Provider store={store}>
      <ProductPage slug ={params.slug} />
    </Provider>
  )
}

export default Product