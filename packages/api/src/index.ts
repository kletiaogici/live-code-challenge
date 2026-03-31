import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import { handleGetFields, handleGetField } from "./handlers/fields"

dotenv.config()

const PORT = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(express.json())

app.get("/fields", handleGetFields)
app.get("/fields/:id", handleGetField)

app.listen(PORT, () => {
  console.log(`GreenLab API Server running on http://localhost:${PORT}`)
})
