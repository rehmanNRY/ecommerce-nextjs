import Products from '@/components/Products';
import Product from "@/models/Product";
import mongoose from 'mongoose';
import React from 'react';

const Category = async ({ params }) => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  // function getSlug(inputSlug) {
  //   let words = inputSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));
  //   return words.join(' ');
  // }
  // const Slug = getSlug(params.slug);
  const Slug = params.slug;

  let productsItems = await Product.find({ category: Slug });
  let pItems = {};

  for (let item of productsItems) {
    if (pItems.hasOwnProperty(item.title)) {
      if (!pItems[item.title].color.includes(item.color) && item.avalibleQty > 0) {
        pItems[item.title].color.push(item.color);
      }
      if (!pItems[item.title].size.includes(item.size) && item.avalibleQty > 0) {
        pItems[item.title].size.push(item.size);
      }
    } else {
      pItems[item.title] = JSON.parse(JSON.stringify(item));
      if (item.avalibleQty > 0) {
        pItems[item.title].color = [item.color];
        pItems[item.title].size = [item.size];
      } else {
        pItems[item.title].color = [];
        pItems[item.title].size = [];
      }
    }
  }

  return (
    <>
      {!(Object.keys(pItems).length === 0 && pItems.constructor === Object) && <Products
        productName={Slug}
        title="Best quality product items for you"
        description="The product items that are famous in the world. Their variants are available for you to buy and use. Wear, enjoy!"
        banner="https://i.fbcd.co/products/original/mom-and-daughter-white-t-shirt-mockup-photo-by-mastilo-designs-527233c3218ecd4fad655b03012076970f9287d75fceb997131cb9c919967a84.jpg"
        productsItems={JSON.stringify({ pItems })}
      />}
      {(Object.keys(pItems).length === 0 && pItems.constructor === Object) && <p className="font-semibold text-lg px-12 pt-10 text-gray-600">{Slug} not found for now! New stock is comming soon</p>}
    </>
  );
};

export default Category;
