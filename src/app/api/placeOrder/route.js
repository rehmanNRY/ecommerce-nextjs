import connectDb from "@/middleware/connectDb";
import Order from "@/models/Order";

export async function POST(request) {
  try {
    await connectDb();
    const orderData = await request.json();
    const {userId, address, email, amount, products} = orderData;
    const data = {userId, address, email, amount, products};
    const newOrder = await new Order(data);
    await newOrder.save();
    return new Response(JSON.stringify({ "success": "Order placed successfully", newOrder }), { status: 201 });
  } catch (error) {
    console.log("Error making user: ", error);
    return new Response(JSON.stringify({ "error": "Cannot place order" }), { status: 500 });

  }
}

