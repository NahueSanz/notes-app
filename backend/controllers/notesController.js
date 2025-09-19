import { notes } from '../data/notesData.js';

export const getNotes = (req, res) => {
  const { archived, tag } = req.query;
  let filtered = notes;
  if (archived === 'true') filtered = filtered.filter((n) => n.archived);
  if (archived === 'false') filtered = filtered.filter((n) => !n.archived);
  if (tag) filtered = filtered.filter((n) => n.tags.includes(tag));
  res.json(filtered);
};

export const createNote = (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: Date.now(), title, content, archived: false, tags: [] };
  notes.push(newNote);
  res.status(201).json(newNote);
};

export const updateNote = (req, res) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;
  const note = notes.find((n) => n.id === id);
  if (!note) return res.status(404).json({ message: 'Nota no encontrada' });
  note.title = title;
  note.content = content;
  res.json(note);
};

export const deleteNote = (req, res) => {
  const id = Number(req.params.id);
  const index = notes.findIndex((n) => n.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
  }
  res.status(200).json({ message: 'Nota eliminada' });
};

export const archiveNote = (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);
  if (!note) return res.status(404).json({ message: 'Nota no encontrada' });
  note.archived = !note.archived; // toggle
  res.json(note);
};

export const tagNote = (req, res) => {
  const id = Number(req.params.id);
  const { tag, action } = req.body; // action: 'add' | 'remove'
  const note = notes.find((n) => n.id === id);
  if (!note) return res.status(404).json({ message: 'Nota no encontrada' });

  if (action === 'add' && tag && !note.tags.includes(tag)) {
    note.tags.push(tag);
  } else if (action === 'remove' && tag) {
    note.tags = note.tags.filter((t) => t !== tag);
  }

  res.json(note);
};

export const filterNote = (req, res) => {
  const { archived, tag } = req.query;

  let filtered = notes;

  if (archived === 'true') filtered = filtered.filter((n) => n.archived);
  if (archived === 'false') filtered = filtered.filter((n) => !n.archived);
  if (tag) filtered = filtered.filter((n) => n.tags.includes(String(tag)));

  res.json(filtered);
};
