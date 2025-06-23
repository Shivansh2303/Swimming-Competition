import type { Metadata } from "next";
import React from "react";
import SwimmerPerformanceTable from "@/components/admin/Candidates";
import AgeGroupOverview from "@/components/admin/AgeGroupOverview";
import SwimmerStatsCard from "@/components/admin/SwimmerStatscard";
export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Admin() {
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <div className="border rounded-lg shadow-md bg-white mb-4 p-4">
        <h1 className="text-2xl font-bold text-gray-800 text-left">Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <AgeGroupOverview />
        </div>
        <div className="col-span-1">
          <SwimmerStatsCard />
        </div>
      </div>

      <div>
        <SwimmerPerformanceTable />
      </div>
    </main>
  );
}
