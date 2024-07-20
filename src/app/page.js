import HomeCarousel from "@/components/HomeCarousel";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Product from "@/models/Product";
import mongoose from 'mongoose';
import Link from "next/link";

const Home = async () => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
  let productsItems = await Product.find();
  let allProducts = {};

  for (let item of productsItems) {
    if (allProducts.hasOwnProperty(item.title)) {
      if (!allProducts[item.title].color.includes(item.color) && item.avalibleQty > 0) {
        allProducts[item.title].color.push(item.color);
      }
      if (!allProducts[item.title].size.includes(item.size) && item.avalibleQty > 0) {
        allProducts[item.title].size.push(item.size);
      }
    } else {
      allProducts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.avalibleQty > 0) {
        allProducts[item.title].color = [item.color];
        allProducts[item.title].size = [item.size];
      } else {
        allProducts[item.title].color = [];
        allProducts[item.title].size = [];
      }
    }
  }
  const productItems = JSON.stringify({ allProducts });
  const items = JSON.parse(productItems);
  return (
    <main className="min-h-screen">
      <HomeCarousel />
      <section className="text-gray-600 body-font px-10">
        <div className="container mx-auto flex px-5 pt-24 pb-20 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img className="object-cover object-center rounded" alt="hero" src="https://cdn.dribbble.com/users/6648502/screenshots/15475350/media/83c7ec9f865c6b6eea784037e08ef8ae.jpg?resize=400x300&vertical=center" width={620} />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-16 md:pl-12 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Before they sold out
              <br className="hidden lg:inline-block" />readymade gluten
            </h1>
            <p className="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Start Here</button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Buy now</button>
            </div>
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font px-10">
        <div className="container px-5 pb-10 pt-2 mx-auto">
          <div className="mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-2">Categories</h1>
            <p className="text-base text-gray-500">Browse by categories.</p>
            <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
          </div>
          <div className="flex flex-wrap md:flex-row flex-col items-center -mb-10 -mt-4 md:space-y-0 space-y-6 justify-between">
            <div className="p-4 h-64 w-64 justify-center bg-indigo-500 border-4 border-indigo-500 rounded-full shadow-md flex flex-col text-center items-center" style={{"backgroundImage": "url('https://res.cloudinary.com/datvbo0ey/image/upload/v1719916925/output-onlinepngtools_srpnun.png')"}}>
              <div className="h-11/12 w-11/12 border-dashed rounded-full border-2 border-white border-">
                <img className="hover:scale-110 hover:rotate-3 transition-all" src="https://upload.wikimedia.org/wikipedia/commons/4/45/Dare_tshirt.png" alt="product img" />
              </div>
            </div>
            <div className="p-4 h-64 w-64 justify-center bg-indigo-500 border-4 border-indigo-500 rounded-full shadow-md flex flex-col text-center items-center" style={{"backgroundImage": "url('https://res.cloudinary.com/datvbo0ey/image/upload/v1719916925/output-onlinepngtools_srpnun.png')"}}>
              <div className="h-11/12 w-11/12 border-dashed rounded-full border-2 border-white border-">
                <img className="hover:scale-110 hover:rotate-3 transition-all" src="https://shop.printversepro.com/cdn/shop/products/21108-i_1080x1080.png?v=1711668552" alt="product img" />
              </div>
            </div>
            <div className="p-4 h-64 w-64 justify-center bg-indigo-500 border-4 border-indigo-500 rounded-full shadow-md flex flex-col text-center items-center" style={{"backgroundImage": "url('https://res.cloudinary.com/datvbo0ey/image/upload/v1719916925/output-onlinepngtools_srpnun.png')"}}>
              <div className="h-11/12 w-11/12 border-dashed rounded-full border-2 border-white border-">
                <img className="hover:scale-110 hover:rotate-3 transition-all" src="https://pngimg.com/d/jacket_PNG8058.png" alt="product img" />
              </div>
            </div>
            <div className="p-4 h-64 w-64 justify-center bg-indigo-500 border-4 border-indigo-500 rounded-full shadow-md flex flex-col text-center items-center" style={{"backgroundImage": "url('https://res.cloudinary.com/datvbo0ey/image/upload/v1719916925/output-onlinepngtools_srpnun.png')"}}>
              <div className="h-11/12 w-11/12 border-dashed rounded-full border-2 border-white border-">
                <img className="hover:scale-110 hover:rotate-3 transition-all" src="https://png.pngtree.com/png-vector/20231230/ourmid/pngtree-dropshipping-men-hole-sole-jogging-shoes-png-image_11389148.png" alt="product img" />
              </div>
            </div>
          </div>
          <button className="flex mx-auto mt-20 text-white bg-indigo-500 border-0 py-3 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Browse more kinds</button>
        </div>
      </section>
      <div className=" border-gray-200 mx-10 mb-10 mt-2 border-b"></div>
      <div className="mb-9 px-10">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-2">Categories</h1>
        <p className="text-base text-gray-500">Browse by categories.</p>
        <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
      </div>
      {/* <div className="px-5 flex flex-wrap md:justify-between justify-center gap-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (<ProductCard key={item} />))}
      </div> */}
      <div className="px-5 flex flex-wrap md:justify-between justify-center gap-3">
        {Object.keys(items.allProducts).map((key) => (
          <Link key={items.allProducts[key]._id} href={`/product/${items.allProducts[key].slug}`}>
            <ProductCard productItem={items.allProducts[key]} />
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Home;