import React, { useState } from "react";
import FolderPicker from "../components/Test";
import { Button } from "../components/ui/button";
import { invoke } from "@tauri-apps/api/core";

const Settings: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(
    () => localStorage.getItem("folderPath") || ""
  );

  const handleFolderPathChange = (newPath: string) => {
    localStorage.setItem("folderPath", newPath);
    setCurrentPath(newPath);
  };
  const handleDeleteCache = async () => {
    try {
      const result = await invoke("delete_cache");
      if (result) {
        console.log("Cache deleted");
      }
    } catch (error) {
      console.error("Error deleting cache:", error);
    }
  };

  return (
    <div className="flex-1 container mx-auto px-4 py-8">
      <div className="bg-gray-800 dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-50 dark:text-gray-50 mb-2">
            Current Folder Path
          </h2>
          <div className="bg-gray-700 dark:bg-gray-700 rounded-md px-4 py-3 text-gray-300 dark:text-gray-300">
            {currentPath}
          </div>
        </div>
        <FolderPicker setFolderPath={handleFolderPathChange} />
        <Button
          onClick={handleDeleteCache}
          variant="outline"
          className="text-gray-50 dark:text-gray-50 border-gray-500 dark:border-gray-500 hover:bg-gray-700 dark:hover:bg-gray-700"
        >
          <RefreshCwIcon className="mr-2 h-5 w-5 text-gray-50 dark:text-gray-50" />
          Refresh Cache
        </Button>
      </div>
    </div>
  );
};

export default Settings;


function RefreshCwIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}
