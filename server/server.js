import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import aiRouter from './routes/aiRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';

dotenv.config();


const app = express();
const PORT = 3000;

//Database connection
await connectDB();

// Middleware to parse JSON bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
