"use client"
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, decToCart, removeFromCart, hideCart } from '../redux/cart/cartSlice'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutCart = () => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  let subTotal = 0;
  for (let i = 0; i < products.length; i++) {
    subTotal += products[i].price * products[i].qty;
  }
  const shipping = 8;
  const totalAmount = shipping + subTotal;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pin, setPin] = useState('');
  const [state, setState] = useState('Your State');
  const [city, setCity] = useState('Your Name');
  const [disabled, setDisabled] = useState(true);
  const handleChange = (e) => {
    const { value } = e.target;

    switch (e.target.name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'pin':
        setPin(value);
        break;
      default:
        break;
    }

    if (
      name.length > 3 &&
      email.length > 3 &&
      phone.length > 3 &&
      address.length > 3 &&
      pin.length > 3 &&
      state.length > 3 &&
      city.length > 3
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleSubmit = async () => {
    if (!disabled) {
      const orderData = {
        "userId": "12345",
        email,
        address,
        amount: totalAmount,
        products
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/placeOrder`, {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error, {
          position: "top-right",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.success(data.success, {
          position: "top-right",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setPin('');
      }
      // console.log(data);
    }
  }

  return (
    <div className="flex flex-col md:flex-row md:justify-between bg-gray-100 py-16">
      <ToastContainer
        position="top-right"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className='md:w-7/12 md:mx-auto'>
        <h1 className="text-2xl font-bold text-gray-800 pb-5">Checkout</h1>
        <div className="bg-white rounded-lg shadow">
          <div className="flex">
            <div className="flex-1 py-5 pl-5 overflow-hidden items-center">
              <svg className="inline align-text-top" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                <g>
                  <path d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z" fill="none" id="svg_1" stroke="null"></path>
                  <path d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z" id="svg_2"></path>
                  <circle cx="7.04807" cy="6.97256" r="2.5" id="svg_3"></circle>
                </g>
              </svg>
              <h1 className="inline text-2xl font-semibold leading-none">Personal Details</h1>
            </div>
          </div>
          <div className="px-5 pb-5">
            <input placeholder="Name" type='text' name='name' value={name} onChange={handleChange} className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
            <input placeholder="Email Address" name='email' value={email} onChange={handleChange} type='email' className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
            <input placeholder="Phone" name='phone' value={phone} onChange={handleChange} type='text' className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
          </div>
          <div className="flex">
            <div className="flex-1 py-3 pl-5 overflow-hidden items-center">
              <svg className="inline align-text-top" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                <g>
                  <path d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z" fill="none" id="svg_1" stroke="null"></path>
                  <path d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z" id="svg_2"></path>
                  <circle cx="7.04807" cy="6.97256" r="2.5" id="svg_3"></circle>
                </g>
              </svg>
              <h1 className="inline text-2xl font-semibold leading-none">Delivery Details</h1>
            </div>
          </div>
          <div className="px-5 pb-5">
            <input placeholder="Delivery Address" name='address' value={address} onChange={handleChange} type='text' className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
            <input placeholder="Pin/Zip Code" name='pin' value={pin} onChange={handleChange} type='text' className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
            <div className="flex">
              <div className="flex-grow w-1/4 pr-2"><input name='state' disabled={true} readOnly value={state} placeholder="State" type='text' className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" /></div>
              <div className="flex-grow"><input placeholder="City" name='city' disabled={true} readOnly value={city} className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" /></div>
            </div>
          </div>
        </div>
        <div className="mt-5 bg-white shadow cursor-pointer rounded-xl">
          <div className="flex">
            <div className="flex-1 py-5 pl-5 overflow-hidden">
              <ul>
                <li className="text-xs text-gray-600 uppercase ">Personal Details</li>
                <li>{name}</li>
                <li>{email}</li>
                <li>{phone}</li>
              </ul>
            </div>
            <div className="flex-1 py-5 pl-1 overflow-hidden">
              <ul>
                <li className="text-xs text-gray-600 uppercase">Delivery Details</li>
                <li>{address}</li>
                <li>{pin}</li>
                <li>{state}</li>
                <li>{city}</li>
              </ul>
            </div>
            <div className="flex-none pt-2.5 pr-2.5 pl-1">
              <button type="button" className="px-2 py-2 font-medium tracking-wide text-black capitalize transition duration-300 ease-in-out transform rounded-xl hover:bg-gray-300 focus:outline-none active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                  <path d="M5 18.08V19h.92l9.06-9.06-.92-.92z" opacity=".3"></path>
                  <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <button type="button" disabled={disabled} onClick={handleSubmit} className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize my-4 bg-indigo-500 rounded-md hover:bg-gray-900 disabled:bg-indigo-300 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out">
          <span className="pl-2 mx-1">Place order Now</span>
        </button>
      </div>
      <div className={`transition-all overflow-y-auto overflow-x-hidden duration-300 ease-in-out shadow-2xl bg-slate-900 md:w-[420px] w-full translate-x-0 opacity-100 ' md:rounded-lg`}>
        <div className="">
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
                <p className="text-lg font-semibold text-gray-100">${shipping}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-100">Total</p>
              <p className="text-2xl font-semibold text-gray-100"><span className="text-xs font-normal text-gray-200">USD</span> {totalAmount}</p>
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default CheckoutCart