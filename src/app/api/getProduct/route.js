import connectDb from "@/middleware/connectDb";
import Product from "@/models/Product";

export async function GET(request){
  try {
    await connectDb();
    let products = await Product.find();

    return new Response(JSON.stringify(products));
  } catch (error) {
    console.log("Error getting products");
    return new Response(JSON.stringify({"message": "Cannot get products"}), {status: 500})
  }
}