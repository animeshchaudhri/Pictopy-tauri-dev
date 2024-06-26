// LayoutRoutes.js
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import InitialPage from "./init/Init";
import Photos_Page from "../pages/Photos_Page";
import Settings_page from "../pages/Settings_page";
import VideoPage from "../pages/VideoPage";

const LayoutRoutes = () => (
  <Routes>
    <Route path="/files" element={<Dashboard />} />
    <Route path="/home" element={<Dashboard />} />

    <Route path="/photos" element={<Photos_Page />} />
    <Route path="/videos" element={<VideoPage />} />
    <Route path="/settings" element={<Settings_page />} />
  </Routes>
);

export default LayoutRoutes;
