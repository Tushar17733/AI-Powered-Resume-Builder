import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: '/api',
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Resume API services
export const resumeService = {
  getAll: () => api.get('/resumes'),
  getById: (id) => api.get(`/resumes/${id}`),
  create: (data) => api.post('/resumes', data),
  update: (id, data) => api.put(`/resumes/${id}`, data),
  delete: (id) => api.delete(`/resumes/${id}`),
};

// Auth API services
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getUser: () => api.get('/auth/user'),
};

// AI API services
export const aiService = {
  generateSummary: (data) => api.post('/ai/generate-summary', data),
  enhanceResume: (data) => api.post('/ai/enhance-resume', data),
  suggestSkills: (data) => api.post('/ai/suggest-skills', data),
  matchJobDescription: (data) => api.post('/ai/match-job', data),
  generateJobDescription: (data) => api.post('/ai/generate-job-description', data),
};

export default api;