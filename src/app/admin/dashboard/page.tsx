"use client";

import Loading from "@/components/Loading";
import { IconBrandGithub, IconMessage, IconThumbUp } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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

interface DashboardData {
  totalProjects: number;
  totalLikes: number;
  totalComments: number;
  visitors: number;
  data: Array<{
    month: string;
    projects: number;
    likes: number;
  }>;
  techStack: Array<{
    name: string;
    value: number;
  }>;
}
const COLORS = [
  "var(--color-primary)",
  "var(--color-secondary)",
  "var(--color-accent)",
  "var(--color-info)",
  "var(--color-success)",
  "var(--color-warning)",
  "var(--color-error)",
  "var(--color-neutral)",
  "var(--color-base-100)",
  "var(--color-base-200)",
  "var(--color-base-300)",
];

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/admin");
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <Loading />;

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
          <div className="stat-figure text-primary">
            <IconBrandGithub size={32} />
          </div>
          <div className="stat-title">Total Projects</div>
          <div className="stat-value text-primary">
            {dashboardData?.totalProjects || 0}
          </div>
          <div className="stat-desc">↗︎ 8% from last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <IconThumbUp size={32} />
          </div>
          <div className="stat-title">Total Likes</div>
          <div className="stat-value text-secondary">
            {dashboardData?.totalLikes || 0}
          </div>
          <div className="stat-desc">↗︎ 12% growth</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <IconMessage size={32} />
          </div>
          <div className="stat-title">Total Comments</div>
          <div className="stat-value text-accent">
            {dashboardData?.totalComments || 0}
          </div>
          <div className="stat-desc">↘︎ 2% from last week</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar avatar-online">
              <div className="w-16 rounded-full">
                <img src="/images/profile.jpg" alt="Saurav image" />
              </div>
            </div>
          </div>
          <div className="stat-value">{dashboardData?.visitors || 0}</div>
          <div className="stat-title">Visitors</div>
          <div className="stat-desc text-info">↗︎ 89% New visitors</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Line Chart */}
        <div className="bg-base-200 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-primary text-center uppercase">
            Monthly Performance
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData?.data || []}>
              <XAxis dataKey="month" stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-base-200)",
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
          <h2 className="text-xl font-semibold mb-4 text-primary text-center uppercase">
            Projects vs Likes
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData?.data || []}>
              <XAxis dataKey="month" stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-base-200)",
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
          <h2 className="text-xl font-semibold mb-4 text-primary text-center uppercase">
            Tech Stack Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData?.techStack || []}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={5}
              >
                {dashboardData?.techStack.map((_, index) => (
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
