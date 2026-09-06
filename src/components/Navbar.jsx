
import React, { useEffect, useState } from "react";

import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Menu,
  X,
  Sun,
  Moon
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";


function Navbar() {

  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(() => {

      const savedTheme =
        localStorage.getItem("theme");

      if (savedTheme) {
        return savedTheme === "dark";
      }

      return true;
    });


  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );

    }

  }, [darkMode]);


  const toggleTheme = () => {

    setDarkMode(
      previous => !previous
    );

  };


  const logout = () => {

    localStorage.removeItem(
      "isLoggedIn"
    );

    localStorage.removeItem(
      "rememberMe"
    );

    navigate("/login");
  };


  const navItems = [
    ["Dashboard", "/dashboard"],
    ["New Inspection", "/inspection/new"],
    ["History", "/history"],
    ["Analytics", "/analytics"],
    ["Reports", "/reports"],
    ["Settings", "/settings"],
    ["Help", "/help"]
  ];


  return (

    <>

      <header
        className="
        sticky
        top-0
        z-50
        h-[72px]
        border-b
        border-slate-200
        bg-white/95
        backdrop-blur
        text-slate-900
        transition-colors
        duration-300
        dark:border-slate-800
        dark:bg-slate-950/95
        dark:text-white
        "
      >

        <div
          className="
          flex
          h-full
          items-center
          justify-between
          px-4
          md:px-6
          lg:px-8
          "
        >

          <div className="flex items-center gap-3">

            <button
              className="
              rounded-lg
              p-2
              text-slate-500
              hover:bg-slate-100
              hover:text-slate-900
              dark:text-slate-300
              dark:hover:bg-slate-800
              dark:hover:text-white
              lg:hidden
              "
              onClick={() =>
                setMobileOpen(
                  !mobileOpen
                )
              }
            >

              {mobileOpen
                ? <X size={21} />
                : <Menu size={21} />
              }

            </button>


            <div className="flex items-center gap-3">

              <div
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-blue-600
                text-white
                shadow-lg
                shadow-blue-600/20
                "
              >
                <span
                  className="
                  text-lg
                  font-black
                  "
                >
                  P
                </span>
              </div>


              <div>

                <h1
                  className="
                  text-lg
                  font-extrabold
                  tracking-tight
                  md:text-xl
                  "
                >
                  PackSure{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    AI
                  </span>
                </h1>

                <p
                  className="
                  hidden
                  text-[10px]
                  font-medium
                  text-slate-500
                  sm:block
                  "
                >
                  LEGAL METROLOGY COMPLIANCE
                </p>

              </div>

            </div>

          </div>


          <div
            className="
            flex
            items-center
            gap-2
            md:gap-4
            "
          >

            {/* Theme Toggle */}

            <button
              onClick={toggleTheme}
              title={
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className="
              rounded-xl
              p-2.5
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900
              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-white
              "
            >

              {darkMode
                ? <Sun size={19} />
                : <Moon size={19} />
              }

            </button>


            <button
              className="
              relative
              rounded-xl
              p-2.5
              text-slate-500
              hover:bg-slate-100
              hover:text-slate-900
              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-white
              "
            >

              <Bell size={19} />

              <span
                className="
                absolute
                right-2
                top-2
                h-2
                w-2
                rounded-full
                bg-red-500
                "
              />

            </button>


            <div
              className="
              hidden
              h-8
              w-px
              bg-slate-200
              dark:bg-slate-800
              sm:block
              "
            />


            <div className="relative">

              <button
                onClick={() =>
                  setProfileOpen(
                    !profileOpen
                  )
                }
                className="
                flex
                items-center
                gap-2
                rounded-xl
                p-1.5
                hover:bg-slate-100
                dark:hover:bg-slate-800
                "
              >

                <div
                  className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-600
                  text-sm
                  font-bold
                  text-white
                  "
                >
                  O
                </div>

                <div className="hidden text-left md:block">

                  <p className="text-xs font-semibold">
                    Officer
                  </p>

                  <p className="text-[10px] text-slate-500">
                    Inspector
                  </p>

                </div>

                <ChevronDown
                  size={15}
                  className="
                  hidden
                  text-slate-500
                  md:block
                  "
                />

              </button>


              {profileOpen && (

                <div
                  className="
                  absolute
                  right-0
                  top-14
                  w-52
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-1.5
                  text-slate-700
                  shadow-2xl
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-slate-200
                  "
                >

                  <button
                    onClick={() =>
                      navigate("/settings")
                    }
                    className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-sm
                    hover:bg-slate-100
                    dark:hover:bg-slate-800
                    "
                  >
                    <User size={16} />
                    Profile
                  </button>


                  <button
                    onClick={() =>
                      navigate("/settings")
                    }
                    className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-sm
                    hover:bg-slate-100
                    dark:hover:bg-slate-800
                    "
                  >
                    <Settings size={16} />
                    Settings
                  </button>


                  <div
                    className="
                    my-1
                    border-t
                    border-slate-200
                    dark:border-slate-800
                    "
                  />


                  <button
                    onClick={logout}
                    className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-sm
                    text-red-500
                    hover:bg-red-50
                    dark:text-red-400
                    dark:hover:bg-red-950/40
                    "
                  >

                    <LogOut size={16} />

                    Logout

                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </header>


      {mobileOpen && (

        <div
          className="
          fixed
          inset-x-0
          top-[72px]
          z-40
          border-b
          border-slate-200
          bg-white
          p-3
          shadow-xl
          dark:border-slate-800
          dark:bg-slate-950
          lg:hidden
          "
        >

          <div className="space-y-1">

            {navItems.map(
              ([name, path]) => (

                <button
                  key={path}
                  onClick={() => {

                    navigate(path);

                    setMobileOpen(false);

                  }}
                  className="
                  w-full
                  rounded-lg
                  px-4
                  py-3
                  text-left
                  text-sm
                  font-medium
                  text-slate-600
                  hover:bg-slate-100
                  hover:text-blue-600
                  dark:text-slate-400
                  dark:hover:bg-slate-900
                  dark:hover:text-blue-400
                  "
                >
                  {name}
                </button>

              )
            )}

          </div>

        </div>

      )}

    </>

  );
}


export default Navbar;

