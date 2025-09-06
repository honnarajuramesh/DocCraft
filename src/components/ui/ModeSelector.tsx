import React from "react";
import { Lock, Unlock } from "lucide-react";

interface ModeSelectorProps {
  mode: "remove" | "add";
  onModeChange: (mode: "remove" | "add") => void;
  disabled?: boolean;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  mode,
  onModeChange,
  disabled = false,
}) => {
  return (
    <div className="flex bg-gray-800/50 rounded-xl p-1 border border-gray-700/50">
      <button
        onClick={() => onModeChange("remove")}
        disabled={disabled}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
          mode === "remove"
            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
            : "text-gray-400 hover:text-white hover:bg-gray-700/50"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <Unlock className="w-4 h-4" />
        Remove Password
      </button>
      <button
        onClick={() => onModeChange("add")}
        disabled={disabled}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
          mode === "add"
            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
            : "text-gray-400 hover:text-white hover:bg-gray-700/50"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <Lock className="w-4 h-4" />
        Add Password
      </button>
    </div>
  );
};
