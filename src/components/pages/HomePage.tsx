import React from "react";
import {
  FileText,
  Lock,
  Unlock,
  Zap,
  Shield,
  FileImage,
  ArrowRight,
} from "lucide-react";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Unlock,
      title: "Remove PDF Passwords",
      description:
        "Safely remove password protection from your PDF files with our advanced Python backend.",
      color: "from-purple-500 to-blue-500",
    },
    {
      icon: Lock,
      title: "Add PDF Protection",
      description:
        "Secure your PDFs with strong password encryption using 128-bit security.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Process your files in seconds with our optimized Python-powered backend.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Shield,
      title: "100% Private",
      description:
        "All processing happens locally on your machine. Your files never leave your device.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: FileImage,
      title: "PDF to Images",
      description:
        "Convert PDF pages to high-quality PNG or JPEG images with customizable DPI settings.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: FileText,
      title: "Images to PDF",
      description:
        "Combine multiple images into a single PDF document with flexible page layouts.",
      color: "from-blue-500 to-purple-500",
    },
  ];

  const stats = [
    { label: "Files Processed", value: "10,000+" },
    { label: "Success Rate", value: "99.9%" },
    { label: "Processing Time", value: "<5s" },
    { label: "Security Level", value: "128-bit" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                DocCraft
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Professional file processing tools powered by Python. Secure,
              fast, and completely private.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate("pdf-tools")}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => onNavigate("about")}
                className="inline-flex items-center px-8 py-4 border border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to manage your PDF files securely and
              efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="relative group">
                <div
                  className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300"
                  style={{
                    backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  }}
                ></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 h-full hover:border-gray-600/50 transition-all duration-300">
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of users who trust DocCraft for their file
                processing needs.
              </p>
              <button
                onClick={() => onNavigate("pdf-tools")}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Start Processing Files
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
