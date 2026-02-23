const express = require('express');
const cors = require('cors');
const app = express();
const pool = require("./config/db");
const authRoutes = require("./modules/auth/auth.routes");
const { authenticate } = require("./middleware/auth.middleware");
const { authorize } = require("./middleware/role.middleware");
const taskRoutes = require("./modules/task/task.routes");
const { errorHandler } = require("./middleware/error.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger");




app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.get("/api/v1/protected", authenticate, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

app.get(
  "/api/v1/admin/users",
  authenticate,
  authorize("ADMIN"),
  async (req, res) => {
    const result = await pool.query("SELECT id, email, role FROM users");
    res.json(result.rows);
  }
);

app.get("/setup-db", async (req, res) => {
  try {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'USER',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT role_check CHECK (role IN ('USER', 'ADMIN'))
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        user_id UUID NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_user
          FOREIGN KEY(user_id)
          REFERENCES users(id)
          ON DELETE CASCADE
      );
    `);

    await pool.query(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);`);

    res.send("Database setup complete!");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.use(errorHandler);

module.exports = app;