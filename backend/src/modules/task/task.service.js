const pool = require("../../config/db");

exports.createTask = async (title, userId) => {
  const result = await pool.query(
    `INSERT INTO tasks (title, user_id)
     VALUES ($1, $2)
     RETURNING *`,
    [title, userId]
  );

  return result.rows[0];
};

exports.getUserTasks = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM tasks
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows;
};

exports.updateTask = async (taskId, userId, completed) => {
  const result = await pool.query(
    `UPDATE tasks
     SET completed = $1
     WHERE id = $2 AND user_id = $3
     RETURNING *`,
    [completed, taskId, userId]
  );

  return result.rows[0];
};

exports.deleteTask = async (taskId, userId) => {
  const result = await pool.query(
    `DELETE FROM tasks
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [taskId, userId]
  );

  return result.rows[0];
};