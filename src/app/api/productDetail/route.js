import connectDb from "@/middleware/connectDb";
import Product from "@/models/Product";

export async function POST(request) {
  try {
    await connectDb();
    const body = await request.json();
    const slug = body.slug;

    // Improved logging
    console.log("Received request for product with slug:", slug);

    const product = await Product.findOne({ slug });
    if (!product) {
      console.log("Product not found for slug:", slug);
      return new Response(JSON.stringify({ "message": "Product not found" }), { status: 404 });
    }

    const productsWithSameTitle = await Product.find({ title: product.title, category: product.category });

    const colors = productsWithSameTitle.map(prod => prod.color);
    const sizes = productsWithSameTitle.map(prod => prod.size);

    const response = {
      products: productsWithSameTitle,
      product,
      colors: [...new Set(colors)],
      sizes: [...new Set(sizes)]
    };

    console.log("Response data:", response);

    return new Response(JSON.stringify(response));
  } catch (error) {
    console.error("Error getting products:", error);
    return new Response(JSON.stringify({ "message": "Cannot get product detail" }), { status: 500 });
  }
}
