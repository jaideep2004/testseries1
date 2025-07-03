import React, { useState } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Box,
	Avatar,
	Menu,
	MenuItem,
	IconButton,
	Tooltip,
	Container,
	styled,
	useTheme,
	useMediaQuery,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListItemButton,
	Collapse,
	Divider,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
	AccountCircle,
	ExitToApp,
	Dashboard,
	Person,
	Menu as MenuIcon,
	Home,
	Info,
	School as SchoolIcon,
	Call,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import MegaMenu from "./MegaMenu";
import { useLocation } from "react-router-dom";
import { createUniqueSlug } from "../../utils/helpers";

// Keeping your existing styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
	backgroundColor: "#fff",
	boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
}));

const LogoButton = styled(Button)(({ theme }) => ({
	color: "#6366F1",
	fontSize: "1.5rem",
	fontWeight: "bold",
	textTransform: "none",
	"&:hover": {
		backgroundColor: "transparent",
	},
}));

const NavButton = styled(Button)(({ theme }) => ({
	textTransform: "none",
	fontWeight: 500,
	color: "#333",
	"&:hover": {
		color: "#6366F1",
		backgroundColor: "transparent",
	},
}));

const ActionButton = styled(Button)(({ theme }) => ({
	textTransform: "none",
	fontWeight: 500,
	borderRadius: "8px",
	padding: "8px 20px",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
	backgroundColor: "#6366F1",
	cursor: "pointer",
}));

