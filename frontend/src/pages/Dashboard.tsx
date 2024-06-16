import { useEffect, useState } from "react";
import Test2 from "../components/Main";
import Main_menu from "../components/main_menu/main_menu";

interface DashboardProps {
  folderPath?: string;
}

function Dashboard({ folderPath: propFolderPath }: DashboardProps) {
  const [folderPath, setFolderPath] = useState<string>("");

  useEffect(() => {
    console.log("props.folderPath", propFolderPath);
    const localPath = localStorage.getItem("folderPath");
    console.log("localPath", localPath);
    if (localPath && !propFolderPath) {
      setFolderPath(localPath);
    } else if (propFolderPath) {
      setFolderPath(propFolderPath);
    }
  }, [propFolderPath]);

  return (
    <div>
      <div className="flex flex-col bg-gray-900 text-white p-4">
        <Main_menu />
        <Test2 folderPath={folderPath} />
      </div>
    </div>
  );
}

export default Dashboard;
