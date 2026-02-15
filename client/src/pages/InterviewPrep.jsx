import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import { toast } from "react-hot-toast";
import { LoaderCircle, ChevronDown, ChevronUp, MessageSquare, Send, Terminal, Briefcase, Heart, Target, UploadCloudIcon } from "lucide-react";
import pdfToText from 'react-pdftotext';

export default function InterviewPrep() {
    const { token } = useSelector((state) => state.auth);
    const [resumes, setResumes] = useState([]);
    const [selectedResumeId, setSelectedResumeId] = useState("");
    const [questions, setQuestions] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState("technical");

    // Upload feature states
    const [uploadMode, setUploadMode] = useState(false);
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    // For practice answer
    const [practiceQuestion, setPracticeQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState("");
    const [evaluation, setEvaluation] = useState(null);
    const [isEvaluating, setIsEvaluating] = useState(false);

    useEffect(() => {
        loadResumes();
    }, []);

    const loadResumes = async () => {
        try {
            const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } });
            setResumes(data.resumes);
            if (data.resumes.length > 0) {
                setSelectedResumeId(data.resumes[0]._id);
            }
        } catch (error) {
            toast.error("Failed to load resumes");
        }
    };

    const extractTextFromPDF = async (file) => {
        try {
            const text = await pdfToText(file);
            return text;
        } catch (error) {
            console.error('PDF extraction error:', error);
            const errorMessage = typeof error === 'string' ? error : (error.message || 'Unknown error');
            throw new Error(`Failed to extract text from PDF: ${errorMessage}`);
        }
    };

    const triggerGenerate = async (resumeId) => {
        setIsLoading(true);
        setQuestions(null);
        try {
            const { data } = await api.post('/api/ai/generate-interview-questions',
                { resumeId: resumeId },
                { headers: { Authorization: token } }
            );
            setQuestions(data.questions);
            toast.success("Interview questions generated!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to generate questions");
        }
        setIsLoading(false);
    };

    const handleUploadAndGenerate = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error("Please select a PDF file");
            return;
        }

        setIsUploading(true);
        try {
            const resumeText = await extractTextFromPDF(file);
            if (!resumeText || resumeText.trim().length === 0) {
                throw new Error("Could not extract text from this PDF.");
            }

            // Upload to DB first
            const { data } = await api.post('/api/ai/upload-resume',
                { title: `Interview Prep - ${file.name}`, resumeText },
                { headers: { Authorization: token } }
            );

            // Refresh list and trigger generation
            await loadResumes();
            setSelectedResumeId(data.resumeId);
            setUploadMode(false);
            setFile(null);

            // Generate questions for this new resume
            await triggerGenerate(data.resumeId);
        } catch (error) {
            toast.error(error.message || "Failed to process resume");
        }
        setIsUploading(false);
    };

    const generateQuestions = async () => {
        if (!selectedResumeId) {
            toast.error("Please select a resume first");
            return;
        }
        await triggerGenerate(selectedResumeId);
    };

    const practiceAnswer = (question) => {
        setPracticeQuestion(question);
        setUserAnswer("");
        setEvaluation(null);
    };

    const submitAnswer = async () => {
        if (!userAnswer.trim()) {
            toast.error("Please type an answer first");
            return;
        }

        setIsEvaluating(true);
        try {
            const { data } = await api.post('/api/ai/evaluate-answer',
                { question: practiceQuestion, answer: userAnswer },
                { headers: { Authorization: token } }
            );
            setEvaluation(data);
        } catch (error) {
            toast.error("Failed to evaluate answer");
        }
        setIsEvaluating(false);
    };

    const CategorySection = ({ title, category, icon }) => {
        const isExpanded = expandedCategory === category;
        const categoryQuestions = (questions && questions[category]) || [];

        return (



            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-4">
                <button
                    onClick={() => setExpandedCategory(isExpanded ? null : category)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <span className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            {icon}
                        </span>
                        <h3 className="font-semibold text-slate-800">{title}</h3>
                        <span className="text-xs font-medium bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                            {categoryQuestions.length} Questions
                        </span>
                    </div>
                    {isExpanded ? <ChevronUp className="size-5 text-slate-400" /> : <ChevronDown className="size-5 text-slate-400" />}
                </button>

                {isExpanded && (
                    <div className="p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                        {categoryQuestions.map((q, idx) => (
                            <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <p className="text-slate-700 font-medium">{q}</p>
                                <button
                                    onClick={() => practiceAnswer(q)}
                                    className="whitespace-nowrap flex items-center gap-2 text-sm bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                                >
                                    <MessageSquare className="size-4" />
                                    Practice Answer
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        );
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-3">AI Interview Preparation</h1>
                <p className="text-lg text-slate-600">Personalized Interview Questions generated from your resume, skills, and experience.</p>
            </div>

            <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 mb-8 max-w-md mx-auto flex">
                <button
                    onClick={() => setUploadMode(false)}
                    className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${!uploadMode ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    Existing Resume
                </button>
                <button
                    onClick={() => setUploadMode(true)}
                    className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${uploadMode ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    Upload New
                </button>
            </div>

            {!uploadMode ? (
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 mb-12 animate-in fade-in duration-300">
                    <div className="flex flex-col sm:flex-row items-end gap-6">
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Select a Resume to Base Questions On</label>
                            <select
                                value={selectedResumeId}
                                onChange={(e) => setSelectedResumeId(e.target.value)}
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                            >
                                <option value="">-- Choose a Resume --</option>
                                {resumes.map(r => (
                                    <option key={r._id} value={r._id}>{r.title}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={generateQuestions}
                            disabled={isLoading || !selectedResumeId}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-blue-200 disabled:opacity-60 active:scale-[0.98]"
                        >
                            {isLoading ? <LoaderCircle className="animate-spin size-5" /> : null}
                            {isLoading ? "Generating..." : "Generate My Interview Questions"}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 mb-12 animate-in fade-in duration-300">
                    <form onSubmit={handleUploadAndGenerate} className="space-y-6">
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-10 hover:border-blue-400 transition-colors group relative cursor-pointer">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            {file ? (
                                <div className="text-center">
                                    <p className="text-green-600 font-bold text-lg mb-1">{file.name}</p>
                                    <p className="text-slate-400 text-sm">Click or drag to replace</p>
                                </div>
                            ) : (
                                <>
                                    <UploadCloudIcon className="size-16 text-slate-300 group-hover:text-blue-500 transition-colors mb-4" />
                                    <p className="text-slate-600 font-semibold">Drop your resume PDF here</p>
                                    <p className="text-slate-400 text-sm">Supports only PDF files</p>
                                </>
                            )}
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={isUploading || !file}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3.5 px-12 rounded-xl transition-all shadow-lg shadow-blue-200 disabled:opacity-60 active:scale-[0.98]"
                            >
                                {isUploading ? <LoaderCircle className="animate-spin size-5" /> : null}
                                {isUploading ? "Processing PDF..." : "Upload & Generate Questions"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {questions && (
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-blue-600 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded">AI Generated for You</span>
                        <h2 className="text-xl font-bold text-slate-800">Your Personalized Questions</h2>
                    </div>

                    <CategorySection title="Technical Questions" category="technical" icon={<Terminal className="size-5" />} />
                    <CategorySection title="Project-Based Questions" category="project" icon={<Briefcase className="size-5" />} />
                    <CategorySection title="Behavioral Questions" category="behavioral" icon={<Heart className="size-5" />} />
                    <CategorySection title="HR / Career Questions" category="hr" icon={<Target className="size-5" />} />
                </div>
            )}

            {/* Practice Answer Modal/Panel */}
            {practiceQuestion && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-800">Practice Your Answer</h3>
                            <button onClick={() => setPracticeQuestion(null)} className="text-slate-400 hover:text-slate-600">✕</button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-6">
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <p className="text-blue-900 font-semibold mb-1">Question:</p>
                                <p className="text-blue-800">{practiceQuestion}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">Your Answer</label>
                                <textarea
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="Type your response here..."
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl min-h-[150px] focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                                />
                            </div>

                            {evaluation && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <div className="p-4 bg-green-50 rounded-xl border border-green-100 uppercase text-[10px] font-bold text-green-700 tracking-wider">AI Feedback</div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="font-bold text-slate-800 mb-1">Feedback:</p>
                                            <p className="text-slate-600 text-sm">{evaluation.feedback}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800 mb-1">Sample Answer:</p>
                                            <p className="text-slate-600 text-sm bg-slate-50 p-4 rounded-lg border border-slate-100 italic">"{evaluation.sampleAnswer}"</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
                            <button
                                onClick={() => setPracticeQuestion(null)}
                                className="px-6 py-2.5 text-slate-600 font-semibold hover:bg-slate-50 rounded-lg transition-all"
                            >
                                Close
                            </button>
                            <button
                                onClick={submitAnswer}
                                disabled={isEvaluating || !userAnswer.trim()}
                                className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-200 active:scale-95 disabled:opacity-60"
                            >
                                {isEvaluating ? <LoaderCircle className="animate-spin size-4" /> : <Send className="size-4" />}
                                {isEvaluating ? "Evaluating..." : "Evaluate Answer"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}