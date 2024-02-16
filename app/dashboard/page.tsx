import DashboardDetails from "@/components/DashboardDetails";
import React from "react";

export default function page() {
  return (
    <div className="w-10/12 m-auto">
      <div className="flex justify-between items-center py-6">
        <h1 className="text-3xl font-semibold">Your Dashboard</h1>
        <p className="text-lg font-medium p-1 px-6 bg-grad-role rounded-full">
          {new Date().toDateString()}
        </p>
      </div>
      <DashboardDetails />
    </div>
  );
}
