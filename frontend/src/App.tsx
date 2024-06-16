import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./layout/Layout";
import InitialPage from "./components/init/Init";
import LayoutRoutes from "./components/routes";


function AppContent() {
  const location = useLocation();
  const isLayoutRoute = ['/files', '/dashboard', '/settings', '/photos', '/videos'].includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<InitialPage />} />
      </Routes>
      {isLayoutRoute && (
        <Layout>
          <LayoutRoutes />
        </Layout>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
