
import React from "react";
import {
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  AlertTriangle,
  ClipboardCheck,
  Activity,
  BarChart3,
  Target,
  ArrowUpRight,
  CalendarDays,
  Sparkles,
  CheckCircle2,
  CircleAlert
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from "recharts";

import { getInspections } from "../utils/storage";


const weeklyData = [
  { day: "Mon", score: 78, inspections: 142 },
  { day: "Tue", score: 82, inspections: 168 },
  { day: "Wed", score: 80, inspections: 155 },
  { day: "Thu", score: 86, inspections: 181 },
  { day: "Fri", score: 84, inspections: 193 },
  { day: "Sat", score: 89, inspections: 207 },
  { day: "Sun", score: 87, inspections: 202 }
];


const categoryData = [
  {
    category: "Packaged Items",
    score: 92
  },
  {
    category: "Cosmetics",
    score: 86
  },
  {
    category: "Pharma",
    score: 74
  },
  {
    category: "Stationery",
    score: 91
  },
  {
    category: "Electronics",
    score: 83
  }
];


const monthlyData = [
  { month: "Apr", score: 76 },
  { month: "May", score: 79 },
  { month: "Jun", score: 81 },
  { month: "Jul", score: 80 },
  { month: "Aug", score: 84 },
  { month: "Sep", score: 87 }
];


function Analytics() {

  const [inspections, setInspections] = React.useState([]);

  React.useEffect(() => {
    setInspections(getInspections());
  }, []);


  const totalInspections = 1248;
  const compliant = 987;
  const review = 183;
  const highRisk = 78;
  const averageScore = 84.2;


  return (
    <div className="min-h-screen space-y-6 pb-10">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="
        flex
        flex-col
        gap-4
        lg:flex-row
        lg:items-end
        lg:justify-between
      ">

        <div>

          <div className="
            mb-2
            flex
            items-center
            gap-2
          ">

            <div className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              bg-blue-50
              text-blue-600
              dark:bg-blue-950/40
              dark:text-blue-400
            ">
              <BarChart3 size={15} />
            </div>

            <span className="
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-blue-600
              dark:text-blue-400
            ">
              Intelligence
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
            Analytics & Insights
          </h1>


          <p className="
            mt-1
            max-w-2xl
            text-sm
            leading-6
            text-slate-500
            dark:text-slate-400
          ">
            Understand compliance performance, identify risk patterns,
            and make faster regulatory decisions.
          </p>

        </div>


        <div className="
          flex
          w-fit
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-white
          px-3
          py-2
          text-xs
          font-semibold
          text-slate-600
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
          dark:text-slate-300
        ">
          <CalendarDays
            size={15}
            className="text-blue-500"
          />

          Last 7 days

          <span className="
            ml-1
            h-1
            w-1
            rounded-full
            bg-slate-300
          " />

          Updated today
        </div>

      </div>


      {/* =====================================================
          TOP INSIGHT BANNER
      ===================================================== */}

      <section className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-blue-200
        bg-gradient-to-br
        from-blue-50
        via-white
        to-emerald-50
        p-5
        dark:border-slate-800
        dark:from-blue-950/40
        dark:via-slate-900
        dark:to-emerald-950/20
      ">

        <div className="
          pointer-events-none
          absolute
          -right-16
          -top-20
          h-48
          w-48
          rounded-full
          bg-blue-400/10
          blur-3xl
        " />

        <div className="
          relative
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
        ">

          <div className="flex items-start gap-4">

            <div className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-blue-600
              text-white
              shadow-lg
              shadow-blue-600/20
            ">
              <Sparkles size={20} />
            </div>


            <div>

              <div className="
                text-sm
                font-black
                text-slate-900
                dark:text-white
              ">
                AI-generated insight
              </div>

              <p className="
                mt-1
                max-w-2xl
                text-xs
                leading-5
                text-slate-500
                dark:text-slate-400
              ">
                Compliance performance improved by 4.8% compared
                with the previous reporting period. Pharma inspections
                currently show the highest risk concentration.
              </p>

            </div>

          </div>


          <div className="
            flex
            w-fit
            items-center
            gap-2
            rounded-xl
            bg-white
            px-3
            py-2
            text-xs
            font-bold
            text-emerald-600
            shadow-sm
            dark:bg-slate-800
            dark:text-emerald-400
          ">
            <TrendingUp size={14} />
            +4.8% improvement
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

        <MetricCard
          title="Total Inspections"
          value={totalInspections.toLocaleString()}
          subtitle="All recorded inspections"
          icon={<ClipboardCheck size={20} />}
          iconClass="
            bg-blue-50
            text-blue-600
            dark:bg-blue-950/40
            dark:text-blue-400
          "
          trend="+12.5%"
          positive
        />


        <MetricCard
          title="Compliant"
          value={compliant.toLocaleString()}
          subtitle="79% of total inspections"
          icon={<ShieldCheck size={20} />}
          iconClass="
            bg-emerald-50
            text-emerald-600
            dark:bg-emerald-950/40
            dark:text-emerald-400
          "
          trend="+8.2%"
          positive
        />


        <MetricCard
          title="Needs Review"
          value={review.toLocaleString()}
          subtitle="Requires officer attention"
          icon={<AlertTriangle size={20} />}
          iconClass="
            bg-amber-50
            text-amber-600
            dark:bg-amber-950/40
            dark:text-amber-400
          "
          trend="-3.4%"
          positive
        />


        <MetricCard
          title="Average Score"
          value={`${averageScore}%`}
          subtitle="Overall compliance health"
          icon={<Target size={20} />}
          iconClass="
            bg-violet-50
            text-violet-600
            dark:bg-violet-950/40
            dark:text-violet-400
          "
          trend="+4.8%"
          positive
        />

      </div>


      {/* =====================================================
          MAIN TREND CHART
      ===================================================== */}

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
          flex-col
          gap-4
          border-b
          border-slate-100
          p-5
          dark:border-slate-800
          sm:flex-row
          sm:items-center
          sm:justify-between
        ">

          <div>

            <div className="
              flex
              items-center
              gap-2
            ">

              <div className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                text-blue-600
                dark:bg-blue-950/40
                dark:text-blue-400
              ">
                <Activity size={17} />
              </div>

              <div>

                <h2 className="
                  text-base
                  font-black
                  text-slate-900
                  dark:text-white
                ">
                  Compliance Performance
                </h2>

                <p className="
                  mt-0.5
                  text-xs
                  text-slate-400
                ">
                  Daily compliance score trend
                </p>

              </div>

            </div>

          </div>


          <div className="flex items-center gap-3">

            <div className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-emerald-50
              px-3
              py-2
              text-xs
              font-bold
              text-emerald-600
              dark:bg-emerald-950/30
              dark:text-emerald-400
            ">
              <span className="
                h-2
                w-2
                rounded-full
                bg-emerald-500
              " />

              Healthy trend
            </div>

          </div>

        </div>


        <div className="p-4 sm:p-6">

          <div className="
            h-[340px]
            w-full
          ">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart
                data={weeklyData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -15,
                  bottom: 0
                }}
              >

                <defs>

                  <linearGradient
                    id="analyticsAreaGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#2563eb"
                      stopOpacity={0.28}
                    />

                    <stop
                      offset="55%"
                      stopColor="#2563eb"
                      stopOpacity={0.08}
                    />

                    <stop
                      offset="100%"
                      stopColor="#2563eb"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>


                <CartesianGrid
                  vertical={false}
                  strokeDasharray="4 6"
                  className="
                    stroke-slate-200
                    dark:stroke-slate-800
                  "
                />


                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fontWeight: 600
                  }}
                  className="text-slate-400"
                />


                <YAxis
                  domain={[60, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11
                  }}
                  className="text-slate-400"
                />


                <Tooltip
                  cursor={{
                    stroke: "#94a3b8",
                    strokeDasharray: "4 4"
                  }}
                  contentStyle={{
                    backgroundColor:
                      "var(--chart-tooltip-bg)",
                    border:
                      "1px solid var(--chart-tooltip-border)",
                    borderRadius: "14px",
                    boxShadow:
                      "0 10px 30px rgba(15,23,42,0.12)",
                    color:
                      "var(--chart-tooltip-text)"
                  }}
                  labelStyle={{
                    fontWeight: 700,
                    marginBottom: 5,
                    color:
                      "var(--chart-tooltip-text)"
                  }}
                  formatter={(value, name) => [
                    `${value}%`,
                    "Compliance"
                  ]}
                />


                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fill="url(#analyticsAreaGradient)"
                  activeDot={{
                    r: 7,
                    strokeWidth: 3
                  }}
                  dot={{
                    r: 3,
                    strokeWidth: 2
                  }}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>


          <div className="
            mt-4
            grid
            grid-cols-2
            gap-3
            border-t
            border-slate-100
            pt-4
            dark:border-slate-800
            sm:grid-cols-4
          ">

            <MiniStat
              label="Best day"
              value="89%"
              icon={<TrendingUp size={13} />}
            />

            <MiniStat
              label="Lowest day"
              value="78%"
              icon={<TrendingDown size={13} />}
            />

            <MiniStat
              label="Average"
              value="83.7%"
              icon={<Activity size={13} />}
            />

            <MiniStat
              label="Growth"
              value="+4.8%"
              icon={<ArrowUpRight size={13} />}
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          SECONDARY CHARTS
      ===================================================== */}

      <div className="
        grid
        gap-6
        xl:grid-cols-2
      ">


        {/* CATEGORY PERFORMANCE */}

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
            items-center
            justify-between
          ">

            <div>

              <h2 className="
                text-base
                font-black
                text-slate-900
                dark:text-white
              ">
                Category Performance
              </h2>

              <p className="
                mt-1
                text-xs
                text-slate-400
              ">
                Average compliance by category
              </p>

            </div>

            <div className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-violet-50
              text-violet-600
              dark:bg-violet-950/40
              dark:text-violet-400
            ">
              <BarChart3 size={17} />
            </div>

          </div>


          <div className="h-[300px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={categoryData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 15,
                  left: 15,
                  bottom: 5
                }}
                barCategoryGap="28%"
              >

                <CartesianGrid
                  horizontal={false}
                  strokeDasharray="4 6"
                  className="
                    stroke-slate-200
                    dark:stroke-slate-800
                  "
                />


                <XAxis
                  type="number"
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11
                  }}
                  className="text-slate-400"
                />


                <YAxis
                  type="category"
                  dataKey="category"
                  width={105}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fontWeight: 600
                  }}
                  className="text-slate-500 dark:text-slate-400"
                />


                <Tooltip
                  cursor={{
                    fill: "rgba(148,163,184,0.08)"
                  }}
                  contentStyle={{
                    backgroundColor:
                      "var(--chart-tooltip-bg)",
                    border:
                      "1px solid var(--chart-tooltip-border)",
                    borderRadius: "14px",
                    color:
                      "var(--chart-tooltip-text)"
                  }}
                  formatter={(value) => [
                    `${value}%`,
                    "Compliance"
                  ]}
                />


                <Bar
                  dataKey="score"
                  radius={[0, 8, 8, 0]}
                  barSize={20}
                >

                  {categoryData.map(
                    (item, index) => (
                      <Cell
                        key={index}
                        fill={
                          item.score >= 90
                            ? "#10b981"
                            : item.score >= 80
                              ? "#3b82f6"
                              : "#f59e0b"
                        }
                      />
                    )
                  )}

                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </div>

        </section>


        {/* MONTHLY TREND */}

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
            items-center
            justify-between
          ">

            <div>

              <h2 className="
                text-base
                font-black
                text-slate-900
                dark:text-white
              ">
                Long-Term Progress
              </h2>

              <p className="
                mt-1
                text-xs
                text-slate-400
              ">
                Monthly compliance movement
              </p>

            </div>

            <div className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-emerald-50
              text-emerald-600
              dark:bg-emerald-950/40
              dark:text-emerald-400
            ">
              <TrendingUp size={17} />
            </div>

          </div>


          <div className="h-[300px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart
                data={monthlyData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -15,
                  bottom: 0
                }}
              >

                <defs>

                  <linearGradient
                    id="monthlyGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#10b981"
                      stopOpacity={0.25}
                    />

                    <stop
                      offset="100%"
                      stopColor="#10b981"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>


                <CartesianGrid
                  vertical={false}
                  strokeDasharray="4 6"
                  className="
                    stroke-slate-200
                    dark:stroke-slate-800
                  "
                />


                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fontWeight: 600
                  }}
                  className="text-slate-400"
                />


                <YAxis
                  domain={[60, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11
                  }}
                  className="text-slate-400"
                />


                <Tooltip
                  contentStyle={{
                    backgroundColor:
                      "var(--chart-tooltip-bg)",
                    border:
                      "1px solid var(--chart-tooltip-border)",
                    borderRadius: "14px",
                    color:
                      "var(--chart-tooltip-text)"
                  }}
                  formatter={(value) => [
                    `${value}%`,
                    "Score"
                  ]}
                />


                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#monthlyGradient)"
                  activeDot={{
                    r: 7,
                    strokeWidth: 3
                  }}
                  dot={{
                    r: 3,
                    strokeWidth: 2
                  }}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </section>

      </div>


      {/* =====================================================
          COMPLIANCE HEALTH
      ===================================================== */}

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
          mb-6
          flex
          flex-col
          gap-2
          sm:flex-row
          sm:items-center
          sm:justify-between
        ">

          <div>

            <h2 className="
              text-base
              font-black
              text-slate-900
              dark:text-white
            ">
              Compliance Health
            </h2>

            <p className="
              mt-1
              text-xs
              text-slate-400
            ">
              Current distribution of inspection outcomes
            </p>

          </div>


          <div className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-slate-50
            px-3
            py-2
            text-xs
            font-bold
            text-slate-500
            dark:bg-slate-800
            dark:text-slate-300
          ">
            <Activity size={14} />
            1,248 total
          </div>

        </div>


        <div className="
          grid
          gap-4
          md:grid-cols-3
        ">

          <HealthCard
            icon={<CheckCircle2 size={19} />}
            title="Compliant"
            value="987"
            percentage="79%"
            description="Strong regulatory adherence"
            type="green"
          />


          <HealthCard
            icon={<CircleAlert size={19} />}
            title="Needs Review"
            value="183"
            percentage="15%"
            description="Requires further verification"
            type="yellow"
          />


          <HealthCard
            icon={<AlertTriangle size={19} />}
            title="High Risk"
            value="78"
            percentage="6%"
            description="Immediate attention recommended"
            type="red"
          />

        </div>

      </section>


      {/* =====================================================
          FOOTER INSIGHT
      ===================================================== */}

      <div className="
        flex
        flex-col
        gap-3
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-4
        dark:border-slate-800
        dark:bg-slate-900/60
        sm:flex-row
        sm:items-center
      ">

        <div className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-blue-100
          text-blue-600
          dark:bg-blue-950/50
          dark:text-blue-400
        ">
          <ShieldCheck size={17} />
        </div>


        <div className="flex-1">

          <div className="
            text-xs
            font-black
            text-slate-800
            dark:text-slate-200
          ">
            Compliance monitoring is active
          </div>

          <div className="
            mt-0.5
            text-[11px]
            text-slate-400
          ">
            Data is synchronized with the latest inspection records.
          </div>

        </div>


        <div className="
          flex
          items-center
          gap-2
          text-xs
          font-bold
          text-emerald-600
          dark:text-emerald-400
        ">
          <span className="
            h-2
            w-2
            animate-pulse
            rounded-full
            bg-emerald-500
          " />

          Live
        </div>

      </div>

    </div>
  );
}


