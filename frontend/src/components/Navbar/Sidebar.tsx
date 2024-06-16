import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div className=" flex sidebar flex-col justify-between bg-[#333333] w-40 border-r border-gray-700 dark:border-gray-700 p-4 space-y-4">
        <div className="flex flex-col mt-2 gap-10">
          <Link
            to="/"
            className="flex items-center flex-col gap-2 text-white hover:text-gray-50 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <HomeIcon className="h-5 w-5" />
            <span className="font-sans">Home</span>
          </Link>
          <Link
            to="/files"
            className="flex items-center flex-col gap-2 text-white hover:text-gray-50 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <FileIcon className="h-5 w-5" />
            <span className="font-sans">Ai tagging</span>
          </Link>
          <Link
            to="/photos"
            className="flex items-center flex-col gap-2 text-white hover:text-gray-50 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <ImageIcon className="h-5 w-5" />
            <span className="font-sans">Photos</span>
          </Link>
          <Link
            to="/videos"
            className="flex items-center flex-col gap-2 text-white hover:text-gray-50 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <VideoIcon className="h-5 w-5" />
            <span className="font-sans">Videos</span>
          </Link>
          <Link
            to="/albums"
            className="flex items-center flex-col gap-2 text-white hover:text-gray-50 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <AlbumIcon className="h-5 w-5" />
            <span className="font-sans">Albums</span>
          </Link>
        </div>
        <Link
          to="/settings"
          className="flex items-center flex-col gap-2 text-white hover:text-gray-50 dark:text-gray-400 dark:hover:text-gray-50 mt-auto"
        >
          <SettingsIcon className="h-5 w-5" />
          <span className="font-sans">Settings</span>
        </Link>
      </div>
    </>
  );
}

// Define other icon components (SettingsIcon, HomeIcon, etc.) as before...

export default Sidebar;

function SettingsIcon(props: any) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function HomeIcon(props: any) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ImageIcon(props: any) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function VideoIcon(props: any) {
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
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}

function AlbumIcon(props: any) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <polyline points="11 3 11 11 14 8 17 11 17 3" />
    </svg>
  );
}

function FileIcon(props: any) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}
