import { readFileSync } from "fs"
import { config as envConfig } from "dotenv"
import pg from "pg"

envConfig()

const seed = async () => {
  const { Pool } = pg
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    const products = JSON.parse(readFileSync("./data/products.json", "utf-8"))
    console.log(`Seeding the database with ${products.length} products...`)

    const client = await pool.connect()

    for (const product of products) {
      await client.query(
        `INSERT INTO products (
          id,
          name,
          description,
          price,
          category,
          stock,
          image_url,
          rating,
          details,
          dimensions,
          materials,
          features
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT (id) DO NOTHING;`,
        [
          product.id,
          product.name,
          product.description,
          product.price,
          product.category,
          product.stock,
          product.imageUrl,
          product.rating,
          product.details,
          product.dimensions,
          product.materials,
          JSON.stringify(product.features),
        ],
      )
    }

    client.release()
    console.log("All done!")
  } catch (error) {
    console.error("Error seeding the database.", error)
  } finally {
    await pool.end()
  }
}

seed()
