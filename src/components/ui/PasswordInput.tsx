import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  placeholder?: string;
  label?: string;
  error?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  onEnter,
  placeholder = "Enter your PDF password",
  label = "PDF Password",
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnter) {
      onEnter();
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-300 mb-3">
        {label}
      </label>

      <div className="relative">
        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className={`w-full pl-12 pr-12 py-4 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 font-medium transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
            error
              ? "border-red-500/50 focus:ring-red-500"
              : "border-gray-600/50"
          }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
          <div className="w-1 h-1 bg-red-400 rounded-full"></div>
          {error}
        </p>
      )}

      <div className="text-xs text-gray-500 mt-2">
        Enter the password used to protect your PDF file
      </div>
    </div>
  );
};
