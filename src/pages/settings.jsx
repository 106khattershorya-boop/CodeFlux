
import React, {
  useState
} from "react";

import {
  User,
  Bell,
  Shield,
  Save
} from "lucide-react";


function Settings() {

  const [name, setName] =
    useState("Inspection Officer");

  const [email, setEmail] =
    useState(
      "admin@legalmatrix.com"
    );

  const [notifications, setNotifications] =
    useState(true);

  const [saved, setSaved] =
    useState(false);


  const save = () => {

    localStorage.setItem(
      "packsureOfficerName",
      name
    );

    localStorage.setItem(
      "packsureOfficerEmail",
      email
    );

    setSaved(true);

    setTimeout(
      () => setSaved(false),
      2000
    );

  };


  return (

    <div className="mx-auto max-w-4xl">

      <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
        Configuration
      </p>

      <h1 className="mt-2 text-3xl font-black">
        Settings
      </h1>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Manage your PackSure AI preferences.
      </p>


      <div
        className="
        mt-7
        space-y-5
        "
      >

        <div
          className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
          "
        >

          <div className="flex items-center gap-3">

            <User
              className="text-blue-600 dark:text-blue-400"
              size={20}
            />

            <h2 className="font-bold">
              Officer Profile
            </h2>

          </div>


          <div
            className="
            mt-6
            grid
            gap-4
            md:grid-cols-2
            "
          >

            <div>

              <label className="mb-2 block text-sm font-medium">
                Name
              </label>

              <input
                value={name}
                onChange={e =>
                  setName(
                    e.target.value
                  )
                }
                className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                py-3
                text-slate-900
                outline-none
                focus:border-blue-500
                dark:border-slate-700
                dark:bg-slate-950
                dark:text-white
                "
              />

            </div>


            <div>

              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                value={email}
                onChange={e =>
                  setEmail(
                    e.target.value
                  )
                }
                className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                py-3
                text-slate-900
                outline-none
                focus:border-blue-500
                dark:border-slate-700
                dark:bg-slate-950
                dark:text-white
                "
              />

            </div>

          </div>

        </div>


        <div
          className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
          "
        >

          <div className="flex items-center gap-3">

            <Bell
              className="text-blue-600 dark:text-blue-400"
              size={20}
            />

            <h2 className="font-bold">
              Notifications
            </h2>

          </div>


          <div
            className="
            mt-5
            flex
            items-center
            justify-between
            "
          >

            <div>

              <p className="text-sm font-bold">
                Inspection alerts
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Receive notifications for
                important inspection events.
              </p>

            </div>


            <button
              onClick={() =>
                setNotifications(
                  !notifications
                )
              }
              className={`
              relative
              h-6
              w-11
              rounded-full
              transition
              ${
                notifications
                  ? "bg-blue-600"
                  : "bg-slate-300 dark:bg-slate-700"
              }
              `}
            >

              <span
                className={`
                absolute
                top-1
                h-4
                w-4
                rounded-full
                bg-white
                transition
                ${
                  notifications
                    ? "left-6"
                    : "left-1"
                }
                `}
              />

            </button>

          </div>

        </div>


        <div
          className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
          "
        >

          <div className="flex items-center gap-3">

            <Shield
              className="text-emerald-500 dark:text-emerald-400"
              size={20}
            />

            <h2 className="font-bold">
              Security
            </h2>

          </div>


          <p
            className="
            mt-4
            text-sm
            leading-6
            text-slate-600
            dark:text-slate-400
            "
          >
            Authentication is currently
            implemented as a frontend demo.
            Production deployment should use
            secure backend authentication,
            encrypted credentials and role-based
            access control.
          </p>

        </div>


        <button
          onClick={save}
          className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-blue-600
          px-5
          py-3
          text-sm
          font-bold
          text-white
          hover:bg-blue-500
          "
        >

          <Save size={17} />

          {saved
            ? "Saved Successfully"
            : "Save Changes"
          }

        </button>

      </div>

    </div>

  );
}


export default Settings;

