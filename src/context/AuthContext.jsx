// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../utils/api";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const checkTokenValidity = (token) => {
		try {
			const decoded = jwtDecode(token);
			return decoded.exp * 1000 > Date.now();
		} catch (error) {
			return false;
		}
	};

	const fetchUserProfile = async (token) => {
		try {
			const response = await api.get("/auth/me", {
				headers: { Authorization: `Bearer ${token}` },
			});

			const userData = {
				_id: response.data._id,
				name: response.data.name,
				email: response.data.email,
				isAdmin: response.data.isAdmin,
				purchasedContent: response.data.purchasedContent,
			};

			setUser(userData);
			return userData;
		} catch (error) {
			clearAuth();
			return null;
		}
	};

	useEffect(() => {
		const checkStoredToken = async () => {
			// Get tokens from sessionStorage instead of localStorage
			const userToken = sessionStorage.getItem("userToken");
			const adminToken = sessionStorage.getItem("adminToken");

			let tokenToUse = null;
			if (
				window.location.pathname.startsWith("/admin") &&
				adminToken &&
				checkTokenValidity(adminToken)
			) {
				tokenToUse = adminToken;
			} else if (
				!window.location.pathname.startsWith("/admin") &&
				userToken &&
				checkTokenValidity(userToken)
			) {
				tokenToUse = userToken;
			}

			if (tokenToUse) {
				api.defaults.headers.common["Authorization"] = `Bearer ${tokenToUse}`;
				await fetchUserProfile(tokenToUse);
			} else {
				clearAuth();
			}
			setLoading(false);
		};

		checkStoredToken();
	}, []);

	const login = async (credentials, isAdminLogin = false) => {
		try {
			const endpoint = isAdminLogin ? "/auth/admin/login" : "/auth/login";
			const { data } = await api.post(endpoint, credentials);

			if (data.token) {
				const tokenKey = isAdminLogin ? "adminToken" : "userToken";

				// Store in sessionStorage instead of localStorage
				sessionStorage.setItem(tokenKey, data.token);

				api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

				const userData = {
					_id: data._id,
					name: data.name,
					email: data.email,
					isAdmin: data.isAdmin,
					purchasedContent: data.purchasedContent,
				};

				setUser(userData);

				return {
					success: true,
					redirectUrl:
						data.redirectUrl ||
						(isAdminLogin ? "/admin/dashboard" : "/customer/dashboard"),
					isAdmin: data.isAdmin,
				};
			}
			throw new Error("No token received");
		} catch (error) {
			throw error.response?.data || { message: "Login failed" };
		}
	};

	const register = async (userData) => {
		try {
			const { data } = await api.post("/auth/register", userData);

			if (data.token) {
				sessionStorage.setItem("userToken", data.token);
				api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

				const userInfo = {
					_id: data._id,
					name: data.name,
					email: data.email,
					isAdmin: data.isAdmin,
				};

				setUser(userInfo);

				return {
					success: true,
					redirectUrl: data.redirectUrl || "/customer/dashboard",
				};
			}
			throw new Error("No token received from server");
		} catch (error) {
			throw error.response?.data || { message: "Registration failed" };
		}
	};

	const logout = (isAdmin = false) => {
		const tokenKey = isAdmin ? "adminToken" : "userToken";
		sessionStorage.removeItem(tokenKey);
		delete api.defaults.headers.common["Authorization"];
		setUser(null);
	};

	const clearAuth = () => {
		sessionStorage.removeItem("userToken");
		sessionStorage.removeItem("adminToken");
		delete api.defaults.headers.common["Authorization"];
		setUser(null);
	};

	const googleAuth = async (credentialResponse) => {
		try {
			const { data } = await api.post("/auth/google", {
				credential: credentialResponse.credential,
			});

			if (data.token) {
				sessionStorage.setItem("userToken", data.token);
				api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

				const userInfo = {
					_id: data._id,
					name: data.name,
					email: data.email,
					isAdmin: data.isAdmin,
				};

				setUser(userInfo);
				return {
					success: true,
					redirectUrl: data.redirectUrl || "/customer/dashboard",
				};
			}
			throw new Error("No token received");
		} catch (error) {
			throw error.response?.data || { message: "Google authentication failed" };
		}
	};

	const value = {
		user,
		loading,
		login,
		register,
		logout,
		isAuthenticated: !!user,
		isAdmin: user?.isAdmin,
		googleAuth,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export default AuthContext;
