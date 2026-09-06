
import React, { useState } from "react";

import {
  ArrowLeft,
  CheckCircle2
} from "lucide-react";

import {
  Link,
  useNavigate
} from "react-router-dom";


function ForgotPassword() {

  const navigate = useNavigate();

  const [step, setStep] =
    useState(1);

  const [email, setEmail] =
    useState("");

  const [code, setCode] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirm, setConfirm] =
    useState("");

  const [error, setError] =
    useState("");


  const sendCode = e => {

    e.preventDefault();

    if (
      email !==
      "admin@legalmatrix.com"
    ) {

      setError(
        "This email is not registered."
      );

      return;
    }

    setError("");
    setStep(2);

  };


  const verifyCode = e => {

    e.preventDefault();

    if (code !== "123456") {

      setError(
        "Invalid verification code."
      );

      return;
    }

    setError("");
    setStep(3);

  };


  const resetPassword = e => {

    e.preventDefault();

    if (password.length < 6) {

      setError(
        "Password must contain at least 6 characters."
      );

      return;
    }

    if (password !== confirm) {

      setError(
        "Passwords do not match."
      );

      return;
    }


    localStorage.setItem(
      "legalMatrixPassword",
      password
    );

    setStep(4);

  };


  return (

    <div
      className="
        flex min-h-screen items-center
        justify-center
        bg-slate-100 px-5
        text-slate-900
        dark:bg-slate-950
        dark:text-white
      "
    >

      <div
        className="
          w-full max-w-md rounded-3xl
          border border-slate-200
          bg-white p-6 shadow-2xl
          md:p-8
          dark:border-slate-800
          dark:bg-slate-900
        "
      >

        {step < 4 && (

          <Link
            to="/login"
            className="
              mb-8 inline-flex items-center gap-2
              text-sm text-slate-500
              hover:text-blue-600
              dark:text-slate-400
              dark:hover:text-white
            "
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>

        )}


        {step === 1 && (

          <>

            <h1
              className="
                text-3xl font-black
                text-slate-900
                dark:text-white
              "
            >
              Forgot password?
            </h1>

            <p
              className="
                mt-2 text-sm
                text-slate-600
                dark:text-slate-500
              "
            >
              Enter your registered email address.
            </p>


            <form
              onSubmit={sendCode}
              className="mt-8 space-y-5"
            >

              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={e =>
                  setEmail(e.target.value)
                }
                className="
                  w-full rounded-xl
                  border border-slate-300
                  bg-white px-4 py-3.5
                  text-slate-900
                  outline-none
                  placeholder:text-slate-400
                  focus:border-blue-500
                  dark:border-slate-700
                  dark:bg-slate-950
                  dark:text-white
                "
              />


              {error && (

                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>

              )}


              <button
                className="
                  w-full rounded-xl
                  bg-blue-600 py-3.5
                  font-bold text-white
                  hover:bg-blue-500
                "
              >
                Send Verification Code
              </button>

            </form>

          </>

        )}


        {step === 2 && (

          <>

            <h1
              className="
                text-3xl font-black
                text-slate-900
                dark:text-white
              "
            >
              Verify email
            </h1>

            <p
              className="
                mt-2 text-sm
                text-slate-600
                dark:text-slate-500
              "
            >
              Demo verification code:

              <span
                className="
                  ml-1 font-bold
                  text-blue-600
                  dark:text-blue-400
                "
              >
                123456
              </span>
            </p>


            <form
              onSubmit={verifyCode}
              className="mt-8 space-y-5"
            >

              <input
                required
                placeholder="6-digit code"
                value={code}
                onChange={e =>
                  setCode(e.target.value)
                }
                className="
                  w-full rounded-xl
                  border border-slate-300
                  bg-white px-4 py-3.5
                  text-slate-900
                  outline-none
                  focus:border-blue-500
                  dark:border-slate-700
                  dark:bg-slate-950
                  dark:text-white
                "
              />


              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}


              <button
                className="
                  w-full rounded-xl
                  bg-blue-600 py-3.5
                  font-bold text-white
                  hover:bg-blue-500
                "
              >
                Verify Code
              </button>

            </form>

          </>

        )}


        {step === 3 && (

          <>

            <h1
              className="
                text-3xl font-black
                text-slate-900
                dark:text-white
              "
            >
              New password
            </h1>

            <p
              className="
                mt-2 text-sm
                text-slate-600
                dark:text-slate-500
              "
            >
              Create a new password.
            </p>


            <form
              onSubmit={resetPassword}
              className="mt-8 space-y-4"
            >

              <input
                type="password"
                required
                placeholder="New password"
                value={password}
                onChange={e =>
                  setPassword(e.target.value)
                }
                className="
                  w-full rounded-xl
                  border border-slate-300
                  bg-white px-4 py-3.5
                  text-slate-900
                  outline-none
                  focus:border-blue-500
                  dark:border-slate-700
                  dark:bg-slate-950
                  dark:text-white
                "
              />


              <input
                type="password"
                required
                placeholder="Confirm password"
                value={confirm}
                onChange={e =>
                  setConfirm(e.target.value)
                }
                className="
                  w-full rounded-xl
                  border border-slate-300
                  bg-white px-4 py-3.5
                  text-slate-900
                  outline-none
                  focus:border-blue-500
                  dark:border-slate-700
                  dark:bg-slate-950
                  dark:text-white
                "
              />


              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}


              <button
                className="
                  w-full rounded-xl
                  bg-blue-600 py-3.5
                  font-bold text-white
                  hover:bg-blue-500
                "
              >
                Reset Password
              </button>

            </form>

          </>

        )}


        {step === 4 && (

          <div className="text-center">

            <CheckCircle2
              size={55}
              className="
                mx-auto
                text-emerald-500
                dark:text-emerald-400
              "
            />

            <h1
              className="
                mt-5 text-2xl font-black
                text-slate-900
                dark:text-white
              "
            >
              Password updated
            </h1>

            <p
              className="
                mt-2 text-sm
                text-slate-600
                dark:text-slate-500
              "
            >
              Your password has been changed
              successfully.
            </p>


            <button
              onClick={() => navigate("/login")}
              className="
                mt-7 w-full rounded-xl
                bg-blue-600 py-3.5
                font-bold text-white
                hover:bg-blue-500
              "
            >
              Go to Login
            </button>

          </div>

        )}

      </div>

    </div>

  );
}


export default ForgotPassword;

