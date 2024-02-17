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
import { Hanken_Grotesk } from "next/font/google";

const hanken: any = Hanken_Grotesk({
  subsets: ["latin"],
  weight: "800",
});
const hanken_light: any = Hanken_Grotesk({
  subsets: ["latin"],
  weight: "500",
});

export default function DashboardCard({ user }: { user: any }) {
  const address = useAccount();
  const [data, setData] = React.useState<any>();
  const [employer, setEmployer] = React.useState<any>();
  const [eAddress, setEAddress] = React.useState<String>("");

  useEffect(() => {
    // async function fetchFreelancerJobs() {
    //   try {
    //     const freelancerJobId = await axios.get(
    //       "/api/fetchFreelancer?freelancerAddress=" + `${address.address}`
    //     );
    //     setFreelancer(freelancerJobId.data.freelancer[0].id.toString());
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // fetchFreelancerJobs();
    async function getJobs() {
      try {
        if (user === "employer") {
          const jobs = await axios.get(
            "/api/fetchJobs?employerAddress=" + `${address.address}`
          );
          setData(jobs.data);
        } else if (user === "freelancer") {
          const jobs = await axios
            .get(
              "/api/fetchJobs/fetchFreelancerJobs?address=" +
                `${address.address}`
            )
            .then((res) => {
              setData(res.data);
              const eAddress = res.data.employer[0].address.toString();
              setEAddress(eAddress);
              console.log(res.data.employer[0].address.toString());
              return axios.get(
                "/api/getEmployer?address=" + `${eAddress && eAddress}`
              );
            })
            .then((details) => {
              console.log(details.data);
              setEmployer(details.data);
            });
        }
        // else if (user === "reviewer") {
        //   const jobs = await axios
        //     .get(
        //       "/api/fetchJobs/fetchReviewerJobs?address=" +
        //         `${address.address}`
        //     )
        //     .then((res) => {
        //       setData(res.data);
        //       const eAddress = res.data.employer[0].address.toString();
        //       setEAddress(eAddress);
        //       console.log(res.data.employer[0].address.toString());
        //       return axios.get(
        //         "/api/getEmployer?address=" + `${eAddress && eAddress}`
        //       );
        //     })
        //     .then((details) => {
        //       console.log(details.data);
        //       setEmployer(details.data);
        //     });
        // }
      } catch (err) {
        console.log(err);
      }
    }
    getJobs();
  }, [user, address.address]);

  useEffect(() => {
    console.log(eAddress);
  }, [eAddress, employer]);
  // console.log(
  //   employer && employer)
  // );
  console.log(employer && employer);

  return (
    <>
      {user === "employer" ? (
        <div>
          {data &&
            data.employer.map(
              (job: any) =>
                job.jobs &&
                job.jobs.map(
                  (j: any) => (
                    console.log(job),
                    (
                      <div className="w-full flex py-2 px-4 rounded-xl justify-between items-center bg-[#d5fcc5]">
                        <div className="w-1/6 flex flex-col ">
                          <Image
                            src="/f2.png"
                            alt="logo"
                            width={5000}
                            height={5000}
                            className="w-10"
                          />
                          <p className={`${hanken.className} text-base `}>
                            {job && job.name}
                          </p>
                          <p className={`${hanken_light.className} text-sm `}>
                            {job && job.companyName.slice(0, 7) + "..."}
                          </p>
                        </div>

                        <div className="w-full flex flex-col h-full gap-2.5 px-1">
                          <h3 className="text-lg float-start font-semibold">
                            {j.title}
                          </h3>
                          <div className="flex justify-between items-center">
                            <div className="flex gap-4 items-center bg-mint-100 p-1 px-1.5 rounded-lg">
                              <ListChecks className="w-6 h-6" />
                              <div className="text-sm">
                                <p>Tasks</p>
                                <p>{j.tasks.split(",").length}</p>
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
                                <p>{j.delivery}</p>
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
                    )
                  )
                )
            )}
        </div>
      ) : (
        <div>
          {data &&
            data.employer.map(
              (job: any) => (
                console.log(),
                (
                  <div className="w-full flex py-2 px-4 rounded-xl justify-between items-center bg-[#d5fcc5]">
                    <div className="w-1/6 flex flex-col ">
                      <Image
                        src="/f2.png"
                        alt="logo"
                        width={5000}
                        height={5000}
                        className="w-10"
                      />
                      <div>
                        <p className={`${hanken.className} text-base`}>
                          {employer &&
                            employer.employers.name.slice(0, 7) + "..."}
                        </p>
                        <p className={`${hanken_light.className} text-sm `}>
                          {employer &&
                            employer.employers.companyName.slice(0, 7) + "..."}
                        </p>
                      </div>
                    </div>

                    <div className="w-full flex flex-col h-full gap-2.5 px-1">
                      <h3 className="text-lg float-start font-semibold">
                        {job.title}
                      </h3>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center bg-mint-100 p-1 px-1.5 rounded-lg">
                          <ListChecks className="w-6 h-6" />
                          <div className="text-sm">
                            <p>Tasks</p>
                            <p>{job.tasks.split(",").length}</p>
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
                )
              )
            )}
        </div>
      )}
    </>
  );
}
