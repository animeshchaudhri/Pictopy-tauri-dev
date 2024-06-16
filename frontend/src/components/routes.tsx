// LayoutRoutes.js
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import InitialPage from "./init/Init";


const LayoutRoutes = () => (
  <Routes>
    <Route path="/files" element={<Dashboard />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings" element={<InitialPage />} />
    <Route path="/photos" element={<InitialPage />} />
    <Route path="/videos" element={<InitialPage />} />
  </Routes>
);

export default LayoutRoutes;
