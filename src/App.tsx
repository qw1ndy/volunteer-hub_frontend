import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import OrganizationsPage from "./pages/OrganizationsPage";
import EventsPage from "./pages/EventsPage";
import ProfilePage from "./pages/ProfilePage";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main className="container mt-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/organizations" element={<OrganizationsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
