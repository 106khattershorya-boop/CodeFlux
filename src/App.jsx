import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Menu } from "lucide-react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar";

import Dashboard from "./pages/Dashboard";
import NewInspection from "./pages/NewInspection";
import History from "./pages/History";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";


function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>

      <div className="min-h-screen bg-slate-50">

        {/* Navbar */}
        <Navbar />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="
            fixed bottom-5 left-5 z-30
            flex h-12 w-12
            items-center justify-center
            rounded-full
            bg-blue-600
            text-white
            shadow-lg
            transition
            hover:bg-blue-700
            md:hidden
          "
        >
          <Menu size={22} />
        </button>


        {/* Main Layout */}
        <div className="flex">

          {/* Sidebar */}
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />


          {/* Page Content */}
          <main className="min-w-0 flex-1 p-5 sm:p-6 lg:p-8">

            <Routes>

              {/* Default route */}
              <Route
                path="/"
                element={
                  <Navigate
                    to="/dashboard"
                    replace
                  />
                }
              />

              {/* Dashboard */}
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              {/* New Inspection */}
              <Route
                path="/inspection/new"
                element={<NewInspection />}
              />

              {/* History */}
              <Route
                path="/history"
                element={<History />}
              />

              {/* Reports */}
              <Route
                path="/reports"
                element={<Reports />}
              />

              {/* Analytics */}
              <Route
                path="/analytics"
                element={<Analytics />}
              />

              {/* Settings */}
              <Route
                path="/settings"
                element={
                  <h1 className="text-2xl font-bold">
                    Settings
                  </h1>
                }
              />

              {/* Help */}
              <Route
                path="/help"
                element={
                  <h1 className="text-2xl font-bold">
                    Help
                  </h1>
                }
              />

            </Routes>

          </main>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;