// src/utils/api.js
import axios from "axios";

// const API_URL = "http://localhost:5000/api";
const API_URL = "https://new.academicassignmentmaster.co.in/api";

const api = axios.create({
	baseURL: API_URL,
});

// Request interceptor for adding auth token
api.interceptors.request.use(
	(config) => {
		const userToken = localStorage.getItem("userToken");
		const adminToken = localStorage.getItem("adminToken");
		const token = userToken || adminToken;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export default api;
