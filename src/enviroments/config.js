import dotenv from "dotenv"
dotenv.config()

const Secrets = {
  node_ENV: process.env.NODE_ENV || "development",
  port: process.env.PORT || 4000,
  mongo_URI: process.env.MONGO_URI,
  //   jwt_Secret: process.env.JWT_SECRET || "abc123",
}
export default Secrets
