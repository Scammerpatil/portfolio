import dbConfig from "@/config/db.config";
import Project from "@/models/Project";
import Visitor from "@/models/Visitor";
import { NextResponse } from "next/server";

dbConfig();

export async function GET() {
  try {
    const projects = await Project.find();
    const totalProjects = projects.length;

    const totalLikes = projects.reduce(
      (sum, project) => sum + (project.likes || 0),
      0
    );

    const totalComments = projects.reduce(
      (sum, project) => sum + (project.comments?.length || 0),
      0
    );

    const visitors = await Visitor.findOne({});
    const visitorCount = visitors ? visitors.visitorCount : 0;

    const monthlyData: Record<string, { projects: number; likes: number }> = {};

    projects.forEach((project) => {
      const createdAt = new Date(project.createdAt);
      const month = createdAt.toLocaleString("default", { month: "long" });

      if (!monthlyData[month]) {
        monthlyData[month] = { projects: 0, likes: 0 };
      }

      monthlyData[month].projects += 1;
      monthlyData[month].likes += project.likes || 0;
    });

    const monthOrder = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const data = monthOrder
      .filter((m) => monthlyData[m])
      .map((month) => ({
        month,
        projects: monthlyData[month].projects,
        likes: monthlyData[month].likes,
      }));

    const techUsage: Record<string, number> = {};

    projects.forEach((project) => {
      techUsage[project.stack] = (techUsage[project.stack] || 0) + 1;
    });

    const techStack = Object.entries(techUsage).map(([name, value]) => ({
      name,
      value,
    }));

    const dashboardData = {
      totalProjects,
      totalLikes,
      totalComments,
      visitors: visitorCount,
      data,
      techStack,
    };

    return NextResponse.json(dashboardData, { status: 200 });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
