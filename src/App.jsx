// App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes";
import "./App.css";

const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				{/* <CartProvider> */}
				<AppRoutes />
				{/* </CartProvider> */}
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
