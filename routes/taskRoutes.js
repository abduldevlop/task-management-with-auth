// routes/taskRouter.js
const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/taskControllers");
const verifyToken = require("../middlewares/authMiddleware");

const taskRouter = express.Router();

// Create a new task
taskRouter.post("/create", verifyToken, createTask);

// Read all tasks
taskRouter.get("/get-all", verifyToken, getAllTasks);

// Read a specific task by ID
taskRouter.get("/:id", verifyToken, getTaskById);

// Update a task by ID
taskRouter.put("/:id", verifyToken, updateTaskById);

// Delete a task by ID
taskRouter.delete("/:id", verifyToken, deleteTaskById);

module.exports = taskRouter;
