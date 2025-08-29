import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ModernHome from "./pages/ModernHome";
import ModernZacGuide from "./pages/ModernZacGuide";
import ModernCommunity from "./pages/ModernCommunity";
import TestScroll from "./pages/TestScroll";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="relative w-full min-h-screen bg-[#301466]">
          <Routes>
            <Route path="/" element={<ModernHome />} />
            <Route path="/guide" element={<ModernZacGuide />} />
            <Route path="/test-scroll" element={<TestScroll />} />
            <Route path="/community" element={<ModernCommunity />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
