
import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Chatbot from "./components/chatbot";

import Login from "./pages/login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import NewInspection from "./pages/NewInspection";
import InspectionReport from "./pages/InspectionReport";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import ReportPreview from "./pages/ReportPreview";
import Settings from "./pages/Settings";
import Help from "./pages/Help";


function ProtectedLayout() {

  const loggedIn =
    localStorage.getItem("isLoggedIn") === "true";


  if (!loggedIn) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  return (

    <div
      className="
        min-h-screen
        bg-slate-100
        text-slate-900
        transition-colors
        duration-300
        dark:bg-slate-950
        dark:text-white
      "
    >

      <Navbar />

      <div className="flex">

        <Sidebar />

        <main
          className="
            min-w-0
            flex-1
            p-4
            md:p-6
            lg:ml-[245px]
            lg:p-8
          "
        >

          <Outlet />

        </main>

      </div>

      <Chatbot />

    </div>

  );
}


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />


        {/* Protected Routes */}

        <Route
          element={<ProtectedLayout />}
        >

          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/inspection/new"
            element={<NewInspection />}
          />

          <Route
            path="/inspection/report"
            element={<InspectionReport />}
          />

          <Route
            path="/history"
            element={<History />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/reports/view/:id"
            element={<ReportPreview />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="/help"
            element={<Help />}
          />

        </Route>


        {/* Fallback */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );
}


export default App;

