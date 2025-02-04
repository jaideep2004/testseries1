import React, { useState, useEffect } from "react";
import {
	Box,
	Paper,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	IconButton,
	Alert,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	InputAdornment,
	TablePagination,
	Chip,
	Tabs,
	Tab,
	Select,
	MenuItem,
} from "@mui/material";
import { Delete, Search, Warning } from "@mui/icons-material";
import api from "../../utils/api";

const ManageContent = () => {
	const [activeTab, setActiveTab] = useState("classes");
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [selectedClass, setSelectedClass] = useState("");
	const [selectedSemester, setSelectedSemester] = useState("");
	const [classes, setClasses] = useState([]);
	const [semesters, setSemesters] = useState([]);

	useEffect(() => {
		fetchItems();
		if (activeTab !== "classes") {
			fetchClasses();
		}
		if (["subjects", "contents", "projects"].includes(activeTab)) {
			fetchSemesters();
		}
	}, [
		activeTab,
		page,
		rowsPerPage,
		searchTerm,
		selectedClass,
		selectedSemester,
	]);

	const fetchClasses = async () => {
		try {
			const { data } = await api.get("/admin/classes");
			setClasses(data);
		} catch (error) {
			console.error("Error fetching classes:", error);
		}
	};

	const fetchSemesters = async () => {
		if (!selectedClass) return;
		try {
			const { data } = await api.get("/admin/semesters", {
				params: { classId: selectedClass },
			});
			setSemesters(data);
		} catch (error) {
			console.error("Error fetching semesters:", error);
		}
	};

	const fetchItems = async () => {
		try {
			setLoading(true);
			let endpoint = "";
			let params = {
				search: searchTerm,
				limit: rowsPerPage,
				page: page + 1,
			};

			switch (activeTab) {
				case "classes":
					endpoint = "/admin/classes";
					break;
				case "semesters":
					endpoint = "/admin/semesters";
					if (selectedClass) params.classId = selectedClass;
					break;
				case "subjects":
					endpoint = "/admin/subjects";
					if (selectedClass) params.classId = selectedClass;
					if (selectedSemester) params.semesterId = selectedSemester;
					break;
				case "contents":
					endpoint = "/content";
					if (selectedClass) params.classId = selectedClass;
					if (selectedSemester) params.semesterId = selectedSemester;
					break;
				case "projects":
					endpoint = "/projects";
					if (selectedClass) params.classId = selectedClass;
					if (selectedSemester) params.semesterId = selectedSemester;
					break;
			}

			const { data } = await api.get(endpoint, { params });
			setItems(Array.isArray(data) ? data : data[activeTab] || []);
			setError(null);
		} catch (error) {
			setError(`Failed to fetch ${activeTab}`);
			console.error("Error:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteClick = (item) => {
		setSelectedItem(item);
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = async () => {
		try {
			let endpoint = "";
			switch (activeTab) {
				case "classes":
					endpoint = `/admin/classes/${selectedItem._id}`;
					break;
				case "semesters":
					endpoint = `/admin/semesters/${selectedItem._id}`;
					break;
				case "subjects":
					endpoint = `/admin/subjects/${selectedItem._id}`;
					break;
				case "contents":
					endpoint = `/content/${selectedItem._id}`;
					break;
				case "projects":
					endpoint = `/projects/${selectedItem._id}`;
					break;
			}

			await api.delete(endpoint);
			setDeleteDialogOpen(false);
			setSelectedItem(null);

			// Refresh data
			fetchItems();
			if (activeTab !== "classes") {
				fetchClasses();
			}
			if (["subjects", "contents", "projects"].includes(activeTab)) {
				fetchSemesters();
			}
		} catch (error) {
			setError(`Failed to delete ${activeTab.slice(0, -1)}`);
			console.error("Error:", error);
		}
	};

	const renderTableHeaders = () => {
		const headers = {
			classes: ["Name", "Description", "Semester Count", "Actions"],
			semesters: ["Name", "Class", "Description", "Actions"],
			subjects: ["Name", "Class", "Semester", "Description", "Actions"],
			contents: [
				"Title",
				"Type",
				"Class",
				"Subject",
				"Price",
				"Downloads",
				"Actions",
			],
			projects: [
				"Title",
				"Difficulty",
				"Class",
				"Subject",
				"Price",
				"Downloads",
				"Actions",
			],
		};

		return headers[activeTab].map((header) => (
			<TableCell key={header}>{header}</TableCell>
		));
	};

	const renderTableRow = (item) => {
		switch (activeTab) {
			case "classes":
				return (
					<>
						<TableCell>{item.name}</TableCell>
						<TableCell>{item.description}</TableCell>
						<TableCell>{item.semesterCount}</TableCell>
					</>
				);
			case "semesters":
				return (
					<>
						<TableCell>{item.name}</TableCell>
						<TableCell>{item.classId?.name}</TableCell>
						<TableCell>{item.description}</TableCell>
					</>
				);
			case "subjects":
				return (
					<>
						<TableCell>{item.name}</TableCell>
						<TableCell>{item.classId?.name}</TableCell>
						<TableCell>{item.semesterId?.name}</TableCell>
						<TableCell>{item.description}</TableCell>
					</>
				);
			case "contents":
				return (
					<>
						<TableCell>{item.title}</TableCell>
						<TableCell>{item.type}</TableCell>
						<TableCell>{item.classId?.name}</TableCell>
						<TableCell>{item.subjectId?.name}</TableCell>
						<TableCell>
							{item.isFree ? (
								<Chip label='Free' color='success' size='small' />
							) : (
								`₹${item.price}`
							)}
						</TableCell>
						<TableCell>{item.downloads}</TableCell>
					</>
				);
			case "projects":
				return (
					<>
						<TableCell>{item.title}</TableCell>
						<TableCell>{item.difficulty}</TableCell>
						<TableCell>{item.classId?.name}</TableCell>
						<TableCell>{item.subjectId?.name}</TableCell>
						<TableCell>
							{item.isFree ? (
								<Chip label='Free' color='success' size='small' />
							) : (
								`₹${item.price}`
							)}
						</TableCell>
						<TableCell>{item.downloads}</TableCell>
					</>
				);
			default:
				return null;
		}
	};

	return (
		<Box p={3}>
			<Typography variant='h4' gutterBottom>
				Manage Content
			</Typography>

			{error && (
				<Alert severity='error' sx={{ mb: 2 }}>
					{error}
				</Alert>
			)}

			<Tabs
				value={activeTab}
				onChange={(e, newValue) => {
					setActiveTab(newValue);
					setPage(0);
					setSearchTerm("");
					setSelectedClass("");
					setSelectedSemester("");
				}}
				sx={{ mb: 2 }}>
				<Tab label='Classes' value='classes' />
				<Tab label='Semesters' value='semesters' />
				<Tab label='Subjects' value='subjects' />
				<Tab label='Contents' value='contents' />
				<Tab label='Projects' value='projects' />
			</Tabs>

			<Paper sx={{ mb: 2, p: 2 }}>
				<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
					{activeTab !== "classes" && (
						<Select
							value={selectedClass}
							onChange={(e) => {
								setSelectedClass(e.target.value);
								setSelectedSemester("");
							}}
							displayEmpty
							sx={{ minWidth: 200 }}>
							<MenuItem value=''>All Classes</MenuItem>
							{classes.map((cls) => (
								<MenuItem key={cls._id} value={cls._id}>
									{cls.name}
								</MenuItem>
							))}
						</Select>
					)}

					{["subjects", "contents", "projects"].includes(activeTab) &&
						selectedClass && (
							<Select
								value={selectedSemester}
								onChange={(e) => setSelectedSemester(e.target.value)}
								displayEmpty
								sx={{ minWidth: 200 }}>
								<MenuItem value=''>All Semesters</MenuItem>
								{semesters.map((semester) => (
									<MenuItem key={semester._id} value={semester._id}>
										{semester.name}
									</MenuItem>
								))}
							</Select>
						)}

					<TextField
						fullWidth
						variant='outlined'
						placeholder={`Search ${activeTab}...`}
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Search />
								</InputAdornment>
							),
						}}
					/>
				</Box>

				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>{renderTableHeaders()}</TableRow>
						</TableHead>
						<TableBody>
							{items.map((item) => (
								<TableRow key={item._id} hover>
									{renderTableRow(item)}
									<TableCell>
										<IconButton
											color='error'
											onClick={() => handleDeleteClick(item)}>
											<Delete />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

				<TablePagination
					component='div'
					count={-1}
					page={page}
					onPageChange={(e, newPage) => setPage(newPage)}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={(e) => {
						setRowsPerPage(parseInt(e.target.value, 10));
						setPage(0);
					}}
					rowsPerPageOptions={[5, 10, 25]}
				/>
			</Paper>

			<Dialog
				open={deleteDialogOpen}
				onClose={() => setDeleteDialogOpen(false)}>
				<DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<Warning color='warning' />
					Confirm Deletion
				</DialogTitle>
				<DialogContent>
					{activeTab === "classes" && (
						<Typography color='error' paragraph>
							Warning: Deleting a class will also delete all associated
							semesters, subjects, contents, and projects.
						</Typography>
					)}
					{activeTab === "semesters" && (
						<Typography color='error' paragraph>
							Warning: Deleting a semester will also delete all associated
							subjects, contents, and projects.
						</Typography>
					)}
					{activeTab === "subjects" && (
						<Typography color='error' paragraph>
							Warning: Deleting a subject will also delete all associated
							contents and projects.
						</Typography>
					)}
					Are you sure you want to delete "
					{selectedItem?.name || selectedItem?.title}"? This action cannot be
					undone.
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
					<Button
						onClick={handleDeleteConfirm}
						color='error'
						variant='contained'>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default ManageContent;
