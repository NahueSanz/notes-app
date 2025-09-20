import express from "express";
import * as controller from "../controllers/notesController.js";
const router = express.Router();

router.get("/", controller.getNotes);
router.post("/", controller.createNote);
router.get("/:id", controller.getNote);
router.put("/:id", controller.updateNote);
router.delete("/:id", controller.deleteNote);
router.patch("/:id/archive", controller.archiveNote);
router.patch("/:id/tags", controller.tagNote);

export default router;
