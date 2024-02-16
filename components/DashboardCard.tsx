"use client";
import axios from "axios";
import {
  ListChecks,
  MessageCircleMore,
  Timer,
  UploadCloud,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";

export default function DashboardCard() {
  const address = useAccount();
  const [data, setData] = React.useState<any>();
  const [employer, setEmployer] = React.useState<any>();

  useEffect(() => {
    async function getJobs() {
      try {
        const jobs = await axios.get(
          "/api/fetchJobs?employerAddress=" + `${address.address}`
        );
        const details = await axios.get(
          "/api/getEmployer?address=" + `${address.address}`
        );
        setEmployer(details.data);
        setData(jobs.data);
      } catch (err) {
        console.log(err);
      }
    }
    getJobs();
  }, []);

  console.log(employer);

  return (
    <>
      {data &&
        data.employer.map((job: any) => (
          <div className="w-full flex py-2 px-4 rounded-xl justify-between items-center bg-[#d5fcc5]">
            <div className="w-1/6 flex flex-col ">
              <Image
                src="/f2.png"
                alt="logo"
                width={5000}
                height={5000}
                className="w-10"
              />
              <p className="text-md font-semibold">
                {employer && employer.employers.name}
              </p>
              <p className="text-sm">
                {employer && employer.employers.companyName}
              </p>
            </div>

            <div className="w-full flex flex-col justify-between h-full gap-2.5 px-1">
              <h3 className="text-lg float-start font-semibold">{job.title}</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center bg-mint-100 p-1 px-1.5 rounded-lg">
                  <ListChecks className="w-6 h-6" />
                  <div className="text-sm">
                    <p>Tasks</p>
                    <p>8/10</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center bg-mint-100 p-1 px-1.5 rounded-lg">
                  <UploadCloud className="w-6 h-6" />
                  <div className="text-sm">
                    <p>Files Uploaded</p>
                    <p>2 Docs 5 Links </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center text-red bg-mint-100 p-1 px-1.5 rounded-lg">
                  <Timer className="w-6 h-6" />
                  <div className="text-sm">
                    <p>Time Left to Deliver</p>
                    <p>{job.delivery}</p>
                  </div>
                </div>
                <Link
                  href={"/global-chat"}
                  className="flex items-center gap-1 px-3 py-1 text-green-500 bg-grad-magic rounded-full shadow-md"
                >
                  <MessageCircleMore className="w-5 h-5" /> Chat
                </Link>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
