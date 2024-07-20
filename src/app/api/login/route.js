import connectDb from "@/middleware/connectDb";
import User from "@/models/User";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

export async function POST(request) {
  try {
    await connectDb();
    const userData = await request.json();
    const userFind = await User.findOne({ email: userData.email });
    const bytes  = CryptoJS.AES.decrypt(userFind.password, process.env.AES_secret);
    const decryptPass = bytes.toString(CryptoJS.enc.Utf8);

    if (userFind && decryptPass === userData.password) {
      const {name, email} = userFind;
      var token = jwt.sign({name, email}, process.env.JWT_SECRET, { expiresIn: '2d' });
      return new Response(JSON.stringify({ "success": "Login successfully", token }), { status: 201 });
    } else {
      return new Response(JSON.stringify({ "error": "Error in authticating" }), { status: 404 });
    }
  } catch (error) {
    console.log("Error making user: ", error);
    return new Response(JSON.stringify({ "error": "Cannot add user" }), { status: 500 });
  }
}

