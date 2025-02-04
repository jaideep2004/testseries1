// // // //src/common/MegaMenu.jsx

import React, { useState, useEffect } from "react";
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
import { useRef } from "react";

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

	const handleContentSelect = (contentId) => {
		navigate(`/content/${contentId}`);
	};

	return (
		<MenuWrapper
			ref={menuRef}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<StyledButton>Courses</StyledButton>
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
									borderRight='1px solid #E5E7EB'>
									<CategoryHeader variant='subtitle1'>Classes</CategoryHeader>
									<List>
										{classes.map((classItem) => (
											<StyledListItem
												button
												key={classItem._id}
												onClick={() => {
													setSelectedClass(classItem._id);
													setSelectedSemester(null);
													setSelectedSubject(null);
												}}
												selected={selectedClass === classItem._id}>
												<ListItemText primary={classItem.name} />
												<KeyboardArrowRight sx={{ color: "#6366F1" }} />
											</StyledListItem>
										))}
									</List>
								</Box>

								{selectedClass && (
									<Box width='225px' borderRight='1px solid #E5E7EB'>
										<CategoryHeader variant='subtitle1'>
											Semesters
										</CategoryHeader>
										<List>
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
									</Box>
								)}

								{selectedSemester && (
									<Box width='225px' borderRight='1px solid #E5E7EB'>
										<CategoryHeader variant='subtitle1'>
											Subjects
										</CategoryHeader>
										<List>
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
									</Box>
								)}

								{selectedSubject && (
									<Box width='225px'>
										<CategoryHeader variant='subtitle1'>
											Contents
										</CategoryHeader>
										<List>
											{contents.map((content) => (
												<StyledListItem
													button
													key={content._id}
													onClick={() => handleContentSelect(content._id)}>
													<ListItemText
														primary={content.title}
														secondary={content.type}
													/>
												</StyledListItem>
											))}
										</List>
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