/* ============================================================
   METRIC CARD
============================================================ */

function MetricCard({
  title,
  value,
  subtitle,
  icon,
  iconClass,
  trend,
  positive
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


        <div className={`
          flex
          items-center
          gap-1
          rounded-full
          px-2
          py-1
          text-[10px]
          font-black
          ${
            positive
              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
              : "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400"
          }
        `}>

          {positive
            ? <TrendingUp size={11} />
            : <TrendingDown size={11} />
          }

          {trend}

        </div>

      </div>


      <div className="mt-5">

        <p className="
          text-xs
          font-semibold
          text-slate-500
          dark:text-slate-400
        ">
          {title}
        </p>


        <div className="
          mt-1
          text-2xl
          font-black
          tracking-tight
          text-slate-900
          dark:text-white
        ">
          {value}
        </div>


        <p className="
          mt-1
          text-[11px]
          text-slate-400
        ">
          {subtitle}
        </p>

      </div>

    </div>
  );
}


/* ============================================================
   MINI STAT
============================================================ */

function MiniStat({
  label,
  value,
  icon
}) {

  return (
    <div className="
      flex
      items-center
      gap-2
    ">

      <div className="
        flex
        h-7
        w-7
        items-center
        justify-center
        rounded-lg
        bg-slate-100
        text-slate-500
        dark:bg-slate-800
        dark:text-slate-400
      ">
        {icon}
      </div>


      <div>

        <div className="
          text-[10px]
          font-semibold
          text-slate-400
        ">
          {label}
        </div>

        <div className="
          text-xs
          font-black
          text-slate-800
          dark:text-slate-200
        ">
          {value}
        </div>

      </div>

    </div>
  );
}


