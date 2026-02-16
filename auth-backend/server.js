import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import Routes
import userRoutes from './routes/userRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js';


const app = express();

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(cookieParser())

app.use('/api/users', userRoutes);
app.use('/api/token', tokenRoutes)

// ---Server---
app.listen(5002, () => {
  console.log("Auth-backend listening on port 5002")
})
