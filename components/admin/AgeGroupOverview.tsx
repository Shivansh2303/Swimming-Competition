"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";

// Define a type for chart data
type AgeGroupData = {
  name: string;
  Swimmers: number;
};

export default function AgeGroupOverview() {
  const [chartData, setChartData] = useState<AgeGroupData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/admin");
      const swimmers = await res.json();

      const groupCount: Record<string, number> = {};
      swimmers.data.forEach((s: any) => {
        const group = s.ageGroup ?? "Unknown";
        groupCount[group] = (groupCount[group] || 0) + 1;
      });

      const formatted = Object.entries(groupCount).map(([group, count]) => ({
        name: group,
        Swimmers: count,
      }));

      // Sort by group number (e.g., "Group 1" => 1)
      formatted.sort((a, b) => {
        const getNumber = (name: string) =>
          parseInt(name.replace(/[^\d]/g, "")) || 0;
        return getNumber(a.name) - getNumber(b.name);
      });

      setChartData(formatted);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-blue-700">
          Age Group Overview
        </h2>
        <p className="text-sm text-gray-500">Swimmers distribution by group</p>
      </div>
      {chartData.length === 0 ? (
      <div className="flex items-center justify-center h-72">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-700"></div>
        <span className="ml-4 text-blue-700">Loading...</span>
      </div>
      ) : (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} barSize={35}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Swimmers" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      )}
    </div>
  );
}
