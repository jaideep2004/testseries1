import React, { useState, useEffect, useRef } from "react";
import {
	Box,
	Paper,
	List,
	ListItem,
	ListItemText,
	CircularProgress,
	Alert,
	Typography,
	styled,
	Fade,
	Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { KeyboardArrowRight } from "@mui/icons-material";
import api from "../../utils/api";
import { createUniqueSlug } from "../../utils/helpers";

const HOVER_DELAY = 100;

const StyledButton = styled(Button)(({ theme }) => ({
	textTransform: "none",
	fontWeight: 500,
	color: "#333",
	"&:hover": {
		color: "#6366F1",
		backgroundColor: "transparent",
	},
}));

const MenuWrapper = styled(Box)(({ theme }) => ({
	position: "relative",
	"&:hover": {
		"& .mega-menu": {
			display: "block",
			opacity: 1,
		},
	},
}));

const MegaMenuContainer = styled(Paper)(({ theme }) => ({
	position: "absolute",
	left: "50%",
	transform: "translateX(-50%)",
	top: "100%",
	width: "900px",
	maxHeight: "600px",
	display: "none",
	opacity: 0,
	transition: "opacity 0.3s ease-in-out",
	boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
	borderRadius: "12px",
	overflow: "hidden",
	zIndex: 1300,
	marginTop: "1rem",
	"&.visible": {
		display: "block",
		opacity: 1,
	},
}));

// New styled component for the scrollable list container
const ScrollableListContainer = styled(Box)(({ theme }) => ({
	height: "calc(600px - 53px)", // Subtract header height
	overflowY: "auto",
	"&::-webkit-scrollbar": {
		width: "6px",
	},
	"&::-webkit-scrollbar-track": {
		background: "#f1f1f1",
	},
	"&::-webkit-scrollbar-thumb": {
		background: "#c1c1c1",
		borderRadius: "3px",
	},
	"&::-webkit-scrollbar-thumb:hover": {
		background: "#a8a8a8",
	},
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
	borderLeft: "3px solid transparent",
	transition: "all 0.2s ease-in-out",
	"&:hover": {
		backgroundColor: "#F3F4F6",
		borderLeft: "3px solid #6366F1",
		"& .MuiListItemText-primary": {
			color: "#6366F1",
		},
	},
	"&.Mui-selected": {
		backgroundColor: "#F3F4F6",
		borderLeft: "3px solid #6366F1",
		"& .MuiListItemText-primary": {
			color: "#6366F1",
			fontWeight: 500,
		},
	},
}));

const CategoryHeader = styled(Typography)(({ theme }) => ({
	padding: "16px",
	borderBottom: "1px solid #E5E7EB",
	fontWeight: 600,
	backgroundColor: "#F9FAFB",
	position: "sticky",
	top: 0,
	zIndex: 1,
}));

const MegaMenu = () => {
	const [classes, setClasses] = useState([]);
	const [semesters, setSemesters] = useState([]);
	const [subjects, setSubjects] = useState([]);
	const [contents, setContents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedClass, setSelectedClass] = useState(null);
	const [selectedSemester, setSelectedSemester] = useState(null);
	const [selectedSubject, setSelectedSubject] = useState(null);
	const navigate = useNavigate();
	const menuRef = useRef(null);
	const timeoutRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const fetchClasses = async () => {
			try {
				const response = await api.get("/admin/classes");
				setClasses(response.data);
				setError(null);
			} catch (error) {
				setError("Failed to load classes");
			} finally {
				setLoading(false);
			}
		};

		fetchClasses();
	}, []);

	useEffect(() => {
		if (selectedClass) {
			const fetchSemesters = async () => {
				try {
					const response = await api.get(
						`/admin/semesters?classId=${selectedClass}`
					);
					setSemesters(response.data);
				} catch (error) {
					console.error("Error fetching semesters:", error);
				}
			};
			fetchSemesters();
		}
	}, [selectedClass]);

	useEffect(() => {
		if (selectedSemester) {
			const fetchSubjects = async () => {
				try {
					const response = await api.get(
						`/admin/subjects?semesterId=${selectedSemester}`
					);
					setSubjects(response.data);
				} catch (error) {
					console.error("Error fetching subjects:", error);
				}
			};
			fetchSubjects();
		}
	}, [selectedSemester]);

	useEffect(() => {
		if (selectedSubject) {
			const fetchContents = async () => {
				try {
					const response = await api.get(
						`/content?subjectId=${selectedSubject}`
					);
					setContents(response.data.contents);
				} catch (error) {
					console.error("Error fetching contents:", error);
				}
			};
			fetchContents();
		}
	}, [selectedSubject]);

	const handleMouseEnter = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => setIsVisible(true), HOVER_DELAY);
	};

	const handleMouseLeave = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => setIsVisible(false), HOVER_DELAY);
	};

	const handleContentSelect = (content) => {
		const slug = createUniqueSlug(content.title, content._id);
		navigate(`/course/${slug}`);
	};

	return (
		<MenuWrapper
			ref={menuRef}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<StyledButton sx={{fontFamily:"Poppins !important"}}>Courses</StyledButton>
			<MegaMenuContainer className={isVisible ? "visible" : ""}>
				<Box display='flex' height='100%'>
					{loading ? (
						<Box
							display='flex'
							justifyContent='center'
							alignItems='center'
							p={3}
							width='100%'>
							<CircularProgress sx={{ color: "#6366F1" }} />
						</Box>
					) : error ? (
						<Box p={3} width='100%'>
							<Alert severity='error'>{error}</Alert>
						</Box>
					) : (
						<Fade in timeout={300}>
							<Box display='flex' width='100%'>
								<Box
									width='225px'
									bgcolor='#F9FAFB'
									borderRight='1px solid #E5E7EB'
									display='flex'
									flexDirection='column'>
									<CategoryHeader variant='subtitle1'>Classes</CategoryHeader>
									<ScrollableListContainer>
										<List disablePadding>
											{classes.map((classItem) => (
												<StyledListItem
													button
													key={classItem._id}
													onClick={() => {
														setSelectedClass(classItem._id);
														setSelectedSemester(null);
														setSelectedSubject(null);
													}}
													selected={selectedClass === classItem._id}
													
												
												>
													<ListItemText primary={classItem.name}
													sx={{fontFamily:"Poppins !important",fontSize:"17px",color:"black"}}
													/>
													<KeyboardArrowRight sx={{ color: "#6366F1" }} />
												</StyledListItem>
											))}
										</List>
									</ScrollableListContainer>
								</Box>

								{selectedClass && (
									<Box
										width='225px'
										borderRight='1px solid #E5E7EB'
										display='flex'
										flexDirection='column'>
										<CategoryHeader variant='subtitle1'>
											Semesters
										</CategoryHeader>
										<ScrollableListContainer>
											<List disablePadding>
												{semesters.map((semester) => (
													<StyledListItem
														button
														key={semester._id}
														onClick={() => {
															setSelectedSemester(semester._id);
															setSelectedSubject(null);
														}}
														selected={selectedSemester === semester._id}>
														<ListItemText primary={semester.name} />
														<KeyboardArrowRight sx={{ color: "#6366F1" }} />
													</StyledListItem>
												))}
											</List>
										</ScrollableListContainer>
									</Box>
								)}

								{selectedSemester && (
									<Box
										width='225px'
										borderRight='1px solid #E5E7EB'
										display='flex'
										flexDirection='column'>
										<CategoryHeader variant='subtitle1'>
											Subjects
										</CategoryHeader>
										<ScrollableListContainer>
											<List disablePadding>
												{subjects.map((subject) => (
													<StyledListItem
														button
														key={subject._id}
														onClick={() => setSelectedSubject(subject._id)}
														selected={selectedSubject === subject._id}>
														<ListItemText primary={subject.name} />
														<KeyboardArrowRight sx={{ color: "#6366F1" }} />
													</StyledListItem>
												))}
											</List>
										</ScrollableListContainer>
									</Box>
								)}

								{selectedSubject && (
									<Box width='225px' display='flex' flexDirection='column'>
										<CategoryHeader variant='subtitle1'>
											Contents
										</CategoryHeader>
										<ScrollableListContainer>
											<List disablePadding>
												{contents.map((content) => (
													<StyledListItem
														button
														key={content._id}
														onClick={() => handleContentSelect(content)}>
														<ListItemText
															primary={content.title}
															secondary={content.type}
														/>
													</StyledListItem>
												))}
											</List>
										</ScrollableListContainer>
									</Box>
								)}
							</Box>
						</Fade>
					)}
				</Box>
			</MegaMenuContainer>
		</MenuWrapper>
	);
};

export default MegaMenu;
