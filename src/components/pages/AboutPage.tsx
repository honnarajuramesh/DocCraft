import React from "react";
import { Shield, Zap, Code, Heart } from "lucide-react";

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About DocCraft
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Professional file processing tools built with modern technology and
            security in mind.
          </p>
        </div>

        <div className="space-y-16">
          {/* Mission */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              DocCraft was created to provide a secure, reliable, and
              user-friendly solution for PDF file management. We believe that
              file processing should be fast, private, and accessible to
              everyone.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Technology Stack
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-400" />
                  Frontend
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• React with TypeScript</li>
                  <li>• Vite for fast development</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Lucide React for icons</li>
                </ul>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Backend
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Python with FastAPI</li>
                  <li>• PyPDF2 for PDF processing</li>
                  <li>• Uvicorn ASGI server</li>
                  <li>• RESTful API design</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
              <Shield className="w-8 h-8 text-blue-400" />
              Security & Privacy
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Local Processing
                </h3>
                <p>
                  All file processing happens on your local machine. Your files
                  never leave your device.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  No Data Collection
                </h3>
                <p>
                  We don't collect, store, or analyze any of your personal data
                  or files.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Open Source
                </h3>
                <p>
                  Our code is transparent and can be audited by security
                  experts.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Automatic Cleanup
                </h3>
                <p>
                  Temporary files are automatically deleted after processing.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>by Honnaraju, for developers</span>
            </div>
            <p className="text-sm text-gray-500">
              DocCraft © 2024. Built with modern web technologies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
