import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import FolderPicker from "../Test";



export default function InitialPage() {
  const [loading, setLoading] = useState(true);
  const [folderPath, setFolderPath] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedFolderPath = localStorage.getItem("folderPath");
    console.log(savedFolderPath);
    if (savedFolderPath) {
      console.log(folderPath);
      setFolderPath(savedFolderPath);
      setLoading(false);
      
      navigate("/home");
    } else {
      setLoading(false); 
    }
  }, []);

  const handleFolderPathChange = (path: string) => {
    setFolderPath(path);

    localStorage.setItem("folderPath", path);
    navigate("/home");
  };

  return (
    <div>
      {loading ? (
        // Placeholder for loading animation or screen
        <div>Loading...</div>
      ) : (
        // Initial setup screen with FolderPicker
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <div className="animate-fade-in-up flex flex-col items-center justify-center space-y-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
              <Pitopy className="w-16 h-16 text-gray-900" />
            </div>
            <p className="text-2xl font-bold text-white">Pictopy</p>

            <FolderPicker setFolderPath={handleFolderPathChange} />
          </div>
        </div>
      )}
    </div>
  );
}

function Pitopy(props: any) {
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
      <line x1="9" x2="9" y1="4" y2="20" />
      <path d="M4 7c0-1.7 1.3-3 3-3h13" />
      <path d="M18 20c-1.7 0-3-1.3-3-3V4" />
    </svg>
  );
}
