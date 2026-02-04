import express from 'express';
import cors from 'cors';
import tasksRoutes from './routes/tasksRoutes.js';
import studySeshRoutes from './routes/studySeshRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';

const app = express();

// ---Import Routes---

// ---Middleware---
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
}));

// ---Use Routes---
app.use('/api/tasks', tasksRoutes);
app.use('/api/sessions', studySeshRoutes);
app.use('/api/settings', settingsRoutes)

// ---Server---
app.listen(5001, () => {
  console.log("Listening on port 5001")
})