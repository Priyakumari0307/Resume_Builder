import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import { enhanceProfessionalSummary, enhanceJobDescription, uploadResume, generateInterviewQuestions, evaluateInterviewAnswer } from '../controllers/aiController.js';

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum', protect, enhanceProfessionalSummary);
aiRouter.post('/enhance-job-desc', protect, enhanceJobDescription);
aiRouter.post('/upload-resume', protect, uploadResume);
aiRouter.post('/generate-interview-questions', protect, generateInterviewQuestions);
aiRouter.post('/evaluate-answer', protect, evaluateInterviewAnswer);

export default aiRouter;

