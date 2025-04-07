import express from "express"
import { config as envConfig } from "dotenv"
import fs from "fs"
import { Postgres } from "./lib/pg.mjs"

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

app.get("/test-db", async (req, res) => {
  const postgres = await Postgres.getPoolClient()
  const { rows } = await postgres.query(`SELECT * FROM "public"."products";`, [])
  res.json({ products: rows || [] })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`)
})
