import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  // 🔒 Protect Route
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks");
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const { data } = await API.post("/tasks", { title });
      setTasks([data, ...tasks]);
      setTitle("");
    } catch (err) {
      setError("Failed to add task");
    }
  };

  const toggleTask = async (task) => {
    try {
      const { data } = await API.put(`/tasks/${task.id}`, {
        completed: !task.completed,
      });

      setTasks(tasks.map((t) => (t.id === task.id ? data : t)));
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={containerStyle}>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.email}</p>

      <button onClick={handleLogout}>Logout</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="New task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginTop: "10px" }}>
            <span
              style={{
                textDecoration: task.completed
                  ? "line-through"
                  : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleTask(task)}
            >
              {task.title}
            </span>

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const containerStyle = {
  maxWidth: "400px",
  margin: "50px auto",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

export default Dashboard;