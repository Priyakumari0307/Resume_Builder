import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "https://resume-builder-cu7h.onrender.com",
})

export default api
