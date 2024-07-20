const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Server started on port 3000`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDb