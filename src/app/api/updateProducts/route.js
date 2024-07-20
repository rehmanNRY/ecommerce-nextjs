import connectDb from "@/middleware/connectDb";
import Product from "@/models/Product";

export async function POST(request) {
  try {
    await connectDb();
    const productData = await request.json();
    for (let i = 0; i < productData.length; i++) {
      const newProduct = await Product.findByIdAndUpdate(productData[i]._id,
        {
          title: productData[i].title,
          slug: productData[i].slug,
          desc: productData[i].desc,
          img: productData[i].img,
          avalibleQty: productData[i].avalibleQty,
          category: productData[i].category,
          price: productData[i].price,
          color: productData[i].color,
          size: productData[i].size,
        }
      )
      await newProduct.save();
    }
    return new Response(JSON.stringify({ "message": "Products updated successfully" }), { status: 201 });
  } catch (error) {
    console.log("Error adding poducts: ", error);
    return new Response(JSON.stringify({ "message": "Cannot update products" }), { status: 500 });
  }
}