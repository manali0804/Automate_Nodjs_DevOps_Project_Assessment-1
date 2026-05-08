require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");

const app = express();

app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get("/", (req, res) => {
  res.send("Application running on port 3001");
});

app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  await pool.query(
    "INSERT INTO users(name,email) VALUES($1,$2)",
    [name, email]
  );

  res.json({ message: "User added" });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
