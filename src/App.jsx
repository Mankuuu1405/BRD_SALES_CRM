import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import PipelinePage from "./pages/PipelinePage";
import ReportsPage from "./pages/ReportsPage";
import IncentivesPage from "./pages/IncentivesPage";
import ResourcesPage from "./pages/ResourcesPage";
import SettingsPage from "./pages/SettingsPage";
import MarketingPage from "./pages/MarketingPage";

// Additional page imports
import CollectionAndRecoveryPage from "./pages/CollectionAndRecoveryPage";
import SupportAndTicketingPage from "./pages/SupportAndTicketingPage";
import RemindersAlertsPage from "./pages/RemindersAlertsPage";
import AdministrationPage from "./pages/AdministrationPage.jsx";

function AppRoutes() {
  const { login, signIn } = useAuth();

  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/login" element={<LoginPage onLogin={login} />} />
      <Route path="/signin" element={<SignInPage onSignIn={signIn} />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Main Application Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <HomePage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Feature Routes */}
      <Route
        path="/pipeline"
        element={
          <ProtectedRoute>
            <Layout>
              <PipelinePage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Layout>
              <ReportsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/marketing"
        element={
          <ProtectedRoute>
            <Layout>
              <MarketingPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/incentives"
        element={
          <ProtectedRoute>
            <Layout>
              <IncentivesPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/resources"
        element={
          <ProtectedRoute>
            <Layout>
              <ResourcesPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Layout>
              <SettingsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Additional Feature Routes */}
      <Route
        path="/reminders-alerts"
        element={
          <ProtectedRoute>
            <Layout>
              <RemindersAlertsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/support-ticketing"
        element={
          <ProtectedRoute>
            <Layout>
              <SupportAndTicketingPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/collection-recovery"
        element={
          <ProtectedRoute>
            <Layout>
              <CollectionAndRecoveryPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/administration"
        element={
          <ProtectedRoute>
            <Layout>
              <AdministrationPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Catch-all route for unknown paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
