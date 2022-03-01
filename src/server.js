import express from "express"
import { ApolloServer, gql } from "apollo-server-express"
import dotenv from "dotenv"
import colors from "colors"
import resolvers from "./graphql/resolvers/resolvers.js"
import typeDefs from "./graphql/schemas/schemas.js"

import connectDB from "./db/connectDB.js"
import Secrets from "./enviroments/config.js"
dotenv.config()

async function startServer() {
  const app = express()
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
  })

  await apolloServer.start() //its optional but do this because its loaded all your schemas and if any error so its throw the error before connect to the port

  apolloServer.applyMiddleware({
    app,
    path: "/",
    bodyParserConfig: { limit: "50mb" },
    cors: { origin: "*" },
  })

  await connectDB()
  const PORT = Secrets.port
  app.listen(
    PORT,
    console.log(
      `Server Running ${Secrets.node_ENV} mode in ${PORT}`.yellow.bold
    )
  )
}
startServer()
