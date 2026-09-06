
import React from "react";
import {
  ShieldCheck,
  ClipboardCheck,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  Plus,
  Bot,
  MapPin,
  Clock3,
  CheckCircle2,
  FileText,
  ScanLine,
  Sparkles,
  Activity,
  CircleAlert,
  ChevronRight
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

import { useNavigate } from "react-router-dom";
import { getInspections } from "../utils/storage";

const chartData = [
  { day: "Mon", score: 78 },
  { day: "Tue", score: 82 },
  { day: "Wed", score: 80 },
  { day: "Thu", score: 86 },
  { day: "Fri", score: 84 },
  { day: "Sat", score: 89 },
  { day: "Sun", score: 87 }
];

const riskData = [
  {
    label: "Compliant",
    value: 79,
    count: 987,
    dot: "bg-emerald-500"
  },
  {
    label: "Review",
    value: 15,
    count: 183,
    dot: "bg-amber-500"
  },
  {
    label: "High Risk",
    value: 6,
    count: 78,
    dot: "bg-rose-500"
  }
];

function Dashboard() {
  const navigate = useNavigate();

  const [inspections, setInspections] = React.useState([]);

  React.useEffect(() => {
    setInspections(getInspections());
  }, []);

  const recentInspections = inspections.slice(0, 4);

  return (
    <div className="min-h-screen space-y-6 pb-10">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

            <span className="
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-emerald-600
              dark:text-emerald-400
            ">
              System Operational
            </span>
          </div>

          <h1 className="
            text-3xl
            font-black
            tracking-tight
            text-slate-900
            dark:text-white
            md:text-4xl
          ">
            Compliance Command Center
          </h1>

          <p className="
            mt-1
            text-sm
            text-slate-500
            dark:text-slate-400
          ">
            Monitor inspections, compliance health and regulatory risks.
          </p>
        </div>

        <button
          onClick={() => navigate("/inspection/new")}
          className="
            group
            flex
            w-fit
            items-center
            gap-2
            rounded-xl
            bg-slate-950
            px-5
            py-3
            text-sm
            font-bold
            text-white
            shadow-lg
            shadow-slate-900/10
            transition
            hover:-translate-y-0.5
            hover:shadow-xl
            dark:bg-white
            dark:text-slate-950
          "
        >
          <Plus size={18} />

          New Inspection

          <ArrowUpRight
            size={16}
            className="
              transition-transform
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </button>
      </div>


      {/* =====================================================
          HERO COMPLIANCE CARD
      ===================================================== */}
      <section className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      ">

        {/* Decorative background */}
        <div className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-blue-500/10
          blur-3xl
        " />

        <div className="
          pointer-events-none
          absolute
          -bottom-32
          left-1/3
          h-64
          w-64
          rounded-full
          bg-emerald-500/10
          blur-3xl
        " />

        <div className="
          relative
          grid
          gap-8
          lg:grid-cols-[1.3fr_0.7fr]
          lg:items-center
        ">

          <div>

            <div className="
              mb-5
              flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-blue-200
              bg-blue-50
              px-3
              py-1.5
              text-xs
              font-bold
              text-blue-700
              dark:border-blue-900/50
              dark:bg-blue-950/40
              dark:text-blue-300
            ">
              <Sparkles size={14} />
              AI-Powered Compliance Intelligence
            </div>

            <h2 className="
              max-w-2xl
              text-2xl
              font-black
              tracking-tight
              text-slate-900
              dark:text-white
              md:text-3xl
            ">
              Your compliance ecosystem is{" "}
              <span className="text-emerald-500">
                performing well.
              </span>
            </h2>

            <p className="
              mt-3
              max-w-xl
              text-sm
              leading-6
              text-slate-500
              dark:text-slate-400
            ">
              AI analysis shows a strong compliance trend across recent
              inspections. A few high-risk observations need attention.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <button
                onClick={() => navigate("/analytics")}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-4
                  py-2.5
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-blue-700
                "
              >
                View Analytics
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => navigate("/reports")}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-2.5
                  text-sm
                  font-bold
                  text-slate-700
                  transition
                  hover:bg-slate-100
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-200
                  dark:hover:bg-slate-700
                "
              >
                <FileText size={16} />
                Reports
              </button>

            </div>
          </div>


          {/* SCORE */}
          <div className="flex justify-center lg:justify-end">

            <div className="relative flex h-52 w-52 items-center justify-center">

              <div className="
                absolute
                inset-0
                rounded-full
                border-[16px]
                border-slate-100
                dark:border-slate-800
              " />

              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  border-[16px]
                  border-transparent
                  border-r-emerald-500
                  border-t-emerald-500
                  rotate-[-20deg]
                "
              />

              <div className="text-center">

                <div className="
                  text-5xl
                  font-black
                  tracking-tighter
                  text-slate-900
                  dark:text-white
                ">
                  84.2
                </div>

                <div className="
                  mt-1
                  text-xs
                  font-bold
                  uppercase
                  tracking-widest
                  text-slate-400
                ">
                  Overall Score
                </div>

                <div className="
                  mt-2
                  inline-flex
                  items-center
                  gap-1
                  rounded-full
                  bg-emerald-50
                  px-2.5
                  py-1
                  text-xs
                  font-bold
                  text-emerald-600
                  dark:bg-emerald-950/40
                  dark:text-emerald-400
                ">
                  <TrendingUp size={13} />
                  +4.8%
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>


      {/* =====================================================
          KPI CARDS
      ===================================================== */}
      <div className="
        grid
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      ">

        <StatCard
          icon={<ClipboardCheck size={21} />}
          label="Total Inspections"
          value="1,248"
          trend="+12.5%"
          description="vs last month"
          iconClass="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
        />

        <StatCard
          icon={<ShieldCheck size={21} />}
          label="Compliant"
          value="987"
          trend="+8.2%"
          description="compliance rate"
          iconClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
        />

        <StatCard
          icon={<AlertTriangle size={21} />}
          label="Needs Review"
          value="183"
          trend="-3.4%"
          description="pending attention"
          iconClass="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
        />

        <StatCard
          icon={<Activity size={21} />}
          label="Avg. Compliance"
          value="84.2%"
          trend="+4.8%"
          description="overall performance"
          iconClass="bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400"
        />

      </div>


      {/* =====================================================
          MAIN ANALYTICS GRID
      ===================================================== */}
      <div className="
        grid
        gap-6
        xl:grid-cols-[1.7fr_1fr]
      ">

        {/* TREND CHART */}
        <section className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        ">

          <div className="
            mb-5
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          ">

            <div>
              <div className="
                flex
                items-center
                gap-2
                text-base
                font-black
                text-slate-900
                dark:text-white
              ">
                <TrendingUp
                  size={18}
                  className="text-blue-500"
                />
                Compliance Trend
              </div>

              <p className="
                mt-1
                text-xs
                text-slate-500
                dark:text-slate-400
              ">
                Performance score over the last 7 days
              </p>
            </div>

            <div className="
              flex
              items-center
              gap-2
              rounded-lg
              bg-emerald-50
              px-3
              py-1.5
              text-xs
              font-bold
              text-emerald-600
              dark:bg-emerald-950/30
              dark:text-emerald-400
            ">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Improving
            </div>

          </div>

          <div className="h-[280px] w-full">

            <ResponsiveContainer width="100%" height="100%">

              <AreaChart data={chartData}>

                <defs>
                  <linearGradient
                    id="complianceGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#3b82f6"
                      stopOpacity={0.3}
                    />

                    <stop
                      offset="100%"
                      stopColor="#3b82f6"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="4 4"
                  className="stroke-slate-200 dark:stroke-slate-800"
                  vertical={false}
                />

                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fontSize: 12,
                    fill: "currentColor"
                  }}
                  className="text-slate-400"
                />

                <YAxis
                  domain={[60, 100]}
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fontSize: 12,
                    fill: "currentColor"
                  }}
                  className="text-slate-400"
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor:
                      "var(--chart-tooltip-bg)",
                    border:
                      "1px solid var(--chart-tooltip-border)",
                    borderRadius: "12px",
                    color:
                      "var(--chart-tooltip-text)"
                  }}
                  labelStyle={{
                    color:
                      "var(--chart-tooltip-text)"
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#complianceGradient)"
                  dot={{
                    r: 4,
                    strokeWidth: 2
                  }}
                  activeDot={{
                    r: 6,
                    strokeWidth: 3
                  }}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </section>


        {/* RISK DISTRIBUTION */}
        <section className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        ">

          <div className="mb-6">

            <div className="
              flex
              items-center
              gap-2
              text-base
              font-black
              text-slate-900
              dark:text-white
            ">
              <CircleAlert
                size={18}
                className="text-amber-500"
              />

              Risk Distribution
            </div>

            <p className="
              mt-1
              text-xs
              text-slate-500
              dark:text-slate-400
            ">
              Current inspection classification
            </p>

          </div>

          {/* Visual bars */}
          <div className="space-y-5">

            {riskData.map((risk) => (
              <div key={risk.label}>

                <div className="
                  mb-2
                  flex
                  items-center
                  justify-between
                ">

                  <div className="flex items-center gap-2">

                    <span
                      className={`
                        h-2.5
                        w-2.5
                        rounded-full
                        ${risk.dot}
                      `}
                    />

                    <span className="
                      text-sm
                      font-semibold
                      text-slate-700
                      dark:text-slate-300
                    ">
                      {risk.label}
                    </span>

                  </div>

                  <span className="
                    text-sm
                    font-black
                    text-slate-900
                    dark:text-white
                  ">
                    {risk.value}%
                  </span>

                </div>

                <div className="
                  h-2
                  overflow-hidden
                  rounded-full
                  bg-slate-100
                  dark:bg-slate-800
                ">

                  <div
                    className={`
                      h-full
                      rounded-full
                      ${risk.dot}
                    `}
                    style={{
                      width: `${risk.value}%`
                    }}
                  />

                </div>

                <div className="
                  mt-1
                  text-right
                  text-[11px]
                  text-slate-400
                ">
                  {risk.count} inspections
                </div>

              </div>
            ))}

          </div>


          <button
            onClick={() => navigate("/analytics")}
            className="
              mt-6
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              py-2.5
              text-xs
              font-bold
              text-slate-600
              transition
              hover:bg-slate-50
              dark:border-slate-700
              dark:text-slate-300
              dark:hover:bg-slate-800
            "
          >
            Detailed Analytics
            <ArrowRight size={14} />
          </button>

        </section>

      </div>


      {/* =====================================================
          LOWER GRID
      ===================================================== */}
      <div className="
        grid
        gap-6
        xl:grid-cols-[1.5fr_0.8fr]
      ">

        {/* RECENT INSPECTIONS */}
        <section className="
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        ">

          <div className="
            flex
            items-center
            justify-between
            border-b
            border-slate-100
            p-5
            dark:border-slate-800
          ">

            <div>

              <div className="
                flex
                items-center
                gap-2
                text-base
                font-black
                text-slate-900
                dark:text-white
              ">
                <ScanLine
                  size={18}
                  className="text-blue-500"
                />

                Recent Inspections
              </div>

              <p className="
                mt-1
                text-xs
                text-slate-500
                dark:text-slate-400
              ">
                Latest compliance screening activity
              </p>

            </div>

            <button
              onClick={() => navigate("/history")}
              className="
                flex
                items-center
                gap-1
                text-xs
                font-bold
                text-blue-600
                hover:text-blue-700
                dark:text-blue-400
              "
            >
              View all
              <ChevronRight size={15} />
            </button>

          </div>


          <div className="divide-y divide-slate-100 dark:divide-slate-800">

            {recentInspections.length > 0 ? (
              recentInspections.map((item) => (

                <div
                  key={item.id}
                  className="
                    group
                    flex
                    flex-col
                    gap-3
                    p-5
                    transition
                    hover:bg-slate-50
                    dark:hover:bg-slate-800/50
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >

                  <div className="flex items-center gap-3">

                    <div className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-slate-100
                      text-slate-600
                      dark:bg-slate-800
                      dark:text-slate-300
                    ">
                      <ClipboardCheck size={19} />
                    </div>

                    <div>

                      <div className="
                        font-bold
                        text-slate-900
                        dark:text-white
                      ">
                        {item.product}
                      </div>

                      <div className="
                        mt-1
                        flex
                        flex-wrap
                        items-center
                        gap-3
                        text-[11px]
                        text-slate-400
                      ">

                        <span>{item.id}</span>

                        <span className="flex items-center gap-1">
                          <MapPin size={11} />
                          {item.location}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock3 size={11} />
                          {item.date}
                        </span>

                      </div>

                    </div>

                  </div>


                  <div className="flex items-center justify-between gap-4 sm:justify-end">

                    <div className="text-right">

                      <div className="
                        text-lg
                        font-black
                        text-slate-900
                        dark:text-white
                      ">
                        {item.score}
                      </div>

                      <div className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-400
                      ">
                        Score
                      </div>

                    </div>


                    <StatusBadge status={item.status} />

                  </div>

                </div>

              ))
            ) : (
              <div className="
                p-10
                text-center
                text-sm
                text-slate-400
              ">
                No inspections available.
              </div>
            )}

          </div>

        </section>


        {/* AI ASSISTANT */}
        <section className="
          relative
          overflow-hidden
          rounded-3xl
          bg-slate-950
          p-6
          text-white
          shadow-xl
          dark:border
          dark:border-slate-800
        ">

          <div className="
            pointer-events-none
            absolute
            -right-16
            -top-16
            h-48
            w-48
            rounded-full
            bg-blue-500/20
            blur-3xl
          />

          <div className="
            pointer-events-none
            absolute
            bottom-20
            left-10
            h-40
            w-40
            rounded-full
            bg-violet-500
            blur-3xl
          />

          <div className="relative">

            <div className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-white/10
              ring-1
              ring-white/10
            ">
              <Bot
                size={23}
                className="text-blue-300"
              />
            </div>

            <div className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-white/10
              px-3
              py-1
              text-[10px]
              font-bold
              uppercase
              tracking-widest
              text-blue-200
            ">
              <Sparkles size={12} />
              AI Insight
            </div>

            <h3 className="
              mt-4
              text-xl
              font-black
              tracking-tight
            ">
              One action can improve your score.
            </h3>

            <p className="
              mt-3
              text-sm
              leading-6
              text-slate-400
            ">
              78 inspections are currently classified as high risk.
              Prioritizing these cases could significantly improve
              your overall compliance performance.
            </p>

            <button
              onClick={() => navigate("/analytics")}
              className="
                mt-6
                flex
                w-full
                items-center
                justify-between
                rounded-xl
                bg-white
                px-4
                py-3
                text-sm
                font-bold
                text-slate-950
                transition
                hover:bg-slate-100
              "
            >
              Review risk insights
              <ArrowUpRight size={17} />
            </button>

          </div>

        </section>

      </div>


      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}
      <section>

        <div className="mb-4">

          <h2 className="
            text-lg
            font-black
            text-slate-900
            dark:text-white
          ">
            Quick Actions
          </h2>

          <p className="
            mt-1
            text-xs
            text-slate-500
            dark:text-slate-400
          ">
            Jump directly into your most-used workflows.
          </p>

        </div>


        <div className="
          grid
          gap-4
          sm:grid-cols-2
          lg:grid-cols-4
        ">

          <QuickAction
            icon={<ScanLine size={20} />}
            title="New Inspection"
            description="Start AI screening"
            onClick={() => navigate("/inspection/new")}
            iconClass="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
          />

          <QuickAction
            icon={<ClipboardCheck size={20} />}
            title="Inspection History"
            description="Browse previous checks"
            onClick={() => navigate("/history")}
            iconClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
          />

          <QuickAction
            icon={<FileText size={20} />}
            title="Generate Report"
            description="Create compliance report"
            onClick={() => navigate("/reports")}
            iconClass="bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400"
          />

          <QuickAction
            icon={<Bot size={20} />}
            title="AI Assistant"
            description="Ask compliance questions"
            onClick={() => {
              window.dispatchEvent(
                new Event("open-chatbot")
              );
            }}
            iconClass="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
          />

        </div>

      </section>

    </div>
  );
}


