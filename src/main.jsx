import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n.js";
import App from "./App.jsx";
import { CheckProvider } from "./context/CheckContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<CheckProvider>
			<App />
		</CheckProvider>
	</StrictMode>
);
