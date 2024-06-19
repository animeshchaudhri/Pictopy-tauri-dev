// import { useEffect, useState } from "react";
// import { homeDir, resolve } from "@tauri-apps/api/path";
// import { readDir } from "@tauri-apps/plugin-fs";
// import { convertFileSrc } from "core";

// interface File {
//   name: string;
//   isDir: boolean;
// }

// const Item = ({
//   handleClick,
//   file,
// }: {
//   handleClick: (fileName: string) => void;
//   file: File;
// }): JSX.Element => (
//   <div
//     key={file.name}
//     className={file.isDir ? "dir" : "file"}
//     onClick={() => {
//       if (!file.isDir) return;
//       handleClick(file.name);
//     }}
//   >
//     {file.isDir ? "📁" : "📄"}
//     {file.name}
//     {file.isDir ? "/" : ""}
//   </div>
// );

// const FileBrowser = (): JSX.Element => {
//   const [files, setFiles] = useState<File[]>([]);
//   const [currentPath, setCurrentPath] = useState<string>("");
//   const [images, setImages] = useState<string[]>([]);

//   useEffect(() => {
//     async function getHomeDir() {
//       const homeDirPath = await homeDir();
//       setCurrentPath(homeDirPath);
//     }

//     getHomeDir();
//   }, []);

//   useEffect(() => {
//     async function getFiles() {
//       const contents = await readDir(currentPath);

//       const entries = [
//         { name: ".", children: [] },
//         { name: "..", children: [] },
//         ...contents,
//       ];

//       const names = entries.map((entry) => ({
//         name: entry.name || "",
//         isDir: !!entry.children,
//       }));

//       setFiles(names);
//     }
//     getFiles();
//   }, [currentPath]);

//   useEffect(() => {
//     async function fetchImages() {
//       try {
//         const contents = await readDir(currentPath);

//         const imageFiles = contents.filter((file: any) => {
//           return /\.(jpg|jpeg|png|gif)$/i.test(file.name);
//         });

//         console.log(imageFiles);
//         const imageUrls = await Promise.all(
//           imageFiles.map(async (file) => {
//             return await convertFileSrc(file.path);
//           })
//         );
//         console.log(imageUrls);
//         setImages(imageUrls);
//       } catch (error) {
//         console.error("Error fetching images:", error);
//       }
//     }

//     fetchImages();
//   }, [currentPath]);

//   async function handleClick(name: string) {
//     const newPath = await resolve(currentPath, name);
//     setCurrentPath(newPath);
//   }

//   return (
//     <div className="files">
//       <div className="dirname">Files in {currentPath}</div>
//       <div className="filelist">
//         {files.map((file: File) => (
//           <Item handleClick={handleClick} file={file} />
//         ))}
//       </div>
//       <div className="images">
//         <>
//           <div className="bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-screen text-center md:text-left">
//             <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
//               <div className="pb-8">
//                 <p className="text-4xl font-bold inline border-b-4 border-gray-500">
//                   WOW{" "}
//                 </p>
//                 <p className="py-6">image</p>
//               </div>

//               <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:px-5">
//                 {images.map((image, index) => (
//                   <div
//                     key={index}
//                     className="shadow-md shadow-gray-600 rounded-lg overflow-hidden"
//                   >
//                     <img
//                       src={image}
//                       alt=""
//                       className="rounded-md duration-200 hover:scale-105 bg-cover bg-center w-full h-64 object-cover"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </>
//         {/* {images.map((image, index) => (
//           <img key={index} src={image} />
//         ))} */}
//       </div>
//     </div>
//   );
// };

// export default FileBrowser;

// src/components/FolderPicker.js

import React from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { Button } from "./ui/button";

interface FolderPickerProps {
  setFolderPath: (path: string) => void;
}

const FolderPicker: React.FC<FolderPickerProps> = ({ setFolderPath }) => {
  const pickFolder = async () => {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
        title: "Select a folder",
      });
      if (selected && typeof selected === "string") {
        setFolderPath(selected);
      }
    } catch (error) {
      console.error("Error picking folder:", error);
    }
  };

  return (
    <div className="flex gap-3">
      <Button
        onClick={pickFolder}
        variant="outline"
        className="text-gray-50 dark:text-gray-50 border-gray-500 dark:border-gray-500 hover:bg-gray-700 dark:hover:bg-gray-700"
      >
        <FolderOpenIcon className="mr-2 h-5 w-5 text-gray-50 dark:text-gray-50" />
        Choose Folder
      </Button>
    </div>
  );
};

export default FolderPicker;

function FolderOpenIcon(props: any) {
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
      <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
    </svg>
  );
}