/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon,
  label,
  value,
  trend,
  description,
  iconClass
}) {
  return (
    <div className="
      group
      rounded-2xl
      border
      border-slate-200
      bg-white
      p-5
      shadow-sm
      transition
      duration-300
      hover:-translate-y-1
      hover:shadow-lg
      dark:border-slate-800
      dark:bg-slate-900
    ">

      <div className="
        flex
        items-start
        justify-between
      ">

        <div className={`
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          ${iconClass}
        `}>
          {icon}
        </div>

        <span className="
          inline-flex
          items-center
          gap-1
          rounded-full
          bg-emerald-50
          px-2
          py-1
          text-[10px]
          font-black
          text-emerald-600
          dark:bg-emerald-950/30
          dark:text-emerald-400
        ">
          <TrendingUp size={11} />
          {trend}
        </span>

      </div>

      <div className="mt-5">

        <p className="
          text-xs
          font-semibold
          text-slate-500
          dark:text-slate-400
        ">
          {label}
        </p>

        <div className="
          mt-1
          flex
          items-end
          gap-2
        ">

          <span className="
            text-2xl
            font-black
            tracking-tight
            text-slate-900
            dark:text-white
          ">
            {value}
          </span>

        </div>

        <p className="
          mt-1
          text-[11px]
          text-slate-400
        ">
          {description}
        </p>

      </div>

    </div>
  );
}


