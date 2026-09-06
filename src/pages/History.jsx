
import React, {
  useEffect,
  useState
} from "react";

import {
  Search,
  Eye,
  Plus
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";

import {
  getInspections
} from "../utils/storage";


function History() {

  const navigate = useNavigate();

  const [inspections, setInspections] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");


  useEffect(() => {

    setInspections(
      getInspections()
    );

  }, []);


  const filtered =
    inspections.filter(item => {

      const matchesSearch =
        item.id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.product
          .toLowerCase()
          .includes(search.toLowerCase());


      const matchesFilter =
        filter === "All" ||
        item.status === filter;


      return (
        matchesSearch &&
        matchesFilter
      );

    });


  return (

    <div className="mx-auto max-w-7xl">

      <div
        className="
          flex flex-col justify-between gap-4
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
            Records
          </p>

          <h1
            className="
              mt-2 text-3xl font-black
              text-slate-900 dark:text-white
            "
          >
            Inspection History
          </h1>

        </div>


        <button
          onClick={() => navigate("/inspection/new")}
          className="
            flex items-center justify-center gap-2
            rounded-xl bg-blue-600 px-5 py-3
            text-sm font-bold text-white
            hover:bg-blue-500
          "
        >

          <Plus size={17} />

          New Inspection

        </button>

      </div>


      <div
        className="
          mt-7 rounded-2xl border border-slate-200
          bg-white p-4 shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
          dark:shadow-none
        "
      >

        <div
          className="
            flex flex-col gap-3 md:flex-row
          "
        >

          <div className="relative flex-1">

            <Search
              size={18}
              className="
                absolute left-3 top-1/2
                -translate-y-1/2
                text-slate-400
                dark:text-slate-600
              "
            />

            <input
              value={search}
              onChange={e =>
                setSearch(e.target.value)
              }
              placeholder="Search inspections..."
              className="
                w-full rounded-xl
                border border-slate-300
                bg-slate-50 py-3 pl-10 pr-4
                text-sm text-slate-900
                outline-none placeholder:text-slate-400
                focus:border-blue-500
                dark:border-slate-700
                dark:bg-slate-950
                dark:text-white
                dark:placeholder:text-slate-600
              "
            />

          </div>


          <select
            value={filter}
            onChange={e =>
              setFilter(e.target.value)
            }
            className="
              rounded-xl border border-slate-300
              bg-slate-50 px-4 py-3
              text-sm text-slate-900
              outline-none focus:border-blue-500
              dark:border-slate-700
              dark:bg-slate-950
              dark:text-white
            "
          >

            <option>All</option>
            <option>Compliant</option>
            <option>Review</option>
            <option>High Risk</option>

          </select>

        </div>

      </div>


      <div
        className="
          mt-5 overflow-hidden rounded-2xl
          border border-slate-200
          bg-white shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
          dark:shadow-none
        "
      >

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
                  Inspection ID
                </th>

                <th className="px-5 py-4">
                  Product
                </th>

                <th className="px-5 py-4">
                  Category
                </th>

                <th className="px-5 py-4">
                  Date
                </th>

                <th className="px-5 py-4">
                  Score
                </th>

                <th className="px-5 py-4">
                  Status
                </th>

                <th className="px-5 py-4">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filtered.map(item => (

                <tr
                  key={item.id}
                  className="
                    border-b border-slate-200
                    last:border-0
                    hover:bg-slate-50
                    dark:border-slate-800
                    dark:hover:bg-slate-950
                  "
                >

                  <td
                    className="
                      px-5 py-4 font-bold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    {item.id}
                  </td>

                  <td
                    className="
                      px-5 py-4
                      text-slate-800
                      dark:text-slate-200
                    "
                  >
                    {item.product}
                  </td>

                  <td
                    className="
                      px-5 py-4
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {item.category}
                  </td>

                  <td
                    className="
                      px-5 py-4
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {item.date}
                  </td>

                  <td
                    className="
                      px-5 py-4 font-bold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    {item.score}%
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`
                        rounded-full px-3 py-1
                        text-xs font-bold
                        ${
                          item.status === "Compliant"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : item.status === "High Risk"
                            ? "bg-red-500/10 text-red-600 dark:text-red-400"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        }
                      `}
                    >
                      {item.status}
                    </span>

                  </td>


                  <td className="px-5 py-4">

                    <button
                      onClick={() =>
                        navigate(
                          "/inspection/report",
                          {
                            state: {
                              inspectionId: item.id,
                              category: item.category,
                              location: item.location,
                              remarks: item.remarks
                            }
                          }
                        )
                      }
                      className="
                        inline-flex items-center gap-2
                        rounded-lg border
                        border-slate-300 px-3 py-2
                        text-xs font-bold
                        text-slate-600
                        hover:border-blue-500
                        hover:text-blue-600
                        dark:border-slate-700
                        dark:text-slate-400
                        dark:hover:text-blue-400
                      "
                    >

                      <Eye size={14} />

                      View

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}


export default History;

