"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CalendarDays, Check, Timer, Wand2 } from "lucide-react";
import EmployerReview from "./EmployerReview";
export default function JobsApproveCard() {
  const address = useAccount();
  const [data, setData] = React.useState<any>([]);
  const [applicantId, setapplicantId] = useState<string>("");
  const [jobId, setJobId] = React.useState<any>("");
  async function acceptFreelancer() {
    try {
      await axios.post("/api/approveFreelancer", {
        jobId: jobId,
        applicantId: applicantId,
      });
    } catch (error) {
      console.log(error);
    }
  }
  function extractLetters(address: string) {
    if (!address) {
      return "";
    }

    const firstFour = address.substring(0, 4);
    const lastSix = address.substring(Math.max(0, address.length - 6));

    return `${firstFour}...${lastSix}`;
  }
  useEffect(() => {
    async function getJobs() {
      try {
        const jobs = await axios.get(
          "/api/fetchJobs?employerAddress=" + `${address.address}`
        );
        setData(jobs.data);
      } catch (err) {
        console.log(err);
      }
    }
    getJobs();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-6">
        <h3 className="text-xl font-bold flex flex-col gap-5">
          Jobs To Approve
        </h3>
        {data.employer &&
          data.employer.map((people: any) =>
            people.jobs.map((job: any) => (
              <div className="w-full bg-[#d5fcc5] py-2 flex-col">
                <div className="w-11/12 m-auto flex flex-col gap-4">
                  <h3 className="text-lg font-black">{job.title}</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm">Intrested Freelancers</h4>
                      <div className="flex gap-2">
                        {job.peopleApplied.map(
                          (address: string, index: number) => (
                            <>
                              <Image
                                src={`/f${index + 1}.png`}
                                alt="hero"
                                className="w-6"
                                width={5000}
                                height={5000}
                              />
                            </>
                          )
                        )}
                      </div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <div
                          onClick={() => setJobId(job.id)}
                          className=" gap-1 px-3 py-0.5 text-sm text-green-500 bg-grad-magic rounded-full shadow-md"
                        >
                          View Offer
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-mint-200">
                        <AlertDialogHeader>
                          <AlertDialogDescription>
                            <EmployerReview
                              Title={job.title}
                              Description={job.description}
                              RSubmit={job.delivery}
                              FSubmit={job.reviewDate}
                              tasks={job.tasks}
                            />
                            <div className="py-4">
                              <h2 className="flex items-center text-lg font-bold text-green-500">
                                <Wand2
                                  className="w-5 h-5 mr-2"
                                  strokeWidth={1.5}
                                />{" "}
                                Choose Freelancer
                              </h2>
                              <div>
                                {job.peopleApplied.map(
                                  (address: string, index: number) => (
                                    console.log(job.peopleApplied[index]),
                                    (
                                      <div
                                        onClick={() =>
                                          setapplicantId(
                                            job.peopleApplied[index].toString()
                                          )
                                        }
                                        className={`flex w-fit gap-4 p-2 cursor-pointer px-4 ${
                                          applicantId === job.peopleApplied[index]
                                            ? `bg-[#d2ffc0] border-2 border-dark-800/30`
                                            : `bg-[#d5fcc548]`
                                        } rounded-lg  `}
                                      >
                                        <Image
                                          src={`/f${index + 1}.png`}
                                          alt="hero"
                                          className="w-8"
                                          width={5000}
                                          height={5000}
                                        />
                                        <p className="text-dark-800">
                                          {extractLetters(
                                            job.peopleApplied[index]
                                          )}
                                          <p className="text-sm">
                                            1 Day on Zero to Hero
                                          </p>
                                        </p>
                                      </div>
                                    )
                                  )
                                )}
                              </div>
                            </div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="gap-1 px-8 py-0.5 text-sm text-green-500 bg-grad-magic rounded-full">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => acceptFreelancer()}
                            className="gap-1 px-8 py-0.5 text-sm text-green-500 bg-grad-magic rounded-full shadow-md"
                          >
                            Accept Freelance
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))
          )}
      </div>
    </>
  );
}
