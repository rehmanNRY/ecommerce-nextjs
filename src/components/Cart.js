"use client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, decToCart, removeFromCart, hideCart } from '../redux/cart/cartSlice'
import Link from 'next/link'

const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  const openCart = useSelector((state) => state.cart.cartOpen);
  const dispatch = useDispatch();
  let subTotal = 0;
  for (let i = 0; i < products.length; i++) {
    subTotal += products[i].price * products[i].qty;
  }
  return (
    <div className={`transition-all overflow-y-auto overflow-x-hidden duration-300 ease-in-out shadow-2xl h-screen bg-slate-900 md:w-[420px] w-full fixed z-50 top-0 right-0 ${openCart ? 'translate-x-0 opacity-100 ' : 'opacity-0 translate-x-full'} md:rounded-lg`}>
      <div className="">
        <button 
        // onClick={hideCart} 
        onClick={() => dispatch(hideCart())}
        type="button" className="flex shadow absolute top-12 right-7 rounded-full bg-gray-700 p-1.5 text-center text-gray-100 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-200">
          <svg className="block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" className=""></path>
          </svg>
        </button>
        <h1 className="text-2xl px-6 font-bold text-white pt-12">Your Cart</h1>
        {products.length === 0 && <p className='text-gray-300 px-6 py-3'>No products in cart to show.</p>}
        {products.length !== 0 && <div className="mt-8 w-full px-4 py-6 sm:px-8">
          <div className="flow-root">
            <ul className="-my-8">
              {products.map((product) => (
                <li key={product.id} className="flex py-3 text-left flex-row space-x-5 space-y-0">
                  <div className="shrink-0 relative">
                    <button onClick={() => dispatch(removeFromCart(product))} type="button" className="absolute h-[22px] w-[22px] items-center justify-center rounded-full -top-1.5 -left-1.5 bg-gray-600 flex p-1 text-center text-gray-300 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-100">
                      <svg className="block h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" className=""></path>
                      </svg>
                    </button>
                    <img className="h-24 shadow rounded-md w-24 max-w-full object-cover" src={product.pic} alt="product img" />
                  </div>

                  <div className="relative flex flex-1 flex-col justify-between">
                    <div className="col-gap-5 grid grid-cols-2">
                      <div className="pr-8 sm:pr-5">
                        <p className="text-base font-semibold text-gray-100">{product.name}</p>
                        <p className="mx-0 mt-1 mb-0 text-sm text-gray-200">{product.desc}</p>
                      </div>

                      <div className="mt-4 flex flex-col-reverse gap-2 items-end justify-between sm:mt-0">
                        <p className="shrink-0 w-20 text-base font-semibold text-gray-100 sm:order-2 sm:ml-8 sm:text-right">${product.price}</p>

                        <div className="sm:order-1">
                          <div className="mx-auto flex h-8 items-stretch text-gray-100">
                            <button className="flex items-center justify-center rounded-l-md bg-gray-600 px-4 transition hover:bg-gray-700" onClick={() => dispatch(decToCart(product))}>-</button>
                            <div className="flex w-full items-center justify-center bg-gray-500 px-4 text-xs uppercase transition">{product.qty}</div>
                            <button className="flex items-center justify-center rounded-r-md bg-gray-600 px-4 transition hover:bg-gray-700" onClick={() => dispatch(addToCart(product))}>+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-200">Subtotal</p>
              <p className="text-lg font-semibold text-gray-100">${subTotal}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-200">Shipping</p>
              <p className="text-lg font-semibold text-gray-100">$8.00</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-100">Total</p>
            <p className="text-2xl font-semibold text-gray-100"><span className="text-xs font-normal text-gray-200">USD</span> {subTotal + 8}</p>
          </div>

          <div className="mt-6 text-center">
            <Link href="/checkout" className="group inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-indigo-700">
              Checkout
              <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Cart