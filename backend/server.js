import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

// ---AUTH Routes---
import userRoutes from './auth/routes/userRoutes.js'
import tokenRoutes from './auth/routes/tokenRoutes.js'
// ---API Routes---
import tasksRoutes from './api/routes/tasksRoutes.js';
import studySeshRoutes from './api/routes/studySeshRoutes.js';
import settingsRoutes from './api/routes/settingsRoutes.js';
// ---DB Testing Connection---
import { testConnection } from './db/db.js';
// ---Error Handling---
import { errorHandler } from './api/middleware/errorHandler.js';


const app = express();
testConnection()

// ---Middleware---
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser())

// ---Use AUTH Routes---
app.use('/auth/users', userRoutes);
app.use('/auth/token', tokenRoutes)

// ---Use API Routes---
app.use('/api/tasks', tasksRoutes);
app.use('/api/sessions', studySeshRoutes);
app.use('/api/settings', settingsRoutes)

// ---Error handling---
app.use(errorHandler)

// ---Server---
app.listen(5001, () => {
  console.log("Backend listening on port 5001")
})