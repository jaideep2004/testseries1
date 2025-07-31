import axios from "axios";

// const API_URL = "http://localhost:7000/api";
const API_URL = "https://195-35-45-82.sslip.io:7000/api";

// Cloud storage configuration - replace with your actual cloud storage details
const CLOUD_STORAGE_URL = "https://storage.googleapis.com/your-bucket-name";
const CLOUD_STORAGE_API = "https://your-cloud-storage-api-endpoint.com";

const api = axios.create({
	baseURL: API_URL,
	timeout: 60000, // Increase default timeout to 60 seconds
});

// Request interceptor for adding auth token
api.interceptors.request.use(
	(config) => {
		const userToken = sessionStorage.getItem("userToken");
		const adminToken = sessionStorage.getItem("adminToken");
		const token = userToken || adminToken;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		// Increase timeout for download requests
		if (config.responseType === "blob") {
			config.timeout = 120000; // 2 minutes for downloads
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

				try {
					const errorData = JSON.parse(text);
					error.response.data = errorData;
				} catch (parseError) {
					// If not valid JSON, use the text as error message
					error.response.data = {
						message: text || "Download failed. Please try again.",
					};
				}
			} catch (e) {
				console.error("Error parsing blob error response:", e);
				error.response.data = { message: "Download failed. Please try again." };
			}
		}

		// Handle timeout errors with a clearer message
		if (error.code === "ECONNABORTED") {
			error.message =
				"Request timed out. The file might be too large or the server is busy. Please try again later.";
		}

		return Promise.reject(error);
	}
);

/**
 * Downloads a file from the server or cloud storage
 * @param {string} url - The URL of the file to download
 * @param {string} filename - The name to save the file as
 * @param {string} fileType - The content type of the file (optional)
 * @returns {Promise<boolean>} - True if download was successful
 */
export const downloadFile = async (url, filename, fileType = null) => {
	try {
		// Handle Google Drive links
		if (url.includes("drive.google.com")) {
			// Determine file extension based on fileType
			let fileExtension = ".pdf";
			if (fileType) {
				if (fileType.includes("video") || fileType.includes("mp4")) {
					fileExtension = ".mp4";
				} else if (fileType.includes("pdf")) {
					fileExtension = ".pdf";
				} else if (fileType.includes("jpeg") || fileType.includes("jpg")) {
					fileExtension = ".jpg";
				} else if (fileType.includes("png")) {
					fileExtension = ".png";
				}
			}

			// Clean filename and add extension
			const baseFilename = filename.includes(".")
				? filename.substring(0, filename.lastIndexOf("."))
				: filename;
			const finalFilename =
				baseFilename.replace(/[^a-zA-Z0-9._-]/g, "_") + fileExtension;

			// Convert view URL to direct download URL if needed
			let downloadUrl = url;
			if (downloadUrl.includes("/view")) {
				downloadUrl = downloadUrl.replace("/view", "/export?format=pdf");
			}
			if (
				!downloadUrl.includes("export=download") &&
				!downloadUrl.includes("export?format=")
			) {
				// Add export=download parameter if it doesn't exist
				downloadUrl = downloadUrl.includes("?")
					? `${downloadUrl}&export=download`
					: `${downloadUrl}?export=download`;
			}

			// Create a temporary link to force download with correct filename
			const link = document.createElement("a");
			link.href = downloadUrl;
			link.setAttribute("download", finalFilename);
			link.setAttribute("target", "_blank");
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			return true;
		}

		// Check if URL is a cloud storage URL or a relative path
		const isCloudUrl =
			url.includes("storage.googleapis.com") ||
			url.includes("amazonaws.com") ||
			url.includes("cloudinary.com");

		let response;
		if (isCloudUrl) {
			// Direct download from cloud storage
			response = await axios.get(url, {
				responseType: "blob",
				timeout: 120000, // 2 minutes timeout for downloads
			});
		} else {
			// Download via our API
			response = await api.get(url, {
				responseType: "blob",
				timeout: 120000, // 2 minutes timeout for downloads
			});
		}

		// Check if the response is actually a blob and has content
		if (response.data.size === 0) {
			throw new Error("Downloaded file is empty. Please try again.");
		}

		// Determine content type and file extension
		let contentType =
			response.headers["content-type"] ||
			fileType ||
			"application/octet-stream";
		let fileExtension = ".pdf"; // Default extension

		// Set extension based on content type
		if (contentType.includes("pdf")) {
			fileExtension = ".pdf";
		} else if (contentType.includes("video") || contentType.includes("mp4")) {
			fileExtension = ".mp4";
		} else if (contentType.includes("jpeg") || contentType.includes("jpg")) {
			fileExtension = ".jpg";
		} else if (contentType.includes("png")) {
			fileExtension = ".png";
		}

		// Ensure filename has the correct extension
		const baseFilename = filename.includes(".")
			? filename.substring(0, filename.lastIndexOf("."))
			: filename;
		const finalFilename = baseFilename + fileExtension;

		// Create a blob with the correct content type
		const blob = new Blob([response.data], { type: contentType });
		const downloadUrl = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = downloadUrl;
		link.download = finalFilename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		window.URL.revokeObjectURL(downloadUrl);
		return true;
	} catch (error) {
		console.error("Download error:", error);
		throw error;
	}
};

/**
 * Uploads a file to cloud storage
 * @param {File} file - The file to upload
 * @param {string} contentType - The content type of the file
 * @returns {Promise<string>} - The URL of the uploaded file
 */
export const uploadToCloudStorage = async (
	file,
	contentType = "application/pdf"
) => {
	try {
		// First get a signed URL from our backend
		const { data } = await api.post("/storage/get-upload-url", {
			fileName: file.name,
			contentType,
		});

		// Upload the file directly to cloud storage using the signed URL
		await axios.put(data.signedUrl, file, {
			headers: {
				"Content-Type": contentType,
			},
			onUploadProgress: (progressEvent) => {
				const percentCompleted = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total
				);
				console.log(`Upload progress: ${percentCompleted}%`);
			},
		});

		// Return the public URL of the file
		return data.publicUrl;
	} catch (error) {
		console.error("Upload error:", error);
		throw new Error(
			"Failed to upload file to cloud storage. Please try again."
		);
	}
};

export default api;
