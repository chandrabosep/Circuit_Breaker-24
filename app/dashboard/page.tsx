import DashboardCard from "@/components/DashboardCard";
import JobsApproveCard from "@/components/JobsApproveCard";
import { TrendingUp } from "lucide-react";
import Image from "next/image";
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
      <div className="w-full flex gap-4">
        <div className="w-2/6 flex flex-col gap-8">
          <div className="flex w-full gap-2">
            <div className="w-1/2 flex flex-col py-2 px-4 rounded-xl justify-center items-center bg-[#d5fcc5]">
              <h5 className="text-xl font-bold">Active Jobs</h5>
              <div className="flex gap-4 items-center py-3">
                <p className="text-xl font-bold">0 </p>
                <div className="bg-grad-magic p-1 rounded-2xl flex items-center gap-2 px-2 font-semibold">
                  <TrendingUp className="w-6 h-6 " strokeWidth={1.5} /> +0%
                </div>
              </div>
            </div>
            <div className="w-1/2 flex flex-col py-2 px-4 rounded-xl justify-center items-center bg-[#d5fcc5]">
              <h5 className="text-xl font-bold">Total Spend</h5>
              <div className="flex gap-4 items-center py-3">
                <p className="text-xl font-bold">0 </p>
                <div className="bg-grad-magic p-1 rounded-2xl flex items-center font-semibold gap-2 px-2">
                  <TrendingUp className="w-6 h-6 " strokeWidth={1.5} /> +0%
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-6">
            <h3 className="text-xl font-bold">Your Created Jobs</h3>
            <Image src={"/graph.svg"} alt="hero" width={5000} height={5000} />
          </div>
          <JobsApproveCard />
        </div>
        <div className="w-4/6">
          <h4 className="text-xl font-bold">Your Active Jobs</h4>
          <DashboardCard />
        </div>
      </div>
    </div>
  );
}
