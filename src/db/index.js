const { Pool } = require("pg");
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_NAME,
  DB_PASSWORD,
} = require("../constants/index");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

module.exports = {
  query: async (text, params) => {
    try {
      const client = await pool.connect();
      const result = await client.query(text, params);
      client.release();
      return result;
    } catch (error) {
      console.error("Error executing query:", error.message);
      throw error;
    }
  },
};
