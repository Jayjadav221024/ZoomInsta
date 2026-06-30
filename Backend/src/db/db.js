const mongoose = require("mongoose");

async function connectdb() {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI missing in Vercel env");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Mongo DB Connected ✅");
  } catch (err) {
    console.error("Mongo DB Connection Error:", err.message);
  }
}

module.exports = { connectdb };