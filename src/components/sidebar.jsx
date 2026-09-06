
import React from "react";

import {
  LayoutDashboard,
  ScanLine,
  History,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  Bot
} from "lucide-react";

import {
  NavLink
} from "react-router-dom";


function Sidebar() {

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "New Inspection",
      path: "/inspection/new",
      icon: ScanLine
    },
    {
      name: "Inspection History",
      path: "/history",
      icon: History
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3
    },
    {
      name: "Reports",
      path: "/reports",
      icon: FileText
    }
  ];


  const bottomLinks = [
    {
      name: "Settings",
      path: "/settings",
      icon: Settings
    },
    {
      name: "Help & Guide",
      path: "/help",
      icon: HelpCircle
    }
  ];


  const linkClass =
    ({ isActive }) =>
      `
      group
      flex
      items-center
      gap-3
      rounded-xl
      px-3.5
      py-3
      text-sm
      font-medium
      transition
      ${
        isActive
          ? "bg-blue-100 text-blue-600 dark:bg-blue-600/10 dark:text-blue-400"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-500 dark:hover:bg-slate-900 dark:hover:text-white"
      }
      `;


  return (

    <aside
      className="
      fixed
      bottom-0
      left-0
      top-[72px]
      hidden
      w-[245px]
      border-r
      border-slate-200
      bg-white
      transition-colors
      duration-300
      dark:border-slate-800
      dark:bg-slate-950
      lg:flex
      lg:flex-col
      "
    >

      <div
        className="
        flex-1
        overflow-y-auto
        p-4
        "
      >

        <div
          className="
          mb-3
          px-3
          text-[10px]
          font-bold
          uppercase
          tracking-widest
          text-slate-400
          dark:text-slate-600
          "
        >
          Main Menu
        </div>


        <div className="space-y-1">

          {links.map(item => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.path}
                to={item.path}
                className={linkClass}
              >

                <Icon
                  size={18}
                  strokeWidth={1.8}
                />

                <span>
                  {item.name}
                </span>

              </NavLink>

            );

          })}

        </div>


        <div
          className="
          mb-3
          mt-8
          px-3
          text-[10px]
          font-bold
          uppercase
          tracking-widest
          text-slate-400
          dark:text-slate-600
          "
        >
          System
        </div>


        <div className="space-y-1">

          {bottomLinks.map(item => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.path}
                to={item.path}
                className={linkClass}
              >

                <Icon size={18} />

                <span>
                  {item.name}
                </span>

              </NavLink>

            );

          })}

        </div>

      </div>


      <div
        className="
        m-4
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-4
        dark:border-slate-800
        dark:bg-slate-900
        "
      >

        <div
          className="
          mb-3
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          bg-blue-100
          text-blue-600
          dark:bg-blue-600/10
          dark:text-blue-400
          "
        >
          <Bot size={19} />
        </div>


        <h3
          className="
          text-sm
          font-bold
          text-slate-900
          dark:text-white
          "
        >
          PackSure AI
        </h3>

        <p
          className="
          mt-1
          text-[11px]
          leading-relaxed
          text-slate-500
          "
        >
          AI-assisted compliance screening
          for packaged commodities.
        </p>


        <div
          className="
          mt-4
          flex
          items-center
          gap-2
          text-[10px]
          text-emerald-600
          dark:text-emerald-400
          "
        >

          <span
            className="
            h-1.5
            w-1.5
            rounded-full
            bg-emerald-500
            dark:bg-emerald-400
            "
          />

          AI Assistant Ready

        </div>

      </div>

    </aside>

  );
}


export default Sidebar;

