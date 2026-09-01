import {
  LayoutDashboard,
  ClipboardPlus,
  History,
  FileText,
  BarChart3,
  Settings,
  CircleHelp,
  LogOut,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {

  const mainMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "New Inspection",
      path: "/inspection/new",
      icon: ClipboardPlus,
    },
    {
      name: "Inspection History",
      path: "/history",
      icon: History,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: FileText,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
  ];

  const otherMenu = [
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
    {
      name: "Help",
      path: "/help",
      icon: CircleHelp,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-72 flex-col
          bg-slate-950 text-white
          shadow-xl
          transition-transform duration-300 ease-in-out

          md:static
          md:translate-x-0
          md:shadow-none

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">

          <div>
            <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              LegalMatrix
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Compliance System
            </p>
          </div>

          {/* Close button - mobile */}
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white md:hidden"
          >
            <X size={21} />
          </button>

        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">

          {/* Main Menu */}
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Main Menu
          </p>

          <div className="space-y-1">

            {mainMenu.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3
                    rounded-lg px-3 py-3
                    text-sm font-medium
                    transition-all duration-200

                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-900/30"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }
                    `
                  }
                >

                  {({ isActive }) => (
                    <>
                      <Icon
                        size={20}
                        strokeWidth={isActive ? 2.5 : 2}
                        className="shrink-0"
                      />

                      <span>
                        {item.name}
                      </span>
                    </>
                  )}

                </NavLink>
              );
            })}

          </div>

          {/* Other Menu */}
          <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Other
          </p>

          <div className="space-y-1">

            {otherMenu.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3
                    rounded-lg px-3 py-3
                    text-sm font-medium
                    transition-all duration-200

                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }
                    `
                  }
                >

                  <Icon size={20} />

                  <span>
                    {item.name}
                  </span>

                </NavLink>
              );
            })}

          </div>

        </nav>

        {/* Officer Profile */}
        <div className="border-t border-slate-800 p-4">

          <div className="flex items-center gap-3 rounded-xl bg-slate-900 p-3">

            {/* Avatar */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              O
            </div>

            {/* Information */}
            <div className="min-w-0 flex-1">

              <p className="truncate text-sm font-semibold text-white">
                Officer
              </p>

              <p className="truncate text-xs text-slate-500">
                Inspector
              </p>

            </div>

            {/* Logout */}
            <button
              title="Logout"
              className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut size={18} />
            </button>

          </div>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;