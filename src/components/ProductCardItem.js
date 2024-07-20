"use client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, decToCart, removeFromCart, hideCart } from '../redux/cart/cartSlice'

const ProductCardItem = ({ productItem }) => {
  const dispatch = useDispatch();
  let product = {
    id: productItem._id,
    name: productItem.title,
    desc: `(${productItem.size}/${productItem.color})`,
    price: productItem.price,
    pic: productItem.img,
    qty: 1,
  }
  return (
    <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="relative mx-4 mt-4 h-80 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
        <img src={productItem.img} className="h-full w-full object-cover" />
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
            {productItem.title}
          </p>
          <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
            ${productItem.price}
          </p>
        </div>
        <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
          {productItem.desc}
        </p>
      </div>
      <div className="p-6 pt-0">
        <button
          className="block w-full select-none rounded-lg bg-indigo-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => {
            dispatch(addToCart(product));
            dispatch(hideCart());
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCardItem;
