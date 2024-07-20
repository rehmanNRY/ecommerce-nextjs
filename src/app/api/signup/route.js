import connectDb from "@/middleware/connectDb";
import User from "@/models/User";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

export async function POST(request){
  try {
    await connectDb();
    const userData = await request.json();
    const userFind = await User.findOne({ email: userData.email });
    if(!userFind){
      const encryptPass = CryptoJS.AES.encrypt(userData.password, process.env.AES_secret).toString();
      const newUser = await new User({
        name: userData.name,
        password: encryptPass,
        email: userData.email,
      });
      await newUser.save();
      const {name, email} = userData;
      var token = jwt.sign({name, email}, process.env.JWT_SECRET, { expiresIn: '2d' });
      return new Response(JSON.stringify({ "success": "User added successfully", token }), { status: 201 });
    } else{
      return new Response(JSON.stringify({"error": "Email Already exist!"}), {status: 500});
    }
  } catch (error) {
    console.log("Error making user: ", error);
    return new Response(JSON.stringify({"error": "Cannot add user"}), {status: 500});
    
  }
}

