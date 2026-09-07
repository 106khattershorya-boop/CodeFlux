import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "http://localhost:8000";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@PackSureAI.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [forgotMsg, setForgotMsg] = useState(false);

  const fillDemoCredentials = () => {
    setEmail("admin@PackSureAI.com");
    setPassword("Admin@123");
    setError("");
  };

  const login = (e) => {
    e.preventDefault();
    setError("");
    setForgotMsg(false);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const savedPassword =
      localStorage.getItem("PackSureAIPassword") || "Admin@123";

    if (
      cleanEmail === "admin@packsureai.com" &&
      (cleanPassword === savedPassword || cleanPassword === "Admin@123")
    ) {
      try {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem(
          "packsure_user",
          JSON.stringify({
            name: "Inspection Officer",
            email: "admin@PackSureAI.com",
            role: "Statutory Inspector",
            department: "Legal Metrology"
          })
        );

        if (remember) {
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberMe");
        }

        window.dispatchEvent(new Event("packsure-auth-updated"));
        navigate("/dashboard");
      } catch (storageErr) {
        console.error("Auth storage error:", storageErr);
        navigate("/dashboard");
      }
    } else {
      setError("Invalid credentials. Use admin@PackSureAI.com / Admin@123");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT BRANDING PANEL (VISIBLE ON LARGE SCREENS) */}
        <div className="hidden flex-col justify-between border-r border-slate-200 bg-white p-12 lg:flex dark:border-slate-800 dark:bg-slate-950">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 font-black text-white shadow-lg shadow-blue-600/30">
                <ShieldCheck size={24} />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  PackSure <span className="text-blue-600 dark:text-blue-400">AI</span>
                </span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Regulatory Compliance System
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-lg">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300">
              <Sparkles size={14} className="text-blue-500" />
              <span>Smart Statutory Metrology Engine</span>
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white xl:text-5xl">
              Automated{" "}
              <span className="text-blue-600 dark:text-blue-500">
                Legal Metrology
              </span>
              <br />
              Compliance Screening.
            </h1>

            <p className="mt-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              AI-assisted OCR text recognition, commodity information extraction, and deterministic rule validation for packaged consumer goods.
            </p>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Legal Metrology Act (PCR 2011)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>FastAPI Vision Stack</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-600">
            <span>SIH 2026 • Regulatory Technology</span>
            <span>Version 2.4-Production</span>
          </div>
        </div>

        {/* RIGHT LOGIN FORM PANEL */}
        <div className="flex items-center justify-center bg-slate-50 px-5 py-10 dark:bg-slate-900 sm:px-10">
          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}
            <div className="mb-8 lg:hidden">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-black text-white shadow-md shadow-blue-600/30">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <span className="text-xl font-black text-slate-900 dark:text-white">
                    PackSure <span className="text-blue-600 dark:text-blue-400">AI</span>
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Inspection Portal
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Officer Authentication
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                Sign in to access the regulatory inspection command center.
              </p>
            </div>

            <form onSubmit={login} className="mt-8 space-y-4">
              {/* EMAIL */}
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-900 dark:text-white">
                  Officer Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="admin@PackSureAI.com"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs font-semibold text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white sm:text-sm"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-900 dark:text-white">
                    Access Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotMsg(!forgotMsg)}
                    className="text-[11px] font-bold text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-11 text-xs font-semibold text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* FORGOT PASSWORD ADVISORY */}
              {forgotMsg && (
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300">
                  <strong>Demo Mode Active:</strong> Standard credentials are registered as{" "}
                  <code className="rounded bg-white/80 px-1 py-0.5 font-mono text-[11px] dark:bg-black/30">
                    admin@PackSureAI.com
                  </code>{" "}
                  with password{" "}
                  <code className="rounded bg-white/80 px-1 py-0.5 font-mono text-[11px] dark:bg-black/30">
                    Admin@123
                  </code>
                  .
                </div>
              )}

              {/* REMEMBER ME */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950"
                  />
                  <span>Remember this workstation</span>
                </label>
              </div>

              {/* ERROR ALERT */}
              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-bold text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
                  {error}
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.99] sm:text-sm"
              >
                <span>Authenticate & Access Command Center</span>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </form>

            {/* DEMO CREDENTIALS SHORTCUT BOX */}
            <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Jury / SIH Demo Credentials
                </p>
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-600 transition hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:hover:bg-blue-900/50"
                >
                  Auto-Fill
                </button>
              </div>

              <div className="mt-2 space-y-0.5 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                <p>Email: <span className="text-slate-800 dark:text-slate-200">admin@PackSureAI.com</span></p>
                <p>Password: <span className="text-slate-800 dark:text-slate-200">Admin@123</span></p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
