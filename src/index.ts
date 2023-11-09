import * as dotenv from "dotenv"
import cors from "cors"
import express from "express"

// Get PORT from .env
dotenv.config()
if (!process.env.PORT) process.exit(1)
const PORT: number = parseInt(process.env.PORT as string, 10)

// Set up express
const app = express()
app.use(cors())
app.use(express.json())

// Start server
app.listen(PORT, () => {console.log(`Listening on port: ${PORT}`)})
