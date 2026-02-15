import mongoose from "mongoose";
import dns from "dns";

// Fix for ECONNREFUSED issues with SRV records on some networks or Windows machines.
// This forces Node.js to use Google's public DNS for resolving the MongoDB SRV record.
try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (error) {
    // Fallback to system default if setting custom servers fails
}

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("✅ Connected to MongoDB successfully");
        });

        mongoose.connection.on("error", (err) => {
            console.error("❌ MongoDB connection error:", err);
        });

        const mongodbURI = process.env.MONGO_URI;
        const projectName = 'resume-builder';

        if (!mongodbURI) {
            throw new Error("MONGO_URI environment variable not set");
        }

        // We use dbName option to ensure it connects to the right database
        await mongoose.connect(mongodbURI, {
            dbName: projectName
        });
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message);
        // Exit process on failure so nodemon can attempt to restart or user can see the error clearly
        process.exit(1);
    }
}

export default connectDB;