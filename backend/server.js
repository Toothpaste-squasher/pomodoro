import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// ---Import Routes---
import tasksRoutes from './routes/tasksRoutes.js';
import studySeshRoutes from './routes/studySeshRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';

import { testConnection } from './db/db.js';

const app = express();

testConnection()

// ---Middleware---
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// ---Use Routes---
app.use('/api/tasks', tasksRoutes);
app.use('/api/sessions', studySeshRoutes);
app.use('/api/settings', settingsRoutes)

// ---Error handling---
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ success: false, message: err.message })
})

// ---Server---
app.listen(5001, () => {
  console.log("Backend listening on port 5001")
})