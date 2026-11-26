import Note from "../models/Note.js";
import mongoose from "mongoose";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getAllNotes", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = new Note({ title, content });

    const saveNote = await note.save();

    res.status(201).json(saveNote);
  } catch (error) {
    console.error("Error in createNote", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const id = req.params.id;

    // Validate MongoDB ObjectId
    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({
        message: "Invalid note ID",
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        title,
        content,
      },
      { new: true, runValidators: true },
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note updated successfully!", updateNote });
  } catch (error) {
    console.error("Error in createNote", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate MongoDB ObjectId
    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({
        message: "Invalid note ID",
      });
    }

    const deletedNote = await Note.findByIdAndDelete(id, {
      new: true,
      runValidators: true,
    });

    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });

    res
      .status(200)
      .json({ message: "Note deleted successfully!", deletedNote });
  } catch (error) {
    console.error("Error in createNote", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
