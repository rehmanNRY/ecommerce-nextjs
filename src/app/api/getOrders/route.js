import connectDb from "@/middleware/connectDb";
import Order from "@/models/Order";
var jwt = require('jsonwebtoken');

export async function POST(request){
  try {
    await connectDb();
    const {authToken} = await request.json();
    var {email} = jwt.verify(authToken, process.env.JWT_SECRET);
    let Orders = await Order.find({ email });
    if (Orders) {
      return new Response(JSON.stringify(Orders));
    } else {
      return new Response(JSON.stringify({"message": "Error getting Orders"}), {status: 500})
    }
  } catch (error) {
    console.log("Error getting Orders");
    return new Response(JSON.stringify({"message": "Cannot get Orders"}), {status: 500})
  }
}