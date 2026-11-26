import express from "express";

import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
} from "../controllers/index.js";

const routes = express.Router();

routes.get("/", getAllNotes);

routes.get("/:id", getNoteById);

routes.post("/", createNote);

routes.put("/:id", updateNote);

routes.delete("/:id", deleteNote);

export default routes;
