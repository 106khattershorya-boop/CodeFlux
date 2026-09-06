
import React, { useState } from "react";

import {
  Eye,
  EyeOff,
  ShieldCheck
} from "lucide-react";

import {
  useNavigate,
  Link
} from "react-router-dom";


function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("admin@legalmatrix.com");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [remember, setRemember] =
    useState(false);

  const [error, setError] =
    useState("");


  const login = e => {

    e.preventDefault();

    const savedPassword =
      localStorage.getItem(
        "legalMatrixPassword"
      ) || "Admin@123";


    if (
      email === "admin@legalmatrix.com" &&
      password === savedPassword
    ) {

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      if (remember) {
        localStorage.setItem(
          "rememberMe",
          "true"
        );
      }

      navigate("/dashboard");

    } else {

      setError(
        "Invalid email or password."
      );

    }

  };


  return (

    <div
      className="
        min-h-screen
        bg-slate-100
        text-slate-900
        dark:bg-slate-950
        dark:text-white
      "
    >

      <div
        className="
          grid min-h-screen lg:grid-cols-2
        "
      >

        <div
          className="
            hidden flex-col justify-between
            border-r border-slate-200
            bg-white p-10
            lg:flex
            dark:border-slate-800
            dark:bg-slate-950
          "
        >

          <div>

            <div className="flex items-center gap-3">

              <div
                className="
                  flex h-11 w-11 items-center
                  justify-center rounded-xl
                  bg-blue-600 font-black
                  text-white
                  shadow-lg shadow-blue-600/20
                "
              >
                P
              </div>

              <span
                className="
                  text-xl font-extrabold
                  text-slate-900
                  dark:text-white
                "
              >
                PackSure{" "}
                <span className="text-blue-500 dark:text-blue-400">
                  AI
                </span>
              </span>

            </div>

          </div>


          <div className="max-w-lg">

            <div
              className="
                mb-6 inline-flex items-center gap-2
                rounded-full border
                border-blue-200 bg-blue-50
                px-4 py-2 text-xs
                text-blue-600
                dark:border-blue-500/20
                dark:bg-blue-500/5
                dark:text-blue-400
              "
            >

              <ShieldCheck size={15} />

              Smart Compliance Screening

            </div>


            <h1
              className="
                text-5xl font-black leading-tight
                text-slate-900
                dark:text-white
              "
            >
              Smarter
              <br />

              <span className="text-blue-600 dark:text-blue-500">
                Legal Metrology
              </span>

              <br />

              Inspections.
            </h1>


            <p
              className="
                mt-6 leading-7
                text-slate-600
                dark:text-slate-500
              "
            >
              AI-assisted OCR, information extraction
              and configurable compliance rules for
              packaged commodities.
            </p>

          </div>


          <p className="text-xs text-slate-500 dark:text-slate-600">
            SIH 2026 • PackSure AI
          </p>

        </div>


        <div
          className="
            flex items-center justify-center
            bg-slate-50 px-5 py-10
            dark:bg-slate-900
          "
        >

          <div className="w-full max-w-md">

            <div className="mb-8 lg:hidden">

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex h-10 w-10 items-center
                    justify-center rounded-xl
                    bg-blue-600 font-black text-white
                  "
                >
                  P
                </div>

                <span
                  className="
                    text-xl font-bold
                    text-slate-900
                    dark:text-white
                  "
                >
                  PackSure{" "}
                  <span className="text-blue-500 dark:text-blue-400">
                    AI
                  </span>
                </span>

              </div>

            </div>


            <h2
              className="
                text-3xl font-black
                text-slate-900
                dark:text-white
              "
            >
              Welcome back
            </h2>

            <p
              className="
                mt-2 text-sm
                text-slate-600
                dark:text-slate-500
              "
            >
              Sign in to your inspection dashboard.
            </p>


            <form
              onSubmit={login}
              className="mt-8 space-y-5"
            >

              <div>

                <label
                  className="
                    mb-2 block text-sm font-medium
                    text-slate-700
                    dark:text-slate-200
                  "
                >
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={e =>
                    setEmail(e.target.value)
                  }
                  className="
                    w-full rounded-xl
                    border border-slate-300
                    bg-white px-4 py-3.5
                    text-slate-900
                    outline-none transition
                    focus:border-blue-500
                    dark:border-slate-700
                    dark:bg-slate-950
                    dark:text-white
                  "
                />

              </div>


              <div>

                <label
                  className="
                    mb-2 block text-sm font-medium
                    text-slate-700
                    dark:text-slate-200
                  "
                >
                  Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={e =>
                      setPassword(e.target.value)
                    }
                    className="
                      w-full rounded-xl
                      border border-slate-300
                      bg-white px-4 py-3.5 pr-12
                      text-slate-900
                      outline-none
                      focus:border-blue-500
                      dark:border-slate-700
                      dark:bg-slate-950
                      dark:text-white
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="
                      absolute right-3 top-1/2
                      -translate-y-1/2
                      text-slate-400
                      hover:text-slate-700
                      dark:text-slate-500
                      dark:hover:text-white
                    "
                  >

                    {showPassword
                      ? <EyeOff size={18} />
                      : <Eye size={18} />
                    }

                  </button>

                </div>

              </div>


              <div
                className="
                  flex items-center justify-between
                "
              >

                <label
                  className="
                    flex items-center gap-2 text-sm
                    text-slate-600
                    dark:text-slate-400
                  "
                >

                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={e =>
                      setRemember(e.target.checked)
                    }
                  />

                  Remember me

                </label>


                <Link
                  to="/forgot-password"
                  className="
                    text-sm text-blue-600
                    hover:text-blue-500
                    dark:text-blue-400
                    dark:hover:text-blue-300
                  "
                >
                  Forgot password?
                </Link>

              </div>


              {error && (

                <div
                  className="
                    rounded-xl border
                    border-red-200
                    bg-red-50 p-3
                    text-sm text-red-600
                    dark:border-red-500/20
                    dark:bg-red-500/5
                    dark:text-red-400
                  "
                >
                  {error}
                </div>

              )}


              <button
                type="submit"
                className="
                  w-full rounded-xl
                  bg-blue-600 py-3.5
                  font-bold text-white
                  shadow-lg shadow-blue-600/20
                  transition hover:bg-blue-500
                "
              >
                Sign In
              </button>

            </form>


            <div
              className="
                mt-8 rounded-xl border
                border-slate-200
                bg-white p-4
                dark:border-slate-800
                dark:bg-slate-950
              "
            >

              <p
                className="
                  text-xs font-bold
                  text-slate-600
                  dark:text-slate-400
                "
              >
                Demo credentials
              </p>

              <p
                className="
                  mt-2 text-xs
                  text-slate-500
                  dark:text-slate-600
                "
              >
                admin@legalmatrix.com
                <br />
                Password: Admin@123
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}


export default Login;

