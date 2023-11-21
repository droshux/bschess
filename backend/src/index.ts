// Using tutorial:
// https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/

import * as dotenv from "dotenv"
import cors from "cors"
import express from "express"
import { router, systemRouter } from "./api/bs.router.js"
import { load } from "./api/bs.service.js"

// Get PORT from .env
dotenv.config()
if (!process.env.PORT) process.exit(1)
const PORT: number = parseInt(process.env.PORT as string, 10)

// Set up express
const app = express()
app.use(cors())
app.use(express.json())

// // Experimental Proxy Code
// import * as proxy from 'express-http-proxy'
// app.use("site/",proxy.default("http://localhost:5173", {
//   preserveHostHdr: true
// }))
// app.use("api/bss", router) // Include our router in the express
// app.use("/sys", systemRouter)

// Load data from file
await load()

// Start server
app.listen(PORT, () => {console.log(`Listening on port: ${PORT}`)})
