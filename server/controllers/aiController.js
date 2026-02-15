import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";
import groq from "../configs/groq.js";

// controller for enchancing a resume's professional summary
// POST: /api/ai/enchance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const prompt = `System Instruction: You are an expert in resume writing. Your task is to enhance the professional summary of the resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it complelling and ATS-friendly. Only return text, no options or anything else.\n\nUser Content: ${userContent}`;

        const result = await ai.generateContent(prompt);
        const response = await result.response;
        const enhancedContent = response.text();

        return res.status(200).json({ enhancedContent });
    } catch (error) {
        console.warn("AI Generation failed. Using Mock Fallback.");
        return res.status(200).json({
            enhancedContent: "Experienced professional with a proven track record of success. Skilled in problem-solving and driving results. (Mock Enhanced Summary)"
        });
    }
}

//controller for enchancing a resume's job description
//POST: /api/ai/enchance-job-desc

export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const prompt = `System Instruction: You are an expert in resume writing. Your task is to enhance the job description of the resume. The job description should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it complelling and ATS-friendly. Only return text, no options or anything else.\n\nUser Content: ${userContent}`;

        const result = await ai.generateContent(prompt);
        const response = await result.response;
        const enhancedContent = response.text();

        return res.status(200).json({ enhancedContent });
    } catch (error) {
        console.warn("AI Generation failed. Using Mock Fallback.");
        return res.status(200).json({
            enhancedContent: "Executed key projects with high efficiency, demonstrating strong technical and leadership skills. (Mock Enhanced Description)"
        });
    }
}

//controller for uploading a resume to the database
//POST: /api/ai/upload-resume

export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        console.log("Resume Upload Request - User:", userId, "Title:", title);

        if (!resumeText || resumeText.trim().length === 0) {
            console.error("Upload Error: Missing resume text");
            return res.status(400).json({ message: "No text could be extracted from the PDF." })
        }

        let parsedData;

        try {
            console.log("Attempting Gemini AI extraction...");
            const systemPrompt = "You are an expert AI Agent to extract data from resume. Return JSON only."
            const userPrompt = `Extract data from this resume text: ${resumeText}. Return JSON only. Structure it with keys: 'professional_summary', 'skills' (array), 'personal_info' (object with full_name, email, phone, location, linkedin, website, profession), 'experience' (array of objects with company, position, start_date, end_date, description, is_current), 'project' (array of objects with name, type, description), 'education' (array of objects with institution, degree, field, graduation_date, gpa).`;

            const prompt = systemPrompt + "\n" + userPrompt;

            const result = await ai.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Clean up the response to ensure it's valid JSON
            const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
            parsedData = JSON.parse(jsonString);
            console.log("AI Extraction Successful");

        } catch (aiError) {
            console.warn("AI Extraction failed (likely quota). Using Mock Parser fallback.");

            // MOCK DATA FALLBACK
            parsedData = {
                professional_summary: "Experienced professional with a strong background in software development and project management. (Mock Data)",
                skills: ["JavaScript", "React", "Node.js", "MongoDB", "Mock Parser"],
                personal_info: {
                    full_name: "Mock User (Demo Mode)",
                    profession: "Software Engineer",
                    email: "demo@example.com",
                    phone: "+1 234 567 890",
                    location: "Washington, D.C.",
                    linkedin: "https://linkedin.com/in/mockuser",
                    website: "https://example.com"
                },
                experience: [
                    {
                        company: "Tech Solutions Inc.",
                        position: "Senior Developer",
                        start_date: "2020-01",
                        end_date: "Present",
                        description: "Working on full-stack web applications using MERN stack. (Demo)",
                        is_current: true
                    }
                ],
                project: [
                    {
                        name: "AI Resume Builder",
                        type: "Web App",
                        description: "A platform to build resumes using AI. (Demo)"
                    }
                ],
                education: [
                    {
                        institution: "University of Technology",
                        degree: "Bachelor of Science",
                        field: "Computer Science",
                        graduation_date: "2019-05",
                        gpa: "3.8"
                    }
                ]
            };
        }

        // Clean up data for Mongoose
        delete parsedData._id;
        delete parsedData.userId;

        const newResume = await Resume.create({
            userId,
            title: title || "Imported Resume (Demo)",
            ...parsedData
        });

        console.log("Resume created with ID:", newResume._id);
        res.json({ resumeId: newResume._id, message: "Parsed successfully (Demo Mode)" });

    } catch (error) {
        console.error("Upload Resume Major Error:", error);
        return res.status(400).json({ message: error.message });
    }
}

//controller for generating interview questions using Groq
//POST: /api/ai/generate-interview-questions

export const generateInterviewQuestions = async (req, res) => {
    try {
        const { resumeId } = req.body;
        const userId = req.userId;

        if (!resumeId) {
            return res.status(400).json({ message: "Resume ID is required" });
        }

        const resume = await Resume.findOne({ userId, _id: resumeId });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        const resumeDataJSON = JSON.stringify(resume.toObject());

        const prompt = `You are an AI interview coach. Based on the following resume data, generate a list of realistic technical, behavioral, and role-specific interview questions. The questions should be tailored to the candidate's skills, projects, and experience level. Separate the questions into these categories:
1. Technical Questions
2. Project-Based Questions
3. Behavioral Questions
4. HR / Career Questions

Return the response as a JSON object with keys: "technical", "project", "behavioral", and "hr". Each value should be an array of questions.

Resume Data:
${resumeDataJSON}`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });

        const questions = JSON.parse(chatCompletion.choices[0].message.content);

        return res.status(200).json({ questions });
    } catch (error) {
        console.error("Groq Generation error:", error);
        return res.status(500).json({ message: error.message });
    }
}

//controller for evaluating interview answers using Groq
//POST: /api/ai/evaluate-answer

export const evaluateInterviewAnswer = async (req, res) => {
    try {
        const { question, answer } = req.body;

        if (!question || !answer) {
            return res.status(400).json({ message: "Question and answer are required" });
        }

        const prompt = `You are an AI interview coach. Evaluate this interview answer and give feedback and a better sample answer.
        
Question: ${question}
User Answer: ${answer}

Return the response as a JSON object with keys: "feedback" and "sampleAnswer".`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });

        const evaluation = JSON.parse(chatCompletion.choices[0].message.content);

        return res.status(200).json(evaluation);
    } catch (error) {
        console.error("Groq Evaluation error:", error);
        return res.status(500).json({ message: error.message });
    }
}
