"use client"
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import SignInForm from '@/components/SignInForm';
import { store } from '@/redux/store'
import { Provider } from 'react-redux'

const Login = () => {
  
  return (
    <Provider store={store}>
      <SignInForm/>
    </Provider>
  )
}

export default Login