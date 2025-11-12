"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const data = [
  { month: "Jan", projects: 2, likes: 24 },
  { month: "Feb", projects: 3, likes: 45 },
  { month: "Mar", projects: 5, likes: 70 },
  { month: "Apr", projects: 4, likes: 60 },
  { month: "May", projects: 6, likes: 95 },
  { month: "Jun", projects: 7, likes: 110 },
];

const pieData = [
  { name: "Next.js", value: 35 },
  { name: "React", value: 25 },
  { name: "Python", value: 20 },
  { name: "PHP", value: 20 },
];

const COLORS = ["#6366F1", "#14B8A6", "#F43F5E", "#F59E0B"];

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-base-100 text-base-content p-6 md:p-10"
    >
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
        Dashboard Overview
      </h1>

      {/* Stats Section */}
      <div className="stats shadow w-full mb-10 bg-base-300">
        <div className="stat">
          <div className="stat-title">Total Projects</div>
          <div className="stat-value text-primary">42</div>
          <div className="stat-desc">↗︎ 8% from last month</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Likes</div>
          <div className="stat-value text-secondary">1.2K</div>
          <div className="stat-desc">↗︎ 12% growth</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Comments</div>
          <div className="stat-value text-accent">320</div>
          <div className="stat-desc">↘︎ 2% from last week</div>
        </div>

        <div className="stat">
          <div className="stat-title">Visitors</div>
          <div className="stat-value text-info">8.6K</div>
          <div className="stat-desc">↗︎ 20% engagement</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Line Chart */}
        <div className="bg-base-200 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-primary">
            Monthly Performance
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="month" stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--fallback-b1,oklch(var(--b1)))",
                  border: "none",
                }}
              />
              <Line
                type="monotone"
                dataKey="projects"
                stroke="#6366F1"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="likes"
                stroke="#14B8A6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-base-200 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-primary">
            Projects vs Likes
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="month" stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--fallback-b1,oklch(var(--b1)))",
                  border: "none",
                }}
              />
              <Bar dataKey="projects" fill="#6366F1" radius={8} />
              <Bar dataKey="likes" fill="#14B8A6" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-base-200 p-6 rounded-2xl shadow lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-primary">
            Tech Stack Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={5}
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--fallback-b1,oklch(var(--b1)))",
                  border: "none",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
