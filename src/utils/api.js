import axios from "axios";

// const API_URL = "http://localhost:10000/api";

const API_URL = "http://195.35.45.82:10000/api";

// const API_URL = "https://testbackend2-5loz.onrender.com/api";

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

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		// Handle download errors specifically
		if (error.config.responseType === "blob" && error.response?.data) {
			try {
				const text = await new Promise((resolve) => {
					const reader = new FileReader();
					reader.onload = () => resolve(reader.result);
					reader.readAsText(error.response.data);
				});

				const errorData = JSON.parse(text);
				error.response.data = errorData;
			} catch (e) {
				console.error("Error parsing blob error response:", e);
			}
		}
		return Promise.reject(error);
	}
);

export const downloadFile = async (url, filename) => {
	try {
		const response = await api.get(url, {
			responseType: "blob",
			timeout: 30000,
		});

		const blob = new Blob([response.data]);
		const downloadUrl = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = downloadUrl;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		link.remove();
		window.URL.revokeObjectURL(downloadUrl);
	} catch (error) {
		throw error;
	}
};

export default api;
