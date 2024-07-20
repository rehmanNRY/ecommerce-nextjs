"use client"
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import SignupForm from '@/components/SignupForm';
import { store } from '@/redux/store'
import { Provider } from 'react-redux'

const Signup = () => {
  
  return (
    <Provider store={store}>
      <SignupForm/>
    </Provider>
  )
}

export default Signup