const Header = () => {
	const location = useLocation();

	const navigate = useNavigate();
	const { user, logout, isAuthenticated } = useAuth();
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [megaMenuOpen, setMegaMenuOpen] = useState(false);
	// Use MUI's useTheme and useMediaQuery hooks for responsive design
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const [shouldScrollToAbout, setShouldScrollToAbout] = useState(false);

	// Effect to handle scrolling after navigation
	useEffect(() => {
		if (shouldScrollToAbout && location.pathname === "/") {
			const aboutSection = document.getElementById("about-us");
			if (aboutSection) {
				aboutSection.scrollIntoView({ behavior: "smooth" });
				setShouldScrollToAbout(false);
			}
		}
	}, [location.pathname, shouldScrollToAbout]);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		logout();
		handleClose();
		navigate("/");
	};

	// const scrollToAbout = () => {
	// 	const aboutSection = document.getElementById("about-us");
	// 	if (aboutSection) {
	// 		aboutSection.scrollIntoView({ behavior: "smooth" });
	// 	}
	// 	if (isMobile) setMobileMenuOpen(false);
	// };

	const scrollToAbout = () => {
		if (location.pathname === "/") {
			// If already on homepage, just scroll
			const aboutSection = document.getElementById("about-us");
			if (aboutSection) {
				aboutSection.scrollIntoView({ behavior: "smooth" });
			}
		} else {
			// If on another page, navigate to homepage first and set flag to scroll
			setShouldScrollToAbout(true);
			navigate("/");
		}

		if (isMobile) setMobileMenuOpen(false);
	};

	const MobileMegaMenu = () => {
		return (
			<>
				<ListItem>
					<ListItemButton onClick={() => setMegaMenuOpen(!megaMenuOpen)}>
						<ListItemText primary='Browse' />
						{megaMenuOpen ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
				</ListItem>
				<Collapse in={megaMenuOpen} timeout='auto' unmountOnExit>
					<List component='div' disablePadding>
						<ListItem sx={{ pl: 4 }}>
							<ListItemButton onClick={() => navigate("/browse")}>
								<ListItemText primary='Courses' />
							</ListItemButton>
						</ListItem>
						<ListItem sx={{ pl: 4 }}>
							<ListItemButton onClick={() => navigate("/browse")}>
								<ListItemText primary='Projects' />
							</ListItemButton>
						</ListItem>
					</List>
				</Collapse>
			</>
		);
	};
	const mobileMenuContent = (
		<Box
			sx={{ width: 280 }}
			role='presentation'
			onClick={(e) => {
				// Don't close menu when clicking mega menu items
				if (e.target.closest(".mega-menu-item")) {
					e.stopPropagation();
					return;
				}
				setMobileMenuOpen(false);
			}}>
			<List>
				<ListItem button onClick={() => navigate("/")}>
					<ListItemIcon>
						<Home />
					</ListItemIcon>
					<ListItemText primary='Home' />
				</ListItem>
				<MobileMegaMenu />
				<ListItem button onClick={scrollToAbout}>
					<ListItemIcon>
						<Info />
					</ListItemIcon>
					<ListItemText primary='About Us' />
				</ListItem>
				<ListItem button onClick={() => navigate("/contact")}>
					<ListItemIcon>
						<Call />
					</ListItemIcon>
					<ListItemText primary='Contact Us' />
				</ListItem>
			</List>
			<Divider />
			<List>
				{!isAuthenticated ? (
					<>
						<ListItem button onClick={() => navigate("/login")}>
							<ListItemIcon>
								<AccountCircle />
							</ListItemIcon>
							<ListItemText primary='Login' />
						</ListItem>
						<ListItem button onClick={() => navigate("/register")}>
							<ListItemIcon>
								<Person />
							</ListItemIcon>
							<ListItemText primary='Register' />
						</ListItem>
					</>
				) : (
					<>
						<ListItem
							button
							onClick={() =>
								navigate(
									user?.isAdmin ? "/admin/dashboard" : "/customer/dashboard"
								)
							}>
							<ListItemIcon>
								<Dashboard />
							</ListItemIcon>
							<ListItemText primary='Dashboard' />
						</ListItem>
						<ListItem button onClick={() => navigate("/profile")}>
							<ListItemIcon>
								<Person />
							</ListItemIcon>
							<ListItemText primary='Profile' />
						</ListItem>
						<ListItem button onClick={handleLogout}>
							<ListItemIcon>
								<ExitToApp />
							</ListItemIcon>
							<ListItemText primary='Logout' />
						</ListItem>
					</>
				)}
			</List>
		</Box>
	);

	return (
		<StyledAppBar position='sticky'>
			<Container maxWidth='lg'>
				<Toolbar sx={{ justifyContent: "space-between", padding: "0.5rem 0" }}>
					<LogoButton onClick={() => navigate("/")}>
						{isMobile ? (
							<SchoolIcon sx={{ color: "#6366F1", fontSize: "3rem" }} />
						) : (
							"Academic Assignment Master"
						)}
					</LogoButton>

					{/* Desktop Navigation */}
					{!isMobile && (
						<>
							<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
								<NavButton onClick={() => navigate("/")}>Home</NavButton>
								<MegaMenu />
								<NavButton onClick={scrollToAbout}>About Us</NavButton>
								<NavButton onClick={() => navigate("/contact")}>
									Contact Us
								</NavButton>
							</Box>

							<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
								{/* {!isAuthenticated ? ( */}
								<>
									<ActionButton
										variant='outlined'
										onClick={() => navigate("/login")}
										startIcon={<AccountCircle />}
										sx={{ borderColor: "#6366F1", color: "#6366F1" }}>
										Login
									</ActionButton>
									<ActionButton
										variant='contained'
										onClick={() => navigate("/register")}
										sx={{
											backgroundColor: "#6366F1",
											"&:hover": { backgroundColor: "#4F46E5" },
										}}>
										Register
									</ActionButton>
								</>
								{/* ) : ( */}
								<>
									<Tooltip title='Account settings'>
										<StyledAvatar onClick={handleMenu}>
											{user?.name?.charAt(0)}
										</StyledAvatar>
									</Tooltip>
									<Menu
										anchorEl={anchorEl}
										open={Boolean(anchorEl)}
										onClose={handleClose}
										PaperProps={{
											sx: {
												mt: 1,
												"& .MuiMenuItem-root": {
													px: 2,
													py: 1,
													gap: 1.5,
												},
											},
										}}>
										<MenuItem
											onClick={() => {
												handleClose();
												navigate(
													user.isAdmin
														? "/admin/dashboard"
														: "/customer/dashboard"
												);
											}}>
											<Dashboard fontSize='small' />
											Dashboard
										</MenuItem>
										<MenuItem
											onClick={() => {
												handleClose();
												navigate("/profile");
											}}>
											<Person fontSize='small' />
											Profile
										</MenuItem>
										<MenuItem onClick={handleLogout}>
											<ExitToApp fontSize='small' />
											Logout
										</MenuItem>
									</Menu>
								</>
								{/* )} */}
							</Box>
						</>
					)}

					{/* Mobile Hamburger Icon */}
					{isMobile && (
						<IconButton
							size='large'
							edge='end'
							color='inherit'
							aria-label='menu'
							onClick={() => setMobileMenuOpen(true)}
							sx={{ color: "#6366F1" }}>
							<MenuIcon />
						</IconButton>
					)}

					{/* Mobile Menu Drawer */}
					<Drawer
						anchor='right'
						open={isMobile && mobileMenuOpen}
						onClose={() => setMobileMenuOpen(false)}>
						{mobileMenuContent}
					</Drawer>
				</Toolbar>
			</Container>
		</StyledAppBar>
	);
};

export default Header;
