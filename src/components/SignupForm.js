"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn } from '../redux/user/userSlice';
import { useRouter } from 'next/navigation'

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setC_password] = useState('');
  const [cText, setCText] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  if(isLoggedIn){
    router.push('/');
  }
  const handleChange = (e) => {
    setCText(false);
    if (e.target.name === 'name') {
      setName(e.target.value)
    } else if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    } else if (e.target.name === 'c_password') {
      setC_password(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === c_password) {
      const userData = { name, email, password }
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
        method: 'POST',
        body: JSON.stringify(userData),
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
        setPassword('');
        setC_password('');
        localStorage.setItem('authToken', data.token);
        dispatch(setLoggedIn(true));
    }
    } else {
      setCText(true);
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
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
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="logo" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-3" action="#" method="POST" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full name</label>
            <div className="mt-2">
              <input value={name} onChange={handleChange} id="name" name="name" type="text" required className="block w-full rounded-md border-0 p-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input value={email} onChange={handleChange} id="email" name="email" type="email" required className="block w-full rounded-md border-0 p-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div className="mt-2">
              <input value={password} onChange={handleChange} id="password" name="password" type="password" minLength={6} required className="block w-full rounded-md border-0 p-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <label htmlFor="c_password" className="block text-sm font-medium leading-6 text-gray-900">Confrom Password</label>
            <div className="mt-2 mb-3">
              <input value={c_password} onChange={handleChange} id="c_password" name="c_password" type="password" minLength={6} required className="block w-full rounded-md border-0 p-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            {cText && <p className="text-red-600 font-semibold text-sm">Confrom password must be same</p>}
          </div>
          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Account</button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already a member? <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login now</Link>
        </p>
      </div>
    </div>
  )
}

export default SignupForm