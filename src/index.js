import React from "react";
import ReactDOM from "react-dom/client"; // Import React 18's new root API
import App from "./App";  // Your App component

if (process.env.NODE_ENV !== 'production') {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (/Warning: \[antd: compatible\]/.test(args[0])) {
      return;
    }
    originalConsoleError(...args);
  };
}

// Create a root element using React 18's createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component inside React.StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
