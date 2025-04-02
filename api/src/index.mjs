import express from "express"
import { config as envConfig } from "dotenv"
import fs from "fs"

envConfig()
const app = express()

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Furniture.com product service v1.",
    created_at: new Date().toISOString(),
  })
})

app.get("/products", (req, res) => {
  const products = JSON.parse(fs.readFileSync("./data/products.json"))
  res.json({ count: products.length, products })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`)
})
