// App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";

const App = () => {
	return (
		<GoogleOAuthProvider
			clientId={
				"20623433242-vgn3per6s00fh35uhmg7e3orkh3ocs0c.apps.googleusercontent.com"
			}>
			<BrowserRouter>
				<AuthProvider>
					{/* <CartProvider> */}
					<AppRoutes />
					<ToastContainer position="top-right" />
					{/* </CartProvider> */}
				</AuthProvider>
			</BrowserRouter>
		</GoogleOAuthProvider>
	);
};

export default App;
