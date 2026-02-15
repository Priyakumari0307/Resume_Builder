import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// Serve static files from the React app
const clientPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
