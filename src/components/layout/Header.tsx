import React, { useState } from "react";
import {
  FileText,
  Menu,
  X,
  Home,
  Settings,
  Info,
  Github,
  CheckCircle,
  XCircle,
  Loader,
} from "lucide-react";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  backendStatus: "checking" | "online" | "offline";
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onPageChange,
  backendStatus,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", id: "home", icon: Home },
    { name: "PDF Tools", id: "pdf-tools", icon: FileText },
    { name: "Settings", id: "settings", icon: Settings },
    { name: "About", id: "about", icon: Info },
  ];

  const getStatusIcon = () => {
    switch (backendStatus) {
      case "checking":
        return <Loader className="w-4 h-4 animate-spin text-gray-400" />;
      case "online":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "offline":
        return <XCircle className="w-4 h-4 text-red-400" />;
    }
  };

  const getStatusText = () => {
    switch (backendStatus) {
      case "checking":
        return "Checking...";
      case "online":
        return "Online";
      case "offline":
        return "Offline";
    }
  };

  return (
    <header className="bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur-md opacity-50"></div>
              <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 p-0.5 rounded-lg">
                {/* <FileText className="w-6 h-6 text-white" /> */}
                <img
                  src="/assets/icons/DocCraftLogo.jpeg"
                  style={{ width: "45px", borderRadius: "0.6rem" }}
                ></img>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                DocCraft
              </h1>
              <p className="text-xs text-gray-400">Professional File Tools</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === item.id
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </button>
            ))}
          </nav>

          {/* Backend Status & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Backend Status */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-800/50 border border-gray-700/50">
              {getStatusIcon()}
              <span className="text-sm text-gray-300">
                Backend: {getStatusText()}
              </span>
            </div>

            {/* GitHub Link */}
            <a
              href={import.meta.env.VITE_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700/50">
            <div className="space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === item.id
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </button>
              ))}

              {/* Mobile Backend Status */}
              <div className="flex items-center gap-2 px-4 py-3 text-sm text-gray-400">
                {getStatusIcon()}
                Backend: {getStatusText()}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
