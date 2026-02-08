import 'dotenv/config';

import express from 'express';
import cors from 'cors';



const app = express();

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
}))

app.use('/api/users', userRoutes);

// ---Server---
app.listen(5002, () => {
  console.log("Listening on port 5002")
})
