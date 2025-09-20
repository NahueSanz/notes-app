// backend/services/noteService.js
import prisma from "../lib/prismaClient.js";

export const getAllNotes = async ({ archived, tag } = {}) => {
  const where = {};
  if (archived === "true" || archived === true) where.archived = true;
  if (archived === "false") where.archived = false;
  if (tag) where.tags = { has: tag };

  return prisma.note.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getNoteById = async (id) => {
  return prisma.note.findUnique({ where: { id: Number(id) } });
};

export const createNote = async (data) => {
  const { title = "", content = "", tags = [] } = data;
  return prisma.note.create({
    data: {
      title,
      content,
      tags,
    },
  });
};

export const updateNote = async (id, data) => {
  const updateData = {};
  if (typeof data.title !== "undefined") updateData.title = data.title;
  if (typeof data.content !== "undefined") updateData.content = data.content;
  if (typeof data.archived !== "undefined") updateData.archived = data.archived;
  if (typeof data.tags !== "undefined") updateData.tags = data.tags;

  return prisma.note.update({
    where: { id: Number(id) },
    data: updateData,
  });
};

export const deleteNote = async (id) => {
  return prisma.note.delete({ where: { id: Number(id) } });
};

export const toggleArchive = async (id) => {
  const note = await getNoteById(id);
  if (!note) return null;
  return prisma.note.update({
    where: { id: Number(id) },
    data: { archived: !note.archived },
  });
};

export const modifyTag = async (id, tag, action) => {
  const note = await getNoteById(id);
  if (!note) return null;
  const tags = Array.isArray(note.tags) ? [...note.tags] : [];
  if (action === "add") {
    if (!tags.includes(tag)) tags.push(tag);
  } else if (action === "remove") {
    const idx = tags.indexOf(tag);
    if (idx !== -1) tags.splice(idx, 1);
  } else {
    throw new Error("Invalid tag action");
  }
  return prisma.note.update({
    where: { id: Number(id) },
    data: { tags },
  });
};
