// // src/utils/api.js
// import axios from "axios";

// // const API_URL = "http://localhost:5000/api";
// const API_URL = "https://testbackend2-5loz.onrender.com/api";

// const api = axios.create({
// 	baseURL: API_URL,
// });

// // Request interceptor for adding auth token
// api.interceptors.request.use(
// 	(config) => {
// 		const userToken = localStorage.getItem("userToken");
// 		const adminToken = localStorage.getItem("adminToken");
// 		const token = userToken || adminToken;

// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}`;
// 		}
// 		return config;
// 	},
// 	(error) => Promise.reject(error)
// );

// export default api;

import axios from "axios";

const API_URL = "http://localhost:5000/api";
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

// Ping configuration
const PING_CONFIG = {
    interval: 15 * 60 * 1000, // 15 minutes in milliseconds
    activeHours: {
        start: 8,  // 8 AM
        end: 20    // 8 PM
    },
    // Set to true to only run on weekdays
    weekdaysOnly: true
};

// Function to check if we should ping based on current time
const shouldPing = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 is Sunday, 6 is Saturday
    
    // Check if within active hours
    const isActiveHour = hour >= PING_CONFIG.activeHours.start && 
                        hour < PING_CONFIG.activeHours.end;
    
    // Check if it's a weekday (Monday-Friday)
    const isWeekday = day >= 1 && day <= 5;
    
    return PING_CONFIG.weekdaysOnly ? (isActiveHour && isWeekday) : isActiveHour;
};

// Function to ping the server
const pingServer = async () => {
    if (!shouldPing()) {
        console.log("Outside active hours, skipping ping:", new Date().toLocaleString());
        return;
    }

    try {
        await axios.get("https://testbackend2-5loz.onrender.com/");
        console.log("Ping successful:", new Date().toLocaleString());
    } catch (error) {
        console.error("Ping failed:", error);
    }
};

// Set up periodic pinging
setInterval(pingServer, PING_CONFIG.interval);

// Initial ping when the application starts (only if within active hours)
if (shouldPing()) {
    pingServer();
}

export default api;