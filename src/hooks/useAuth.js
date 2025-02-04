import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token =
			localStorage.getItem("userToken") || localStorage.getItem("adminToken");

		if (token) {
			// Decode token to check expiration
			const decodedToken = jwtDecode(token);
			const currentTime = Date.now() / 1000; // in seconds

			// Check if the token has expired
			if (decodedToken.exp < currentTime) {
				// Token has expired, remove it and redirect to login
				localStorage.removeItem("userToken");
				localStorage.removeItem("adminToken");
				setUser(null);
			} else {
				// Token is still valid, set the user data
				setUser(decodedToken);
			}
		} else {
			// No token, user is not authenticated
			setUser(null);
		}

		setLoading(false);
	}, []);

	const logout = () => {
		localStorage.removeItem("userToken");
		localStorage.removeItem("adminToken");
		setUser(null);
	};

	return {
		user,
		loading,
		logout,
	};
};

export default useAuth;
