import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Mount React App
createRoot(document.getElementById("root")!).render(<App />);

// Analytics (safe Vite way)
const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

if (endpoint && websiteId) {
  const script = document.createElement("script");
  script.src = `${endpoint}/umami.js`;
  script.setAttribute("data-website-id", websiteId);
  document.body.appendChild(script);
}