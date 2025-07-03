// routes/index.jsx

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";

import Home from "../pages/Home";
import CourseCategory from "../pages/CourseCategory";
import ContentDetails from "../pages/ContentDetails";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard";

import AdminLogin from "../components/auth/AdminLogin";
import Register from "../components/auth/Register";

import ContentUpload from "../components/admin/ContentUpload";
import ContentList from "../components/admin/ContentList";
import Stats from "../components/admin/Stats";
import ManageUsers from "../components/admin/ManageUsers";

import PurchasedContent from "../components/user/PurchasedContent";
import RecommendedContent from "../components/user/RecommendedContent";
import Profile from "../components/user/Profile";
import Login from "../components/auth/Login";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";
import ManageContent from "../components/admin/ManageContent";
import FreeContent from "../components/user/FreeContent";
import PurchasedProjects from "../components/user/PurchasedProjects";
import BrowseAll from "../pages/BrowseAll";
import Contact from "../pages/Contact";
import Header from "../components/common/Header";
import PrivacyPolicy from "../pages/Page1";
import TermsAndConditions from "../pages/Page2";
import CancellationAndRefunds from "../pages/Page3";
import Disclaimer from "../pages/Page4";
import Footer from "../components/common/Footer";

const AppRoutes = () => {
	return (
		<Routes>
			{/* Public Routes */}
			<Route path='/' element={<MainLayout />}>
				<Route index element={<Home />} />
			</Route>
			<Route
				path='course/:slug'
				element={
					<>
						<Header />
						<ContentDetails />
						<Footer />
					</>
				}
			/>
			{/* Redirect old content URLs to new course URLs for backward compatibility */}
			<Route
				path='content/:slug'
				element={<Navigate to={location => `/course${location.pathname.substring(8)}`} replace />}
			/>
			<Route
				path='category/:slug'
				element={
					<>
						<Header />
						<CourseCategory />
						<Footer />
					</>
				}
			/>

			<Route path='/login' element={<Login />} />
			<Route path='/admin/login' element={<AdminLogin />} />
			<Route
				path='/register'
				element={
					<>
						<Header />
						<Register />
						<Footer />
					</>
				}
			/>
			<Route
				path='/browse'
				element={
					<>
						<Header />
						<BrowseAll />
						<Footer />
					</>
				}
			/>
			<Route
				path='contact'
				element={
					<>
						<Header />
						<Contact />
						<Footer />
					</>
				}
			/>
			<Route
				path='privacy'
				element={
					<>
						<Header />
						<PrivacyPolicy />
						<Footer />
					</>
				}
			/>
			<Route
				path='terms'
				element={
					<>
						<Header />
						<TermsAndConditions />
						<Footer />
					</>
				}
			/>
			<Route
				path='refunds'
				element={
					<>
						<Header />
						<CancellationAndRefunds />
						<Footer />
					</>
				}
			/>
			<Route
				path='disclaimer'
				element={
					<>
						<Header />
						<Disclaimer />
						<Footer />
					</>
				}
			/>

			{/* User Routes */}
			<Route path='/customer' element={<UserLayout />}>
				<Route path='dashboard' element={<UserDashboard />} />
				<Route path='purchased' element={<PurchasedContent />} />
				<Route path='purchased-projects' element={<PurchasedProjects />} />
				<Route path='recommended' element={<RecommendedContent />} />
				<Route path='free' element={<FreeContent />} />
				<Route path='profile' element={<Profile />} />
			</Route>

			{/* Admin Routes */}
			<Route path='/admin' element={<AdminLayout />}>
				<Route path='dashboard' element={<AdminDashboard />} />
				<Route path='upload' element={<ContentUpload />} />
				<Route path='content' element={<ContentList />} />
				<Route path='manage-content' element={<ManageContent />} />
				<Route path='users' element={<ManageUsers />} />
				<Route path='stats' element={<Stats />} />
			</Route>

			{/* Catch all route */}
			<Route path='*' element={<Navigate to='/' replace />} />
		</Routes>
	);
};

export default AppRoutes;