/* ============================================================
   STATUS BADGE
============================================================ */

function StatusBadge({ status }) {

  const styles = {
    Compliant:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",

    Review:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",

    "High Risk":
      "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
  };

  const icons = {
    Compliant: <CheckCircle2 size={12} />,
    Review: <Clock3 size={12} />,
    "High Risk": <AlertTriangle size={12} />
  };

  return (
    <span className={`
      inline-flex
      items-center
      gap-1.5
      rounded-full
      px-2.5
      py-1.5
      text-[10px]
      font-black
      ${styles[status] || styles.Review}
    `}>
      {icons[status] || icons.Review}
      {status}
    </span>
  );
}


/* ============================================================
   QUICK ACTION
============================================================ */

function QuickAction({
  icon,
  title,
  description,
  onClick,
  iconClass
}) {
  return (
    <button
      onClick={onClick}
      className="
        group
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        text-left
        shadow-sm
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        dark:border-slate-800
        dark:bg-slate-900
      "
    >

      <div className={`
        flex
        h-11
        w-11
        shrink-0
        items-center
        justify-center
        rounded-xl
        ${iconClass}
      `}>
        {icon}
      </div>

      <div className="min-w-0">

        <div className="
          text-sm
          font-black
          text-slate-900
          dark:text-white
        ">
          {title}
        </div>

        <div className="
          mt-0.5
          text-[11px]
          text-slate-400
        ">
          {description}
        </div>

      </div>

      <ArrowUpRight
        size={16}
        className="
          ml-auto
          shrink-0
          text-slate-300
          transition
          group-hover:-translate-y-0.5
          group-hover:translate-x-0.5
          group-hover:text-blue-500
        "
      />

    </button>
  );
}

export default Dashboard;

