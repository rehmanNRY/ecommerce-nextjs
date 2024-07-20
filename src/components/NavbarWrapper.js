"use client"
import React, { useState, useEffect } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import Navbar from './Navbar';
import { usePathname } from 'next/navigation';

const NavbarWrapper = () => {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setProgress(100);
    }, 250);
    setProgress(40)
  }, [pathname])

  return (
    <Provider store={store}>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar />
    </Provider>
  )
}

export default NavbarWrapper