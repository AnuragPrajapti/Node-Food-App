const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Successfully connect database ${mongoose.connection.host}`);
  } catch (error) {
    console.error("Data base error ", error);
  }
};

module.exports = connectDb;
