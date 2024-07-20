"use client"
import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Ensure you import the CSS
const HomeCarousel = () => {
  return (
    <Carousel
    className="w-full relative shadow-md"
    showArrows={false}
    showThumbs={false}
    swipeable={true}
    autoPlay={true}
    infiniteLoop={true}
    emulateTouch={true}
    showStatus={false}
    interval={2000}
  // renderIndicator={()=>{}}
  >
    <img className="w-full select-none" src={"https://cdn.dribbble.com/userupload/11399133/file/original-f9c247ac5c5119861c9f600ebcb7b0fc.jpg?resize=1280x379"} alt="cover" />
    <img className="w-full select-none" src={"https://cdn.dribbble.com/userupload/11399134/file/original-ef220b786a91ab9415619f77fc3a53eb.jpg?resize=1280x379"} alt="cover" />
    <img className="w-full select-none" src={"https://cdn.dribbble.com/userupload/11399138/file/original-70ce080d5dcef82ca12bf882d8c99aa7.jpg?resize=1280x379"} alt="cover" />
    <img className="w-full select-none" src={"https://cdn.dribbble.com/userupload/11399137/file/original-6cc27e97ebc6228402f43fa1bc36f789.jpg?resize=1280x379"} alt="cover" />
    <img className="w-full select-none" src={"https://cdn.dribbble.com/userupload/11399136/file/original-6e8082b2fc783a40fc39475b8378b170.jpg?resize=1280x379"} alt="cover" />
  </Carousel>
  )
}

export default HomeCarousel