
import React from "react";

import {
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ShieldCheck
} from "lucide-react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";


function InspectionReport() {

  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state || {};

  const score = 87;

  const checks = [
    [
      "Manufacturer / Packer / Importer details",
      "Detected",
      "Compliant"
    ],
    [
      "Country of origin where applicable",
      "Detected",
      "Compliant"
    ],
    [
      "Common / generic commodity name",
      "Detected",
      "Compliant"
    ],
    [
      "Net quantity",
      "Detected",
      "Compliant"
    ],
    [
      "MRP declaration",
      "Detected",
      "Compliant"
    ],
    [
      "Manufacture / packing information",
      "Review",
      "Review"
    ],
    [
      "Consumer care details",
      "Detected",
      "Compliant"
    ],
    [
      "Legibility / placement",
      "Review",
      "Review"
    ]
  ];

  return (
    <div className="mx-auto max-w-6xl">

      <button
        onClick={() => navigate("/inspection/new")}
        className="
          mb-6 flex items-center gap-2 text-sm
          text-slate-500 transition
          hover:text-blue-600
          dark:text-slate-400
          dark:hover:text-white
        "
      >
        <ArrowLeft size={16} />
        New Inspection
      </button>


      <div
        className="
          flex flex-col justify-between gap-5
          md:flex-row md:items-center
        "
      >

        <div>

          <p
            className="
              text-xs font-bold uppercase tracking-widest
              text-blue-600 dark:text-blue-400
            "
          >
            Screening Result
          </p>

          <h1
            className="
              mt-2 text-3xl font-black
              text-slate-900 dark:text-white
            "
          >
            Inspection Report
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {data.inspectionId || "INS-DEMO"}
          </p>

        </div>


        <div
          className="
            flex items-center gap-4 rounded-2xl
            border border-emerald-200 bg-emerald-50
            px-5 py-4
            dark:border-emerald-500/20
            dark:bg-emerald-500/5
          "
        >

          <div
            className="
              flex h-12 w-12 items-center justify-center
              rounded-xl bg-emerald-100
              text-emerald-600
              dark:bg-emerald-500/10
              dark:text-emerald-400
            "
          >
            <ShieldCheck size={25} />
          </div>

          <div>

            <p className="text-xs text-slate-500">
              Compliance Score
            </p>

            <p
              className="
                text-2xl font-black
                text-emerald-600
                dark:text-emerald-400
              "
            >
              {score}%
            </p>

          </div>

        </div>

      </div>


      <div
        className="
          mt-7 grid gap-5 md:grid-cols-3
        "
      >

        <div
          className="
            rounded-2xl border border-slate-200
            bg-white p-5 shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
            dark:shadow-none
          "
        >
          <p className="text-xs text-slate-500">
            Category
          </p>

          <p className="mt-2 font-bold text-slate-900 dark:text-white">
            {data.category || "Auto Detected"}
          </p>
        </div>


        <div
          className="
            rounded-2xl border border-slate-200
            bg-white p-5 shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
            dark:shadow-none
          "
        >
          <p className="text-xs text-slate-500">
            Location
          </p>

          <p className="mt-2 font-bold text-slate-900 dark:text-white">
            {data.location || "Not specified"}
          </p>
        </div>


        <div
          className="
            rounded-2xl border border-slate-200
            bg-white p-5 shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
            dark:shadow-none
          "
        >
          <p className="text-xs text-slate-500">
            Risk Level
          </p>

          <p className="mt-2 font-bold text-amber-600 dark:text-amber-400">
            Medium
          </p>
        </div>

      </div>


      {data.images?.length > 0 && (

        <div
          className="
            mt-5 rounded-2xl border border-slate-200
            bg-white p-5 shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
            dark:shadow-none
          "
        >

          <h2 className="font-bold text-slate-900 dark:text-white">
            Inspection Evidence
          </h2>

          <div
            className="
              mt-4 grid grid-cols-2 gap-4 md:grid-cols-4
            "
          >

            {data.images.map((image, index) => (

              <img
                key={index}
                src={image.url}
                alt="Inspection evidence"
                className="
                  h-40 w-full rounded-xl object-cover
                  ring-1 ring-slate-200
                  dark:ring-slate-700
                "
              />

            ))}

          </div>

        </div>

      )}


      <div
        className="
          mt-5 overflow-hidden rounded-2xl
          border border-slate-200 bg-white shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
          dark:shadow-none
        "
      >

        <div
          className="
            border-b border-slate-200 p-5
            dark:border-slate-800
          "
        >

          <h2 className="font-bold text-slate-900 dark:text-white">
            Compliance Matrix
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            AI-assisted extraction with configurable compliance checks.
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead
              className="
                border-b border-slate-200
                bg-slate-50 text-xs uppercase
                tracking-wider text-slate-500
                dark:border-slate-800
                dark:bg-slate-950
              "
            >

              <tr>

                <th className="px-5 py-4">
                  Declaration
                </th>

                <th className="px-5 py-4">
                  Detection
                </th>

                <th className="px-5 py-4">
                  Result
                </th>

              </tr>

            </thead>


            <tbody>

              {checks.map(
                ([name, detection, result]) => (

                  <tr
                    key={name}
                    className="
                      border-b border-slate-200
                      last:border-0
                      dark:border-slate-800
                      hover:bg-slate-50
                      dark:hover:bg-slate-950/50
                    "
                  >

                    <td
                      className="
                        px-5 py-4 font-medium
                        text-slate-900
                        dark:text-slate-100
                      "
                    >
                      {name}
                    </td>

                    <td
                      className="
                        px-5 py-4 text-slate-500
                        dark:text-slate-400
                      "
                    >
                      {detection}
                    </td>

                    <td className="px-5 py-4">

                      {result === "Compliant" ? (

                        <span
                          className="
                            inline-flex items-center gap-2
                            rounded-full bg-emerald-500/10
                            px-3 py-1 text-xs font-bold
                            text-emerald-600
                            dark:text-emerald-400
                          "
                        >
                          <CheckCircle2 size={14} />
                          Compliant
                        </span>

                      ) : (

                        <span
                          className="
                            inline-flex items-center gap-2
                            rounded-full bg-amber-500/10
                            px-3 py-1 text-xs font-bold
                            text-amber-600
                            dark:text-amber-400
                          "
                        >
                          <AlertTriangle size={14} />
                          Review
                        </span>

                      )}

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>


      {data.remarks && (

        <div
          className="
            mt-5 rounded-2xl border border-slate-200
            bg-white p-5 shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
            dark:shadow-none
          "
        >

          <h3 className="font-bold text-slate-900 dark:text-white">
            Officer Remarks
          </h3>

          <p
            className="
              mt-2 text-sm leading-6
              text-slate-600
              dark:text-slate-400
            "
          >
            {data.remarks}
          </p>

        </div>

      )}


      <div
        className="
          mt-5 flex gap-3 rounded-2xl
          border border-amber-200 bg-amber-50 p-5
          dark:border-amber-500/20
          dark:bg-amber-500/5
        "
      >

        <AlertTriangle
          className="shrink-0 text-amber-600 dark:text-amber-400"
          size={20}
        />

        <p
          className="
            text-xs leading-6
            text-slate-600
            dark:text-slate-400
          "
        >
          PackSure AI provides preliminary screening and decision support.
          Final statutory assessment should be verified by an authorized
          officer against the applicable and current rules.
        </p>

      </div>

    </div>
  );
}


export default InspectionReport;

