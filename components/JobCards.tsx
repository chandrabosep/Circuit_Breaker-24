"use client";
import React, { useEffect, useState } from "react";
import { Hanken_Grotesk } from "next/font/google";
import { Button } from "./ui/button";
import {
  CalendarDays,
  Check,
  ChevronDownIcon,
  ChevronUpIcon,
  Globe2,
  MoveLeftIcon,
  Users2,
} from "lucide-react";
import axios from "axios";
import { useAccount } from "wagmi";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

const hanken: any = Hanken_Grotesk({
  subsets: ["latin"],
  weight: "800",
});

const hanken_semibold: any = Hanken_Grotesk({
  subsets: ["latin"],
  weight: "600",
});

export default function JobCards({ user }: { user: any }) {
  const [reveal, setReveal] = useState(false);
  const [data, setData] = React.useState<any>();
  const address = useAccount();
  const router = useRouter();

  async function applyForJob(jobId: string) {
    try {
      // Make sure address.address is available
      if (!address?.address) {
        console.error("Address not available");
        return;
      }

      const response = await axios.post("/api/applyJob", {
        jobId,
        applicantId: address.address,
      });

      console.log("Job application response:", response.data);
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  }
  useEffect(() => {
    async function getJobs() {
      try {
        const jobs = await axios.get("/api/fetchAllJobs?employerAddress=");
        setData(jobs.data);
      } catch (e) {
        console.log(e);
      }
    }
    getJobs();
  }, []);

  return (
    <>
      {data &&
        data.employer.map((job: any) =>
          job.jobs.map((job: any) => (
            <div className="w-full border border-green-500 px-3 py-4 my-4 rounded-2xl">
              <div className="flex justify-between">
                <h1 className={`${hanken_semibold.className} text-xl`}>
                  {job.title}
                </h1>
                <div className="flex gap-4">
                  <p>
                    Created on{" "}
                    <span className={`${hanken.className}`}>
                      {job.createdAt.slice(0, 10)}
                    </span>
                  </p>
                  <div className="flex flex-col p-1.5 rounded-lg bg-mint-200 text-sm">
                    <p>Time Left to Apply</p>
                    <span>02D: 03H</span>
                  </div>
                </div>
              </div>
              <div className="py-4">
                <p
                  className={`${
                    reveal ? `line-clamp-none` : `line-clamp-2`
                  } text-wrap`}
                >
                  {job.description}
                </p>
                {reveal ? (
                  <div className="py-2">
                    <h4
                      className={`${hanken_semibold.className} text-xl text-green-500`}
                    >
                      {job.tasks.split(",").length} Job Tasks
                    </h4>
                    <div className="grid grid-cols-4 gap-3 pt-3">
                      {job.tasks.split(",").map((task: any) => (
                        <div className="flex gap-2 items-center">
                          <Check
                            strokeWidth={2.5}
                            className="w-6 h-6 bg-grad-magic rounded-full p-1"
                          />
                          <p>{task}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="flex justify-between">
                <div className="flex w-9/12 justify-between">
                  <div className="flex gap-1.5 items-center bg-mint-200 px-2.5 py-1 rounded-lg">
                    <CalendarDays className="w-5 h-5" />
                    <span className={`${hanken.className}`}>Deadline:</span>
                    <p>
                      {user === "freelancer" ? job.delivery : job.reviewDate}
                    </p>
                  </div>
                  <div className="flex gap-1.5 items-center bg-mint-200 px-2.5 py-1 rounded-lg">
                    <Users2 className="w-5 h-5" />
                    <span className={`${hanken.className}`}>
                      {user === "freelancer" ? "Freelancers" : "Reviewers"}{" "}
                      intrested:
                    </span>
                    <p>
                      {user === "freelancer" ? job.peopleApplied.length : 0}
                    </p>
                  </div>
                  <div className="flex gap-1.5 items-center bg-mint-200 px-2.5 py-1 rounded-lg">
                    <Globe2 className="w-5 h-5" />
                    <span className={`${hanken.className}`}>Time zone:</span>
                    <p>UTC +5</p>
                  </div>
                </div>
                <Button
                  className="text-base bg-grad-magic rounded-full shadow-md"
                  onClick={() => setReveal(!reveal)}
                >
                  Show Details{" "}
                  {reveal ? (
                    <ChevronUpIcon className="w-5 h-5" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5" />
                  )}
                </Button>
              </div>
              {reveal ? (
                <div className="flex gap-4 pt-6">
                  <div className="bg-black w-[9.5rem] h-fit py-1.5 rounded-xl text-center">
                    <p className="bg-clip-text bg-text-grad-magic text-transparent">
                      You will collect
                    </p>
                    <p
                      className={`${hanken.className} text-2xl text-transparent bg-clip-text bg-text-grad-magic`}
                    >
                      250 DAI
                    </p>
                  </div>
                  <p className="text-sm flex-1">{`*The job payment will be based on how all the tasks were completed by the deadline, these task will be peer to peer reviewed and  if successful the payment amount will be released to you.`}</p>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button
                        onClick={() => applyForJob(job.id)}
                        className="text-green-500 px-6 text-base bg-grad-magic rounded-full shadow-md"
                      >
                        <Image
                          src={"/eyes.svg"}
                          alt="apply"
                          className="mr-1"
                          width={20}
                          height={20}
                        />
                        {user === "freelancer" ? "Apply" : "Review"}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-mint-200">
                      <AlertDialogHeader>
                        <AlertDialogTitle
                          className={`${hanken.className} text-lg text-center bg-grad-magic rounded-full w-full py-2.5`}
                        >
                          {user === "freelancer"
                            ? "Congrats! You’ve applied for"
                            : "Congrats! You will Review:"}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="flex flex-col gap-4">
                          <h4
                            className={`${hanken.className} text-xl text-center text-dark-800`}
                          >
                            {job.title}
                          </h4>
                          <p className="text-center text-lg text-dark-800 font-base">
                            {user === "freelancer"
                              ? ""
                              : "¡You joined a pool of reviewers!"}
                          </p>
                          <div
                            className={`list-inside text-sm text-dark-800 flex flex-col gap-1 ${
                              user === "freelancer" ? "text-center text-lg" : ""
                            } `}
                          >
                            {user === "freelancer"
                              ? "You joined a pool of interested freelancers, and will get news soon from your employer."
                              : [
                                  "You’ll review if the freelancer meet all the tasks.",
                                  "You’ll get paid after you review the job regardless of the result. The payment is the result of interest gained from employer’s escrowed money in AAVE.",
                                  "The employer can rate you, the more trustworthy you are the more jobs you’ll be able to review.",
                                ].map((e) => (
                                  <li className="font-normal w-11/12">{e}</li>
                                ))}
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="pt-4">
                        <AlertDialogCancel className="py-3 mr-auto px-4 text-green-500 border-green-500 hover:bg-[#d5fcc5] bg-[#d5fcc5] rounded-full font-semibold">
                          <MoveLeftIcon className="w-6 h-6 mr-2" />
                          Back to open{" "}
                          {user === "freelancer" ? "jobs" : "reviews"}
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => router.push(`/dashboard?${user === "freelancer" ? "user=freelancer" : "user=reviewer"}`)}
                          className="py-3 px-4 text-green-500 bg-grad-magic rounded-full shadow-md font-semibold"
                        >
                          Go to Dashboard
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ) : null}
            </div>
          ))
        )}
    </>
  );
}
