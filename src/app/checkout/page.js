"use client"
import React from 'react'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import CheckoutCart from '@/components/CheckoutCart';

const Checkout = () => {
  return (
    <Provider store={store}>
      <CheckoutCart/>
    </Provider>
  )
}

export default Checkout