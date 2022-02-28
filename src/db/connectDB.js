import mongoose from "mongoose"
import Secrets from "../enviroments/config.js"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(Secrets.mongo_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB connected ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(`Error in DB ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}
export default connectDB
