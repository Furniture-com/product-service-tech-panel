import pg from "pg"
import { config as envConfig } from "dotenv"

envConfig()

const { Pool } = pg

export class Postgres {
  static poolClient

  static async getPoolClient() {
    if (!Postgres.poolClient) {
      const connectionString = process.env.DATABASE_URL
      Postgres.poolClient = await new Pool({ connectionString }).connect()
    }
    return Postgres.poolClient
  }
}