/* ============================================================
   HEALTH CARD
============================================================ */

function HealthCard({
  icon,
  title,
  value,
  percentage,
  description,
  type
}) {

  const styles = {

    green: {
      wrapper:
        "border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/50 dark:bg-emerald-950/20",
      icon:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
      text:
        "text-emerald-600 dark:text-emerald-400",
      bar:
        "bg-emerald-500"
    },

    yellow: {
      wrapper:
        "border-amber-200 bg-amber-50/60 dark:border-amber-900/50 dark:bg-amber-950/20",
      icon:
        "bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400",
      text:
        "text-amber-600 dark:text-amber-400",
      bar:
        "bg-amber-500"
    },

    red: {
      wrapper:
        "border-rose-200 bg-rose-50/60 dark:border-rose-900/50 dark:bg-rose-950/20",
      icon:
        "bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400",
      text:
        "text-rose-600 dark:text-rose-400",
      bar:
        "bg-rose-500"
    }

  };


  const current = styles[type];


  return (
    <div className={`
      rounded-2xl
      border
      p-5
      ${current.wrapper}
    `}>

      <div className="
        flex
        items-start
        justify-between
      ">

        <div className={`
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          ${current.icon}
        `}>
          {icon}
        </div>


        <span className={`
          text-xl
          font-black
          ${current.text}
        `}>
          {percentage}
        </span>

      </div>


      <div className="mt-5">

        <div className="
          text-sm
          font-black
          text-slate-900
          dark:text-white
        ">
          {title}
        </div>


        <div className="
          mt-1
          text-2xl
          font-black
          text-slate-900
          dark:text-white
        ">
          {value}
        </div>


        <p className="
          mt-1
          text-[11px]
          leading-5
          text-slate-500
          dark:text-slate-400
        ">
          {description}
        </p>

      </div>


      <div className="
        mt-4
        h-1.5
        overflow-hidden
        rounded-full
        bg-white/70
        dark:bg-slate-800
      ">

        <div
          className={`
            h-full
            rounded-full
            ${current.bar}
          `}
          style={{
            width: percentage
          }}
        />

      </div>

    </div>
  );
}


export default Analytics;

