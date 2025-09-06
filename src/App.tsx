import React, { useState, useEffect } from "react";
import { Header } from "./components/layout/Header";
import { HomePage } from "./components/pages/HomePage";
import { AboutPage } from "./components/pages/AboutPage";
import { SettingsPage } from "./components/pages/SettingsPage";
import PDFUnlocker from "./components/PDFUnlocker";
import { ApiClient } from "./utils/apiClient";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [backendStatus, setBackendStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");

  // Check backend status on app load
  useEffect(() => {
    const checkBackend = async () => {
      const response = await ApiClient.healthCheck();
      setBackendStatus(response.error ? "offline" : "online");
    };

    checkBackend();

    // Check backend status every 30 seconds
    const interval = setInterval(checkBackend, 30000);
    return () => clearInterval(interval);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "pdf-tools":
        return <PDFUnlocker />;
      case "settings":
        return <SettingsPage />;
      case "about":
        return <AboutPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        backendStatus={backendStatus}
      />
      {renderPage()}
    </div>
  );
}

export default App;
