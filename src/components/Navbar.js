"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Cart from './Cart';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux'
import { hideCart } from '../redux/cart/cartSlice'
import { logout, setLoggedIn } from '../redux/user/userSlice'

const Navbar = () => {
  const [isOpen, setisOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        dispatch(setLoggedIn(true));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getProduct`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        const catsList = data.map((item) => item.category)
        const cats = [...new Set(catsList)]

        setCategories(cats.map(name => {
          let words = name.toLowerCase().split(' ');
          for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
          }
          return words.join(' ');
        }))

      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow z-10">
      <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">Get free delivery on orders over $100</p>
      <div className="container px-6 py-2 mx-auto">
        <div className="flex flex-row justify-between items-center border-b border-gray-200 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <Image className="w-auto h-6 sm:h-7" src="https://merakiui.com/images/full-logo.svg" height={30} width={30} alt="" />
              </Link>
              {/* <!-- Search input on desktop screen --> */}
              <div className="hidden mx-10 md:block">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                      <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </span>

                  <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Search" />
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
          <div className="flex">
            <div className={`absolute inset-x-0 z-20 w-full px-6 py-2 transition-all duration-300 ease-in-out bg-white top-24 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full'}`}>
              <div className="flex flex-col md:flex-row md:items-center md:mx-1">
                <Link className="text-sm text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-2 md:my-0" href="/">Home</Link>
                <Link className="text-sm text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-2 md:my-0" href="/about">About</Link>
                <Link className="text-sm text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-2 md:my-0" href="/orders">Orders</Link>
                <Link className="text-sm text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-2 md:my-0" href="/checkout">Checkout</Link>
                <Link className="text-sm text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-2 md:my-0" href="/contact">Contact</Link>
                <button className="relative text-gray-700 hover:underline transition-colors duration-300 transform hover:text-blue-600 md:ms-3 flex items-center" href="/"
                  onClick={() => dispatch(hideCart())}
                >Cart
                  <svg className="ms-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="absolute top-0 right-0 p-1 text-xs text-white bg-blue-500 rounded-full"></span>
                </button>
              </div>
              {/* <!-- Search input on mobile screen --> */}
              <div className="my-4 md:hidden">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                      <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </span>

                  <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Search" />
                </div>
              </div>
            </div>
            {isLoggedIn  && <div className="relative ml-3">
              <div>
                <button type="button" className={`relative flex rounded-full bg-gray-800 text-sm focus:outline-none ${openMenu ? 'focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800' : 'shadow-md'}`} id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={() => setOpenMenu(!openMenu)}>
                  <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </button>
              </div>
              <div className={`absolute right-0 z-10 mt-2 transition ease duration-100 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${openMenu ? 'opacity-100 scale-100' : 'transform opacity-0 scale-95'}`}>
                <Link href="/" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</Link>
                <Link href="/" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</Link>
                <button onClick={() => dispatch(logout())} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</button>
              </div>
            </div>}
            {!isLoggedIn  && <Link href={'/login'} className="rounded-md bg-indigo-500 ms-3 py-1.5 px-5 text-white" type="button">Login</Link>}
            {/* <!-- Mobile menu button --> */}
            <div className="flex lg:hidden ms-2">
              <button type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu" onClick={() => setisOpen(!isOpen)}>
                {!isOpen && <svg x-show="!isOpen" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                </svg>}
                {isOpen && <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>}
              </button>
            </div>
          </div>
        </div>
        <Cart />
        <div className="py-2 mt-2 -mx-3 overflow-y-auto whitespace-nowrap scroll-hidden overflow-x-hidden">
          {categories.map((category) => <Link key={category} className="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:my-0" href={`/category/${category.toLowerCase()}`}>{category.replace(/-([a-zA-Z])/g, (_, match) => ` ${match.toUpperCase()}`)}</Link>)}
        </div>
      </div>
    </nav>
  )
}

export default Navbar