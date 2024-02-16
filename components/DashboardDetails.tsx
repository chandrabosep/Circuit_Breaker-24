"use client";
import { TrendingUp } from "lucide-react";
import React from "react";
import JobsApproveCard from "./JobsApproveCard";
import Image from "next/image";
import DashboardCard from "./DashboardCard";
import { useSearchParams } from "next/navigation";

export default function DashboardDetails() {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  return (
    <>
      <div className="w-full flex gap-4">
        <div className="w-2/6 flex flex-col gap-8">
          <div className="flex w-full gap-2">
            <div className="w-1/2 flex flex-col py-2 px-4 rounded-xl justify-center items-center bg-[#d5fcc5]">
              <h5 className="text-xl font-bold">
                {user === "freelancer" ? "Active Jobs" : "Jobs Reviewing"}
              </h5>
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
          {user === "employer" ? <JobsApproveCard /> : null}
        </div>
        <div className="w-4/6">
          <h4 className="text-xl font-bold">Your Active Jobs</h4>
          <DashboardCard />
        </div>
      </div>
    </>
  );
}
