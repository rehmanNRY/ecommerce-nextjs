"use client"
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, decToCart, removeFromCart, hideCart } from '../redux/cart/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductPage = ({ slug }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState('');

  const notify = () => toast("Wow so easy!");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/productDetail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ slug })
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message);
          return;
        }

        const data = await response.json();
        setProduct(data.product);
        setProducts(data.products);
        setColors(data.colors);
        setSizes(data.sizes);
        // console.log(data)
        setError('');
      } catch (error) {
        console.log('Error fetching product details:', error);
        setError('Cannot get product detail');
      }
    };

    fetchProductDetails();
  }, [slug]);

  const [pinValue, setpinValue] = useState('');
  const [pinAvalible, setpinAvalible] = useState(null);
  const onChange = (e) => {
    setpinValue(e.target.value)
  }
  const checkService = async (e, pin) => {
    e.preventDefault();
    notify();
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pinCode`, {
      method: 'GET',
      headers: {
        'Content-Type': "application/json"
      }
    });
    if (response.ok) {
      const avaApi = await response.json();
      if (avaApi.includes(parseInt(pin))) {
        setpinAvalible(true);
      } else {
        setpinAvalible(false);
      }
    } else {
      const errorText = await response.text();
      console.error('Fetch error:', errorText);
    }
  }

  const sizeChange = (e) => {
    const selectedSize = e.target.value;
    if (selectedSize == 'Size') {
      const newSizes = products.map((prod) => prod.size);
      setSizes([...new Set(newSizes)]);
      const newColors = products.map((prod) => prod.color);
      setColors([...new Set(newColors)]);
    } else {
      setSelectedSize(selectedSize);
      const filteredProducts = products.filter((prod) => prod.size === selectedSize);
      setProduct(filteredProducts[0]);
      const newColors = filteredProducts.map((prod) => prod.color);
      setColors([...new Set(newColors)]);
    }
  }
  const colorChange = (selColor) => {
    setSelectedColor(selColor);
    const filteredProducts = products.filter((prod) => prod.color === selColor);
    setProduct(filteredProducts[0]);
    const newSizes = filteredProducts.map((prod) => prod.size);
    setSizes([...new Set(newSizes)]);
  }
  return (
    <div><section className="text-gray-600 body-font overflow-hidden">
      <ToastContainer />
      {product && <div className="container px-5 pt-24 pb-20 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={product.img} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">ZOOBABUY</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color})</h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500 px-1">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500 px-1">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500 px-1">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">{product.desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {colors.includes("Red") && <button onClick={() => colorChange("Red")} className={`${selectedColor === 'Red' ? "border-4 border-gray-700" : "border-2 border-gray-300"} ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {colors.includes("Blue") && <button onClick={() => colorChange("Blue")} className={`${selectedColor === 'Blue' ? "border-4 border-gray-700" : "border-2 border-gray-300"} ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {colors.includes("Green") && <button onClick={() => colorChange("Green")} className={`${selectedColor === 'Green' ? "border-4 border-gray-700" : "border-2 border-gray-300"} ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {colors.includes("Black") && <button onClick={() => colorChange("Black")} className={`${selectedColor === 'Black' ? "border-4 border-gray-700" : "border-2 border-gray-300"} ml-1 bg-black rounded-full w-6 h-6 focus:outline-none`}></button>}
                {colors.includes("White") && <button onClick={() => colorChange("White")} className={`${selectedColor === 'White' ? "border-4 border-gray-700" : "border-2 border-gray-300"} ml-1 bg-white rounded-full w-6 h-6 focus:outline-none`}></button>}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select onChange={(e) => sizeChange(e)} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                    {!selectedColor && <option>Size</option>}
                    {sizes.map((size) => <option key={size}>{size}</option>)}
                    {selectedColor && <option>Size</option>}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">${product.price}</span>
              <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                onClick={() => {
                  dispatch(addToCart({
                    id: product._id,
                    name: product.title,
                    desc: `(${product.size}/${product.color})`,
                    price: product.price,
                    pic: product.img,
                    qty: 1,
                  }));
                  dispatch(hideCart());
                }}

              >Add cart</button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
            <form className="flex items-center w-full max-w-md my-3" onSubmit={(e) => { checkService(e, pinValue) }}>
              <div className="relative mr-2 w-2/3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <svg className="w-3.5 h-3.5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"></path>
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"></path>
                  </svg>
                </div>
                <input value={pinValue} minLength={3} onChange={onChange} className="formkit-input outline-none w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5" name="pin_code" placeholder="Enter your pin code" required type="text" />
              </div>
              <button type='submit' className="px-5 py-3 text-sm font-medium text-center text-white bg-indigo-500 rounded-lg cursor-pointer hover:bg-indigo-600 focus:ring-4 focus:ring-blue-300">
                Check service
              </button>
            </form>
            {pinAvalible === null && <p className='text-gray-400'>Enter pin code to check servibility.</p>}
            {(!pinAvalible && pinAvalible !== null) && <p className='text-red-600'>Sorry can&apos;t send to provided pin</p>}
            {(pinAvalible && pinAvalible !== null) && <p className='text-indigo-500'>Yes! service avalible at your pin.</p>}
          </div>
        </div>
      </div>}
    </section></div>
  )
}

export default ProductPage