//src/admin/ContentUpload.jsx

import React, { useState, useEffect } from "react";
import {
	Paper,
	TextField,
	Button,
	Typography,
	Box,
	MenuItem,
	Alert,
	CircularProgress,
	FormControlLabel,
	Checkbox,
	Grid,
	Tab,
	Tabs,
} from "@mui/material";
import api from "../../utils/api";

// TabPanel component for managing tab content
function TabPanel({ children, value, index, ...other }) {
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`tabpanel-${index}`}
			{...other}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

const ContentManagement = () => {
	const [tabValue, setTabValue] = useState(0);
	const [contentFormData, setContentFormData] = useState({
		title: "",
		description: "",
		type: "",
		subjectId: "",
		semesterId: "", // Added semesterId
		classId: "",
		price: 0,
		isFree: false,
		tags: "",
		duration: 0,
	});

	const [projectFormData, setProjectFormData] = useState({
		title: "",
		description: "",
		subjectId: "",
		classId: "",
		price: 0,
		isFree: false,
		difficulty: "",
		technologies: "",
		tags: "",
	});

	const [classFormData, setClassFormData] = useState({
		name: "",
		description: "",
		order: 0,
	});
	const [semesters, setSemesters] = useState([]);
	const [filteredSemesters, setFilteredSemesters] = useState([]);
	const [filteredSubjects, setFilteredSubjects] = useState([]);

	const [subjectFormData, setSubjectFormData] = useState({
		name: "",
		description: "",
		classId: "",
		semesterId: "", // Add this new field
		order: 0,
	});

	const [classes, setClasses] = useState([]);
	const [subjects, setSubjects] = useState([]);

	const [files, setFiles] = useState({
		file: null,
		thumbnail: null,
		classImage: null,
		subjectIcon: null,
		projectFile: null,
		projectThumbnail: null,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const contentTypes = [
		"MCQs",
		"Previous Year",
		"PDF Notes",
		"Video Lectures",
		"Practice Tests",
	];

	const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

	useEffect(() => {
		fetchClassesAndSubjects();
	}, []);

	const fetchClassesAndSubjects = async () => {
		try {
			const [classesResponse, subjectsResponse, semestersResponse] =
				await Promise.all([
					api.get("/admin/classes"),
					api.get("/admin/subjects"),
					api.get("/admin/semesters"),
				]);

			const classesData = classesResponse.data;
			const semestersData = semestersResponse.data;

			// console.log("Fetched Classes:", classesData);
			// console.log("Fetched Semesters:", semestersData);

			setClasses(classesData);
			setSemesters(
				semestersData.map((semester) => ({
					...semester,
					classId: semester.classId._id || semester.classId,
				}))
			);
			setSubjects(subjectsResponse.data);
		} catch (err) {
			setError("Error fetching data");
			console.error("Fetch error:", err);
		}
	};

	// Add this effect to filter semesters when class changes
	useEffect(() => {
		if (contentFormData.classId) {
			const filtered = semesters.filter(
				(semester) => semester.classId === contentFormData.classId
			);
			// console.log("Filtered Semesters:", filtered);
			setFilteredSemesters(filtered);
			// Reset semester and subject selection when class changes
			setContentFormData((prev) => ({
				...prev,
				semesterId: "",
				subjectId: "",
			}));
		}
	}, [contentFormData.classId, semesters]);

	// Add this effect to filter subjects when semester changes
	useEffect(() => {
		if (contentFormData.semesterId) {
			// console.log("Current semesterId:", contentFormData.semesterId);
			// console.log("All subjects:", subjects);

			const filtered = subjects.filter((subject) => {
				// Compare with the _id of the populated semesterId object
				return subject.semesterId._id === contentFormData.semesterId;
			});

			// console.log("Filtered Subjects:", filtered);
			setFilteredSubjects(filtered);
			setContentFormData((prev) => ({
				...prev,
				subjectId: "",
			}));
		}
	}, [contentFormData.semesterId, subjects]);

	// Update subject form filtered semesters
	useEffect(() => {
		if (subjectFormData.classId) {
			const filtered = semesters.filter(
				(semester) => semester.classId === subjectFormData.classId
			);
			setFilteredSemesters(filtered);
			setSubjectFormData((prev) => ({
				...prev,
				semesterId: "",
			}));
		}
	}, [subjectFormData.classId, semesters]);

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
		setError("");
		setSuccess("");
	};

	const handleContentChange = (e) => {
		const { name, value, checked, type } = e.target;
		setContentFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));

		// If semester is changed, fetch subjects for that semester
		if (name === "semesterId" && value) {
			api
				.get(`/admin/subjects?semesterId=${value}`)
				.then((response) => {
					// console.log("Fetched subjects for semester:", response.data);
					setSubjects(response.data);
				})
				.catch((error) => {
					console.error("Error fetching subjects:", error);
					setError("Error fetching subjects");
				});
		}

		if (name === "classId" || name === "semesterId") {
			setContentFormData((prev) => ({
				...prev,
				subjectId: "",
			}));
		}
	};

	const handleClassChange = (e) => {
		const { name, value } = e.target;
		setClassFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubjectChange = (e) => {
		const { name, value } = e.target;
		setSubjectFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFileChange = (e) => {
		const { name, files } = e.target;
		setFiles((prev) => ({
			...prev,
			[name]: files[0],
		}));
	};

	const handleContentSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess("");

		const formDataToSend = new FormData();

		// Ensure semesterId is a single value, not an array
		const contentData = {
			...contentFormData,
			// If semesterId is an array, take the first value
			semesterId: Array.isArray(contentFormData.semesterId)
				? contentFormData.semesterId[0]
				: contentFormData.semesterId,
		};

		// Add all form fields to FormData
		Object.keys(contentData).forEach((key) => {
			if (contentData[key] !== "") {
				formDataToSend.append(key, contentData[key]);
			}
		});

		if (files.file) formDataToSend.append("file", files.file);
		if (files.thumbnail) formDataToSend.append("thumbnail", files.thumbnail);

		try {
			const response = await api.post("/content", formDataToSend, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			console.log("Upload response:", response.data);
			setSuccess("Content uploaded successfully!");
			setContentFormData({
				title: "",
				description: "",
				type: "",
				subjectId: "",
				classId: "",
				semesterId: "",
				price: 0,
				isFree: false,
				tags: "",
				duration: 0,
			});
			setFiles((prev) => ({ ...prev, file: null, thumbnail: null }));
		} catch (err) {
			console.error("Upload error:", err.response?.data);
			setError(err.response?.data?.message || "Error uploading content");
		} finally {
			setLoading(false);
		}
	};

	const handleClassSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess("");

		const formDataToSend = new FormData();
		Object.keys(classFormData).forEach((key) => {
			formDataToSend.append(key, classFormData[key]);
		});
		if (files.classImage) formDataToSend.append("image", files.classImage);

		try {
			await api.post("/admin/classes", formDataToSend, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			setSuccess("Class added successfully!");
			setClassFormData({ name: "", description: "", order: 0 });
			setFiles((prev) => ({ ...prev, classImage: null }));
			fetchClassesAndSubjects();
		} catch (err) {
			setError(err.response?.data?.message || "Error adding class");
		} finally {
			setLoading(false);
		}
	};

	const handleSubjectSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess("");

		const formDataToSend = new FormData();
		Object.keys(subjectFormData).forEach((key) => {
			formDataToSend.append(key, subjectFormData[key]);
		});
		if (files.subjectIcon) formDataToSend.append("icon", files.subjectIcon);

		try {
			await api.post("/admin/subjects", formDataToSend, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			setSuccess("Subject added successfully!");
			setSubjectFormData({
				name: "",
				description: "",
				classId: "",
				semesterId: "", // Clear semester ID too
				order: 0,
			});
			setFiles((prev) => ({ ...prev, subjectIcon: null }));
			fetchClassesAndSubjects();
		} catch (err) {
			setError(err.response?.data?.message || "Error adding subject");
		} finally {
			setLoading(false);
		}
	};

	const handleProjectChange = (e) => {
		const { name, value, checked, type } = e.target;
		setProjectFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleProjectSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess("");

		const formDataToSend = new FormData();

		Object.keys(projectFormData).forEach((key) => {
			if (projectFormData[key] !== "") {
				formDataToSend.append(key, projectFormData[key]);
			}
		});

		if (files.projectFile) formDataToSend.append("file", files.projectFile);
		if (files.projectThumbnail)
			formDataToSend.append("thumbnail", files.projectThumbnail);

		try {
			await api.post("/projects", formDataToSend, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			setSuccess("Project uploaded successfully!");
			setProjectFormData({
				title: "",
				description: "",
				subjectId: "",
				classId: "",
				price: 0,
				isFree: false,
				difficulty: "",
				technologies: "",
				tags: "",
			});
			setFiles((prev) => ({
				...prev,
				projectFile: null,
				projectThumbnail: null,
			}));
		} catch (err) {
			setError(err.response?.data?.message || "Error uploading project");
		} finally {
			setLoading(false);
		}
	};

	const [semesterFormData, setSemesterFormData] = useState({
		name: "",
		description: "",
		classId: "",
		order: 0,
	});

	const handleSemesterChange = (e) => {
		const { name, value } = e.target;
		setSemesterFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSemesterSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess("");

		try {
			await api.post("/admin/semesters", semesterFormData);
			setSuccess("Semester added successfully!");
			setSemesterFormData({ name: "", description: "", classId: "", order: 0 });
			fetchClassesAndSubjects();
		} catch (err) {
			setError(err.response?.data?.message || "Error adding semester");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Paper elevation={3} sx={{ p: 4 }}>
			<Tabs value={tabValue} onChange={handleTabChange} centered>
				<Tab label='Upload Content' />
				<Tab label='Add Class' />
				<Tab label='Add Semester' />
				<Tab label='Add Subject' />
				<Tab label='Upload Project' />
			</Tabs>

			{error && (
				<Alert severity='error' sx={{ mt: 2, mb: 2 }}>
					{error}
				</Alert>
			)}
			{success && (
				<Alert severity='success' sx={{ mt: 2, mb: 2 }}>
					{success}
				</Alert>
			)}

			<TabPanel value={tabValue} index={0}>
				<Box component='form' onSubmit={handleContentSubmit}>
					<Grid container spacing={2}>
						{/* Content form fields */}
						<Grid item xs={12}>
							<TextField
								fullWidth
								label='Title'
								name='title'
								value={contentFormData.title}
								onChange={handleContentChange}
								required
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								fullWidth
								label='Description'
								name='description'
								value={contentFormData.description}
								onChange={handleContentChange}
								multiline
								rows={4}
								required
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								select
								label='Type'
								name='type'
								value={contentFormData.type}
								onChange={handleContentChange}
								required>
								{contentTypes.map((option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
							</TextField>
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								select
								label='Class'
								name='classId'
								value={contentFormData.classId}
								onChange={handleContentChange}
								required>
								{classes.map((cls) => (
									<MenuItem key={cls._id} value={cls._id}>
										{cls.name}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								fullWidth
								select
								label='Semester'
								name='semesterId'
								value={contentFormData.semesterId}
								onChange={handleContentChange}
								disabled={!contentFormData.classId}
								required>
								{filteredSemesters.map((semester) => (
									<MenuItem key={semester._id} value={semester._id}>
										{semester.name}
									</MenuItem>
								))}
							</TextField>
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								select
								label='Subject'
								name='subjectId'
								value={contentFormData.subjectId}
								onChange={handleContentChange}
								disabled={!contentFormData.semesterId}
								required>
								{filteredSubjects.map((subject) => (
									<MenuItem key={subject._id} value={subject._id}>
										{subject.name}
									</MenuItem>
								))}
							</TextField>
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label='Price'
								name='price'
								type='number'
								value={contentFormData.price}
								onChange={handleContentChange}
								disabled={contentFormData.isFree}
								required
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label='Tags (comma separated)'
								name='tags'
								value={contentFormData.tags}
								onChange={handleContentChange}
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label='Duration (minutes)'
								name='duration'
								type='number'
								value={contentFormData.duration}
								onChange={handleContentChange}
							/>
						</Grid>

						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox
										checked={contentFormData.isFree}
										onChange={handleContentChange}
										name='isFree'
									/>
								}
								label='Free Content'
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<Typography variant='subtitle2' gutterBottom>
								Main Content File
							</Typography>
							<input
								type='file'
								name='file'
								onChange={handleFileChange}
								required
								accept='.pdf,.doc,.docx,.mp4'
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<Typography variant='subtitle2' gutterBottom>
								Thumbnail Image
							</Typography>
							<input
								type='file'
								name='thumbnail'
								onChange={handleFileChange}
								accept='image/*'
							/>
						</Grid>

						<Grid item xs={12}>
							<Button
								type='submit'
								variant='contained'
								fullWidth
								disabled={loading}>
								{loading ? <CircularProgress size={24} /> : "Upload Content"}
							</Button>
						</Grid>
					</Grid>
				</Box>
			</TabPanel>

			<TabPanel value={tabValue} index={1}>
				<Box component='form' onSubmit={handleClassSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label='Class Name'
								name='name'
								value={classFormData.name}
								onChange={handleClassChange}
								required
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								fullWidth
								label='Description'
								name='description'
								value={classFormData.description}
								onChange={handleClassChange}
								multiline
								rows={4}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								fullWidth
								label='Order'
								name='order'
								type='number'
								value={classFormData.order}
								onChange={handleClassChange}
							/>
						</Grid>

						<Grid item xs={12}>
							<Typography variant='subtitle2' gutterBottom>
								Class Image
							</Typography>
							<input
								type='file'
								name='classImage'
								onChange={handleFileChange}
								accept='image/*'
							/>
						</Grid>

						<Grid item xs={12}>
							<Button
								type='submit'
								variant='contained'
								fullWidth
								disabled={loading}>
								{loading ? <CircularProgress size={24} /> : "Add Class"}
							</Button>
						</Grid>
					</Grid>
				</Box>
			</TabPanel>

			<TabPanel value={tabValue} index={2}>
				<Box component='form' onSubmit={handleSemesterSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label='Semester Name'
								name='name'
								value={semesterFormData.name}
								onChange={handleSemesterChange}
								required
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								fullWidth
								select
								label='Class'
								name='classId'
								value={semesterFormData.classId}
								onChange={handleSemesterChange}
								required>
								{classes.map((cls) => (
									<MenuItem key={cls._id} value={cls._id}>
										{cls.name}
									</MenuItem>
								))}
							</TextField>
						</Grid>

						<Grid item xs={12}>
							<TextField
								fullWidth
								label='Description'
								name='description'
								value={semesterFormData.description}
								onChange={handleSemesterChange}
								multiline
								rows={4}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								fullWidth
								label='Order'
								name='order'
								type='number'
								value={semesterFormData.order}
								onChange={handleSemesterChange}
							/>
						</Grid>

						<Grid item xs={12}>
							<Button
								type='submit'
								variant='contained'
								fullWidth
								disabled={loading}>
								{loading ? <CircularProgress size={24} /> : "Add Semester"}
							</Button>
						</Grid>
					</Grid>
				</Box>
			</TabPanel>

			<TabPanel value={tabValue} index={3}>
				<Box component='form' onSubmit={handleSubjectSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label='Subject Name'
									name='name'
									value={subjectFormData.name}
									onChange={handleSubjectChange}
									required
								/>
							</Grid>
							<TextField
								fullWidth
								select
								label='Class'
								name='classId'
								value={subjectFormData.classId}
								onChange={handleSubjectChange}
								required>
								{classes.map((cls) => (
									<MenuItem key={cls._id} value={cls._id}>
										{cls.name}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								select
								label='Semester'
								name='semesterId'
								value={subjectFormData.semesterId}
								onChange={handleSubjectChange}
								disabled={!subjectFormData.classId}
								required>
								{semesters
									.filter(
										(semester) =>
											semester.classId.toString() ===
											subjectFormData.classId.toString()
									)
									.map((semester) => (
										<MenuItem key={semester._id} value={semester._id}>
											{semester.name}
										</MenuItem>
									))}
							</TextField>
						</Grid>

						<Grid item xs={12}>
							<TextField
								fullWidth
								label='Description'
								name='description'
								value={subjectFormData.description}
								onChange={handleSubjectChange}
								multiline
								rows={4}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								fullWidth
								label='Order'
								name='order'
								type='number'
								value={subjectFormData.order}
								onChange={handleSubjectChange}
							/>
						</Grid>

						<Grid item xs={12}>
							<Typography variant='subtitle2' gutterBottom>
								Subject Icon
							</Typography>
							<input
								type='file'
								name='subjectIcon'
								onChange={handleFileChange}
								accept='image/*'
							/>
						</Grid>

						<Grid item xs={12}>
							<Button
								type='submit'
								variant='contained'
								fullWidth
								disabled={loading}>
								{loading ? <CircularProgress size={24} /> : "Add Subject"}
							</Button>
						</Grid>
					</Grid>
				</Box>
			</TabPanel>

			<TabPanel value={tabValue} index={4}>
				<Box component='form' onSubmit={handleProjectSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label='Project Title'
								name='title'
								value={projectFormData.title}
								onChange={handleProjectChange}
								required
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								fullWidth
								label='Description'
								name='description'
								value={projectFormData.description}
								onChange={handleProjectChange}
								multiline
								rows={4}
								required
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								select
								label='Class'
								name='classId'
								value={projectFormData.classId}
								onChange={handleProjectChange}
								required>
								{classes.map((cls) => (
									<MenuItem key={cls._id} value={cls._id}>
										{cls.name}
									</MenuItem>
								))}
							</TextField>
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								select
								label='Subject'
								name='subjectId'
								value={projectFormData.subjectId}
								onChange={handleProjectChange}
								required>
								{subjects.map((subject) => (
									<MenuItem key={subject._id} value={subject._id}>
										{subject.name}
									</MenuItem>
								))}
							</TextField>
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label='Price'
								name='price'
								type='number'
								value={projectFormData.price}
								onChange={handleProjectChange}
								disabled={projectFormData.isFree}
								required
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								select
								label='Difficulty'
								name='difficulty'
								value={projectFormData.difficulty}
								onChange={handleProjectChange}
								required>
								{difficultyLevels.map((level) => (
									<MenuItem key={level} value={level}>
										{level}
									</MenuItem>
								))}
							</TextField>
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label='Technologies (comma-separated)'
								name='technologies'
								value={projectFormData.technologies}
								onChange={handleProjectChange}
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label='Tags (comma-separated)'
								name='tags'
								value={projectFormData.tags}
								onChange={handleProjectChange}
							/>
						</Grid>

						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox
										checked={projectFormData.isFree}
										onChange={handleProjectChange}
										name='isFree'
									/>
								}
								label='Free Project'
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<Typography variant='subtitle2' gutterBottom>
								Project File
							</Typography>
							<input
								type='file'
								name='projectFile'
								onChange={(e) => {
									const file = e.target.files[0];
									console.log("Selected File:", file);
									console.log("File Type:", file.type);
									setFiles((prev) => ({ ...prev, projectFile: file }));
								}}
								required
								accept='.zip,.rar,.7z'
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<Typography variant='subtitle2' gutterBottom>
								Project Thumbnail
							</Typography>
							<input
								type='file'
								name='projectThumbnail'
								onChange={(e) =>
									setFiles((prev) => ({
										...prev,
										projectThumbnail: e.target.files[0],
									}))
								}
								accept='image/*'
							/>
						</Grid>

						<Grid item xs={12}>
							<Button
								type='submit'
								variant='contained'
								fullWidth
								disabled={loading}>
								{loading ? <CircularProgress size={24} /> : "Upload Project"}
							</Button>
						</Grid>
					</Grid>
				</Box>
			</TabPanel>
		</Paper>
	);
};

export default ContentManagement;
