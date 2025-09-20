// backend/controllers/notesController.js
import * as noteService from "../services/noteService.js";

export const getNotes = async (req, res) => {
  try {
    const { archived, tag } = req.query;
    const notes = await noteService.getAllNotes({ archived, tag });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting notes" });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await noteService.getNoteById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting note" });
  }
};

export const createNote = async (req, res) => {
  try {
    const note = await noteService.createNote(req.body);
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating note" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await noteService.updateNote(req.params.id, req.body);
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating note" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    await noteService.deleteNote(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting note" });
  }
};

export const archiveNote = async (req, res) => {
  try {
    const note = await noteService.toggleArchive(req.params.id);
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error toggling archive" });
  }
};

export const tagNote = async (req, res) => {
  try {
    const { tag, action } = req.body;
    if (!tag || !action) return res.status(400).json({ message: "Missing tag or action" });
    const note = await noteService.modifyTag(req.params.id, tag, action);
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error modifying tag" });
  }
};
