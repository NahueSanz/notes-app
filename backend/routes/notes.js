import express from 'express';
import * as controller from '../controllers/notesController.js';
const router = express.Router();

router.get('/', controller.getNotes);
router.post('/', controller.createNote);
router.put('/:id', controller.updateNote);
router.delete('/:id', controller.deleteNote);
router.patch('/:id/archive', controller.archiveNote);
router.patch('/:id/tags', controller.tagNote);
//router.get('/', controller.filterNote);

export default router;
