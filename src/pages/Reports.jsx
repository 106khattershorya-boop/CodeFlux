import React, {
  useEffect,
  useState
} from "react";

import {
  FileText,
  Download,
  Eye,
  Plus,
  X,
  CheckCircle2
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";

import {
  getReports,
  saveReport,
  getInspections
} from "../utils/storage";


function Reports() {

  const navigate = useNavigate();

  const [reports, setReports] =
    useState([]);

  const [reportType, setReportType] =
    useState("Compliance Summary");

  const [from, setFrom] =
    useState("");

  const [to, setTo] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);


  useEffect(() => {

    setReports(
      getReports()
    );

  }, []);


  const generateReport = () => {

    const inspections =
      getInspections();


    const report = {

      id:
        "RPT-" +
        Date.now()
          .toString()
          .slice(-7),

      type: reportType,

      from:
        from || "All dates",

      to:
        to || "Present",

      created:
        new Date()
          .toLocaleDateString(
            "en-IN"
          ),

      inspections:
        inspections.length,

      score:
        inspections.length
          ? Math.round(
              inspections.reduce(
                (sum, item) =>
                  sum + item.score,
                0
              ) /
                inspections.length
            )
          : 0,

      status: "Generated"

    };


    saveReport(report);

    setReports(
      getReports()
    );

    setShowModal(false);

  };


  const downloadReport = report => {

    const inspections =
      getInspections();


    const html = `

      <!DOCTYPE html>

      <html>

      <head>

        <title>
          ${report.id} - PackSure AI
        </title>

        <style>

          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #111827;
          }

          h1 {
            color: #1d4ed8;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 25px;
          }

          th, td {
            border: 1px solid #d1d5db;
            padding: 10px;
            text-align: left;
          }

          th {
            background: #f3f4f6;
          }

        </style>

      </head>

      <body>

        <h1>PackSure AI</h1>

        <h2>${report.type}</h2>

        <p>
          Report ID: ${report.id}
        </p>

        <p>
          Generated: ${report.created}
        </p>

        <p>
          Period: ${report.from}
          to
          ${report.to}
        </p>

        <p>
          Total Inspections:
          ${report.inspections}
        </p>

        <p>
          Average Compliance:
          ${report.score}%
        </p>

        <table>

          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Score</th>
            <th>Status</th>
          </tr>

          ${inspections
            .map(
              item => `

              <tr>

                <td>
                  ${item.id}
                </td>

                <td>
                  ${item.product}
                </td>

                <td>
                  ${item.category}
                </td>

                <td>
                  ${item.score}%
                </td>

                <td>
                  ${item.status}
                </td>

              </tr>

            `
            )
            .join("")}

        </table>

        <br />

        <p>
          PackSure AI provides preliminary
          screening and decision support.
          Final statutory assessment should
          be verified by an authorized officer.
        </p>

      </body>

      </html>

    `;


    const blob =
      new Blob(
        [html],
        {
          type:
            "text/html"
        }
      );


    const url =
      URL.createObjectURL(
        blob
      );


    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      `${report.id}.html`;

    link.click();

    URL.revokeObjectURL(url);

  };


  return (

    <div className="mx-auto max-w-7xl">

      <div
        className="
        flex
        flex-col
        justify-between
        gap-4
        md:flex-row
        md:items-center
        "
      >

        <div>

          <p
            className="
            text-xs
            font-bold
            uppercase
            tracking-widest
            text-blue-600
            dark:text-blue-400
            "
          >
            Documents
          </p>

          <h1
            className="
            mt-2
            text-3xl
            font-black
            text-slate-900
            dark:text-white
            "
          >
            Reports
          </h1>

          <p
            className="
            mt-2
            text-sm
            text-slate-600
            dark:text-slate-500
            "
          >
            Generate, view and export inspection
            reports.
          </p>

        </div>


        <button
          onClick={() =>
            setShowModal(true)
          }
          className="
          flex
          items-center
          justify-center
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

          <Plus size={17} />

          Generate Report

        </button>

      </div>


      <div
        className="
        mt-7
        rounded-3xl
        border
        border-blue-200
        bg-blue-50
        p-6
        dark:border-blue-500/20
        dark:bg-blue-500/5
        "
      >

        <div className="flex items-start gap-4">

          <div
            className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-blue-100
            text-blue-600
            dark:bg-blue-500/10
            dark:text-blue-400
            "
          >

            <FileText size={21} />

          </div>


          <div>

            <h2
              className="
              font-bold
              text-slate-900
              dark:text-white
              "
            >
              Compliance Reports
            </h2>

            <p
              className="
              mt-1
              max-w-2xl
              text-sm
              leading-6
              text-slate-600
              dark:text-slate-500
              "
            >
              Create inspection summaries from
              your saved compliance records and
              export them directly from the browser.
            </p>

          </div>

        </div>

      </div>


      <div
        className="
        mt-6
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
        dark:shadow-none
        "
      >

        <div
          className="
          border-b
          border-slate-200
          p-5
          dark:border-slate-800
          "
        >

          <h2
            className="
            font-bold
            text-slate-900
            dark:text-white
            "
          >
            Generated Reports
          </h2>

        </div>


        {reports.length === 0 ? (

          <div
            className="
            p-12
            text-center
            "
          >

            <FileText
              size={40}
              className="
              mx-auto
              text-slate-300
              dark:text-slate-700
              "
            />

            <h3
              className="
              mt-4
              font-bold
              text-slate-900
              dark:text-white
              "
            >
              No reports generated yet
            </h3>

            <p
              className="
              mt-2
              text-sm
              text-slate-600
              dark:text-slate-500
              "
            >
              Click "Generate Report" to
              create your first report.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table
              className="
              w-full
              text-left
              text-sm
              "
            >

              <thead
                className="
                border-b
                border-slate-200
                bg-slate-50
                text-xs
                uppercase
                tracking-wider
                text-slate-500
                dark:border-slate-800
                dark:bg-slate-950
                dark:text-slate-500
                "
              >

                <tr>

                  <th className="px-5 py-4">
                    Report ID
                  </th>

                  <th className="px-5 py-4">
                    Type
                  </th>

                  <th className="px-5 py-4">
                    Generated
                  </th>

                  <th className="px-5 py-4">
                    Inspections
                  </th>

                  <th className="px-5 py-4">
                    Score
                  </th>

                  <th className="px-5 py-4">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {reports.map(report => (

                  <tr
                    key={report.id}
                    className="
                    border-b
                    border-slate-200
                    last:border-0
                    dark:border-slate-800
                    "
                  >

                    <td
                      className="
                      px-5
                      py-4
                      font-bold
                      text-slate-900
                      dark:text-white
                      "
                    >
                      {report.id}
                    </td>

                    <td
                      className="
                      px-5
                      py-4
                      text-slate-700
                      dark:text-slate-200
                      "
                    >
                      {report.type}
                    </td>

                    <td
                      className="
                      px-5
                      py-4
                      text-slate-500
                      "
                    >
                      {report.created}
                    </td>

                    <td
                      className="
                      px-5
                      py-4
                      text-slate-700
                      dark:text-slate-200
                      "
                    >
                      {report.inspections}
                    </td>

                    <td
                      className="
                      px-5
                      py-4
                      font-bold
                      text-emerald-600
                      dark:text-emerald-400
                      "
                    >
                      {report.score}%
                    </td>

                    <td className="px-5 py-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            navigate(
                              `/reports/view/${report.id}`
                            )
                          }
                          className="
                          rounded-lg
                          border
                          border-slate-300
                          p-2
                          text-slate-500
                          hover:border-blue-500
                          hover:text-blue-500
                          dark:border-slate-700
                          dark:text-slate-400
                          dark:hover:text-blue-400
                          "
                          title="View"
                        >

                          <Eye size={16} />

                        </button>


                        <button
                          onClick={() =>
                            downloadReport(
                              report
                            )
                          }
                          className="
                          rounded-lg
                          border
                          border-slate-300
                          p-2
                          text-slate-500
                          hover:border-emerald-500
                          hover:text-emerald-500
                          dark:border-slate-700
                          dark:text-slate-400
                          dark:hover:text-emerald-400
                          "
                          title="Download"
                        >

                          <Download size={16} />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {showModal && (

        <div
          className="
          fixed
          inset-0
          z-[100]
          flex
          items-center
          justify-center
          bg-black/50
          p-5
          backdrop-blur-sm
          dark:bg-black/80
          "
        >

          <div
            className="
            w-full
            max-w-lg
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            text-slate-900
            shadow-2xl
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-white
            "
          >

            <div
              className="
              flex
              items-center
              justify-between
              "
            >

              <h2 className="text-xl font-black">
                Generate Report
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="
                rounded-lg
                p-2
                text-slate-500
                hover:bg-slate-100
                hover:text-slate-900
                dark:hover:bg-slate-800
                dark:hover:text-white
                "
              >

                <X size={18} />

              </button>

            </div>


            <div className="mt-6 space-y-5">

              <div>

                <label
                  className="
                  mb-2
                  block
                  text-sm
                  font-bold
                  "
                >
                  Report Type
                </label>

                <select
                  value={reportType}
                  onChange={e =>
                    setReportType(
                      e.target.value
                    )
                  }
                  className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  px-4
                  py-3
                  text-slate-900
                  outline-none
                  focus:border-blue-500
                  dark:border-slate-700
                  dark:bg-slate-950
                  dark:text-white
                  "
                >

                  <option>
                    Compliance Summary
                  </option>

                  <option>
                    Inspection Report
                  </option>

                  <option>
                    Risk Analysis
                  </option>

                  <option>
                    Monthly Compliance Report
                  </option>

                </select>

              </div>


              <div
                className="
                grid
                gap-4
                sm:grid-cols-2
                "
              >

                <div>

                  <label
                    className="
                    mb-2
                    block
                    text-sm
                    font-bold
                    "
                  >
                    From
                  </label>

                  <input
                    type="date"
                    value={from}
                    onChange={e =>
                      setFrom(
                        e.target.value
                      )
                    }
                    className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    px-4
                    py-3
                    text-sm
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

                  <label
                    className="
                    mb-2
                    block
                    text-sm
                    font-bold
                    "
                  >
                    To
                  </label>

                  <input
                    type="date"
                    value={to}
                    onChange={e =>
                      setTo(
                        e.target.value
                      )
                    }
                    className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    px-4
                    py-3
                    text-sm
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


              <button
                onClick={generateReport}
                className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                py-3.5
                font-bold
                text-white
                hover:bg-blue-500
                "
              >

                <CheckCircle2 size={18} />

                Generate Report

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}


export default Reports;

