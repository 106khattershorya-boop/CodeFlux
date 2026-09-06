
import React from "react";

import {
  ArrowLeft,
  Printer,
  FileText
} from "lucide-react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  getReportById,
  getInspections
} from "../utils/storage";


function ReportPreview() {

  const navigate =
    useNavigate();

  const { id } =
    useParams();


  const report =
    getReportById(id);

  const inspections =
    getInspections();


  if (!report) {

    return (

      <div
        className="
        py-20
        text-center
        text-slate-900
        dark:text-white
        "
      >

        <FileText
          className="
          mx-auto
          text-slate-300
          dark:text-slate-700
          "
          size={45}
        />

        <h2 className="mt-5 text-xl font-bold">
          Report not found
        </h2>

        <button
          onClick={() =>
            navigate("/reports")
          }
          className="
          mt-5
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
          Back to Reports
        </button>

      </div>

    );

  }


  const printReport = () => {

    window.print();

  };


  return (

    <div className="mx-auto max-w-6xl">

      <div
        className="
        mb-6
        flex
        flex-wrap
        items-center
        justify-between
        gap-3
        print:hidden
        "
      >

        <button
          onClick={() =>
            navigate("/reports")
          }
          className="
          flex
          items-center
          gap-2
          text-sm
          text-slate-600
          hover:text-slate-900
          dark:text-slate-500
          dark:hover:text-white
          "
        >

          <ArrowLeft size={16} />

          Back to Reports

        </button>


        <button
          onClick={printReport}
          className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-slate-300
          px-4
          py-2.5
          text-sm
          font-bold
          text-slate-700
          hover:border-blue-500
          hover:text-blue-500
          dark:border-slate-700
          dark:text-slate-300
          dark:hover:text-blue-400
          "
        >

          <Printer size={17} />

          Print / Save PDF

        </button>

      </div>


      <div
        id="print-area"
        className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        text-slate-900
        shadow-sm
        md:p-10
        dark:border-slate-800
        dark:bg-slate-900
        dark:text-white
        dark:shadow-none
        "
      >

        <div
          className="
          flex
          flex-col
          justify-between
          gap-5
          border-b
          border-slate-200
          pb-7
          dark:border-slate-800
          md:flex-row
          "
        >

          <div>

            <div
              className="
              flex
              items-center
              gap-3
              "
            >

              <div
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-blue-600
                font-black
                text-white
                "
              >
                P
              </div>

              <h1 className="text-xl font-black">

                PackSure{" "}

                <span className="text-blue-600 dark:text-blue-400">
                  AI
                </span>

              </h1>

            </div>


            <h2
              className="
              mt-7
              text-3xl
              font-black
              "
            >
              {report.type}
            </h2>

            <p
              className="
              mt-2
              text-sm
              text-slate-500
              "
            >
              Report ID: {report.id}
            </p>

          </div>


          <div className="md:text-right">

            <p className="text-xs text-slate-500">
              Generated
            </p>

            <p className="mt-1 font-bold">
              {report.created}
            </p>

          </div>

        </div>


        <div
          className="
          mt-7
          grid
          gap-4
          md:grid-cols-3
          "
        >

          <div
            className="
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            p-5
            dark:border-slate-800
            dark:bg-slate-950
            "
          >

            <p className="text-xs text-slate-500">
              Inspections
            </p>

            <p className="mt-2 text-2xl font-black">
              {report.inspections}
            </p>

          </div>


          <div
            className="
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            p-5
            dark:border-slate-800
            dark:bg-slate-950
            "
          >

            <p className="text-xs text-slate-500">
              Average Score
            </p>

            <p
              className="
              mt-2
              text-2xl
              font-black
              text-emerald-600
              dark:text-emerald-400
              "
            >
              {report.score}%
            </p>

          </div>


          <div
            className="
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            p-5
            dark:border-slate-800
            dark:bg-slate-950
            "
          >

            <p className="text-xs text-slate-500">
              Period
            </p>

            <p className="mt-2 text-sm font-bold">
              {report.from}
              {" → "}
              {report.to}
            </p>

          </div>

        </div>


        <div className="mt-8 overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead
              className="
              border-b
              border-slate-200
              dark:border-slate-700
              "
            >

              <tr>

                <th className="px-4 py-4">
                  Inspection
                </th>

                <th className="px-4 py-4">
                  Product
                </th>

                <th className="px-4 py-4">
                  Category
                </th>

                <th className="px-4 py-4">
                  Score
                </th>

                <th className="px-4 py-4">
                  Status
                </th>

              </tr>

            </thead>


            <tbody>

              {inspections.map(item => (

                <tr
                  key={item.id}
                  className="
                  border-b
                  border-slate-200
                  dark:border-slate-800
                  "
                >

                  <td
                    className="
                    px-4
                    py-4
                    font-bold
                    "
                  >
                    {item.id}
                  </td>

                  <td className="px-4 py-4">
                    {item.product}
                  </td>

                  <td
                    className="
                    px-4
                    py-4
                    text-slate-500
                    dark:text-slate-400
                    "
                  >
                    {item.category}
                  </td>

                  <td className="px-4 py-4 font-bold">
                    {item.score}%
                  </td>

                  <td className="px-4 py-4">
                    {item.status}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        <div
          className="
          mt-8
          rounded-2xl
          border
          border-amber-200
          bg-amber-50
          p-5
          dark:border-amber-500/20
          dark:bg-amber-500/5
          "
        >

          <p
            className="
            text-xs
            leading-6
            text-slate-600
            dark:text-slate-400
            "
          >
            PackSure AI provides preliminary
            compliance screening and decision
            support. Final statutory assessment
            should be verified by an authorized
            officer against the applicable and
            current rules.
          </p>

        </div>

      </div>

    </div>

  );
}


export default ReportPreview;

