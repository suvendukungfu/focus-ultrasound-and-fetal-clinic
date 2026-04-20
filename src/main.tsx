import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { setupMockApi } from "./lib/mockApi";

// Initialize mock API for full functionality in restricted environments
setupMockApi();

createRoot(document.getElementById("root")!).render(<App />);
