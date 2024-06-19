import { useEffect, useState } from "react";
import Test2 from "../components/Main";

interface DashboardProps {
  folderPath?: string;
}

function Dashboard({ folderPath: propFolderPath }: DashboardProps) {
  const [folderPath, setFolderPath] = useState<string>("");

  useEffect(() => {
    const localPath = localStorage.getItem("folderPath");

    if (localPath && !propFolderPath) {
      setFolderPath(localPath);
    } else if (propFolderPath) {
      setFolderPath(propFolderPath);
    }
  }, [propFolderPath]);

  return (
    <div>
      <div className="flex flex-col bg-gray-900 text-white p-4">
        <Test2 folderPath={folderPath} />
      </div>
    </div>
  );
}

export default Dashboard;
