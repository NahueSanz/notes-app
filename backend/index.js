import express from 'express';
import cors from 'cors';
import notesRoutes from './routes/notes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/notes', notesRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
