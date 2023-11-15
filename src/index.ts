// Using tutorial:
// https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/

import * as dotenv from "dotenv"
import cors from "cors"
import express from "express"
import { router } from "./api/bs.router.js"

// Get PORT from .env
dotenv.config()
if (!process.env.PORT) process.exit(1)
const PORT: number = parseInt(process.env.PORT as string, 10)

// Set up express
const app = express()
app.use(cors())
app.use(express.json())
app.use("/bss", router) // Include our router in the express

// Start server
app.listen(PORT, () => {console.log(`Listening on port: ${PORT}`)})
