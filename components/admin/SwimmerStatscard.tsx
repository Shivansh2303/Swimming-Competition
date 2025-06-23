"use client";

import { useEffect, useState } from "react";
import { User, DollarSign } from "lucide-react";

export default function SwimmerStatsCard() {
  const [stats, setStats] = useState({
    maleCount: 0,
    femaleCount: 0,
    maleAmount: 0,
    femaleAmount: 0,
  });
  const [totalSwimmers, setTotalSwimmers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/admin");
      const { data } = await res.json();

      let maleCount = 0,
        femaleCount = 0,
        maleAmount = 0,
        femaleAmount = 0;

      data.forEach((swimmer: any) => {
        if (swimmer.gender === "Male") {
          maleCount++;
          maleAmount += swimmer.amount ?? 0;
        } else if (swimmer.gender === "Female") {
          femaleCount++;
          femaleAmount += swimmer.amount ?? 0;
        }
      });

      setStats({ maleCount, femaleCount, maleAmount, femaleAmount });
      setTotalSwimmers(maleCount + femaleCount);
    };

    fetchData();
  }, []);

  const StatRow = ({
    icon,
    label,
    subtext,
    value,
    color,
  }: {
    icon: React.ReactNode;
    label: string;
    subtext: string;
    value: string;
    color: string;
  }) => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-xs text-gray-500">{subtext}</p>
        </div>
      </div>
      <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">
        {value}
      </span>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-sm  mx-auto">
      <div className="mb-6" >
        <h2 className="text-lg font-semibold">Swimmer Stats</h2>
        <p className="text-xs text-gray-500">By Gender & Payment</p>
      </div>
      <StatRow
        icon={<DollarSign size={16} className="text-white" />}
        label="Total Amount Collected"
        subtext="Total Paid"
        value={`₹${stats.femaleAmount + stats.maleAmount}`}
        color="bg-pink-300"
      />
      <StatRow
        icon={<User size={16} className="text-white" />}
        label="Total Swimmers"
        subtext="Total Count"
        value={totalSwimmers.toString()}
        color="bg-blue-600"
      />

      <StatRow
        icon={<User size={16} className="text-white" />}
        label="Male Swimmers"
        subtext="Total Count"
        value={stats.maleCount.toString()}
        color="bg-blue-600"
      />

      <StatRow
        icon={<User size={16} className="text-white" />}
        label="Female Swimmers"
        subtext="Total Count"
        value={stats.femaleCount.toString()}
        color="bg-pink-500"
      />
    </div>
  );
}
