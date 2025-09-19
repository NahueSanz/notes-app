import express from 'express';
import cors from 'cors';
import notesRoutes from './routes/notes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/notes', notesRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
