"use client";
import React, { useEffect, useState } from "react";
import { Hanken_Grotesk } from "next/font/google";
import { Send, Timer, UsersRound, UsersRoundIcon } from "lucide-react";
import Image from "next/image";
import { useAccount } from "wagmi";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const hanken: any = Hanken_Grotesk({
  subsets: ["latin"],
  weight: "800",
});

export default function Chat() {
  const [inputText, setInputText] = useState("");
  const searchQuery = useSearchParams();
  const user = searchQuery.get("user");

  const address = useAccount();
  function sendMessage() {
    setMessages([
      ...messages,
      {
        address: address.address,
        text: inputText,
      },
    ]);
  }

  const [data, setData] = React.useState<any>();
  const [employer, setEmployer] = React.useState<any>();
  const [eAddress, setEAddress] = React.useState<String>("");
  const [reviewer, setReviewer] = React.useState<any>();

  useEffect(() => {
    async function fetchReviewerJobs() {
      try {
        const response = await axios.get(
          "/api/fetchReviewers?reviewerAddress=" + address.address
        );
        const reviewerData = response.data;
        setReviewer(reviewerData.reviewer.jobs[0]);
      } catch (err) {
        console.error("Error fetching reviewer jobs:", err);
      }
    }
    fetchReviewerJobs();
  }, []);

  console.log(reviewer);
  useEffect(() => {
    async function getJobs() {
      console.log(reviewer && reviewer[0]);

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
        } else if (user === "reviewer") {
          if (reviewer) {
            await axios
              .get("/api/fetchJobs/fetchReviewerJobs?jobId=" + `${reviewer}`)

              .then((res) => {
                setData(res.data);
              });
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    getJobs();
  }, [user, address.address, reviewer]);

  useEffect(() => {}, [eAddress, employer]);

  const [messages, setMessages] = useState(() => {
    const storedMessages = sessionStorage.getItem(
      user === "freelancer"
        ? "fmessages"
        : user === "reviewer"
        ? "rmessages"
        : "emessages"
    );
    return storedMessages && JSON.parse(storedMessages);
  });

  useEffect(() => {
    localStorage.setItem(
      user === "freelancer"
        ? "fmessages"
        : user === "reviewer"
        ? "rmessages"
        : "emessages",
      JSON.stringify(messages)
    );
  }, [messages]);
  return (
    <div>
      <div className="w-11/12 m-auto">
        <div className="flex justify-between pt-2 items-center">
          <p className={`${hanken.className}  text-3xl`}>Freelancer Chat</p>
          <div>
            <p className="text-lg text-dark-800 flex items-center bg-mint-200 px-6 rounded-full p-1">
              <UsersRoundIcon size={22} fill="#000" className="mr-1" /> 0 Online
            </p>
          </div>
        </div>
        <div className="flex gap-4 py-6">
          <div className="flex flex-col w-4/12 bg-mint-200 p-2 rounded-xl gap-y-4">
            <p
              className={`${hanken.className} text-lg flex items-center justify-center bg-mint-300 p-1.5 rounded-full `}
            >
              <UsersRound size={22} fill="#000" />
              120 Online
            </p>
            {user === "reviewer" ? (
              <div>
                {data && data.employer && console.log(data.employer.employer)}

                {data &&
                  data.employer &&
                  data.employer.employer.jobs.map((job: any) => (
                    <>
                      <div className="w-full py-2 px-4 rounded-xl justify-between items-center bg-[#d5fcc5]">
                        <div className="w-full flex flex-col h-full gap-2.5 px-1">
                          <h3 className="text-lg float-start font-semibold">
                            {job.title.slice(0, 20) + "..."}
                          </h3>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Image
                            src="/r2.png"
                            alt="logo"
                            width={5000}
                            height={5000}
                            className="w-10 h-10"
                          />
                          <div className="flex w-full justify-between items-center">
                            <div>
                              <p className={`${hanken.className} text-base`}>
                                {data.employer.employer &&
                                  data.employer.employer.name.slice(0, 12) +
                                    "..."}
                              </p>
                              <p className={` text-sm `}>
                                {data.employer.employer &&
                                  data.employer.employer.companyName.slice(
                                    0,
                                    7
                                  ) + "..."}
                              </p>
                            </div>
                            <div className="flex gap-4 items-center text-red bg-mint-100 p-1 px-1.5 rounded-lg">
                              <Timer className="w-6 h-6" />
                              <div className="text-sm">
                                <p>Time Left to Deliver</p>
                                <p>{job.delivery}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            ) : user === "freelancer" ? (
              <div className="w-full">
                {data &&
                  data.employer.map(
                    (job: any) => (
                      console.log(),
                      (
                        <div className="w-full py-2 px-4 rounded-xl justify-between items-center bg-[#d5fcc5]">
                          <div className="w-full flex flex-col h-full gap-2.5 px-1">
                            <h3 className="text-lg float-start font-semibold">
                              {job.title.slice(0, 20) + "..."}
                            </h3>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Image
                              src="/f2.png"
                              alt="logo"
                              width={5000}
                              height={5000}
                              className="w-8 h-8"
                            />
                            <div className="flex w-full justify-between items-center">
                              <div>
                                <p className={`${hanken.className} text-base`}>
                                  {employer &&
                                    employer.employers.name.slice(0, 12) +
                                      "..."}
                                </p>
                                <p className={` text-sm `}>
                                  {employer &&
                                    employer.employers.companyName.slice(0, 7) +
                                      "..."}
                                </p>
                              </div>
                              <div className="flex gap-4 items-center text-red bg-mint-100 p-1 px-1.5 rounded-lg">
                                <Timer className="w-6 h-6" />
                                <div className="text-sm">
                                  <p>Time Left to Deliver</p>
                                  <p>{job.delivery}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  )}
              </div>
            ) : (
              <div>
                {data &&
                  data.employer.map(
                    (job: any) =>
                      job.jobs &&
                      job.jobs.map(
                        (j: any) => (
                          console.log(job),
                          (
                            <div className="w-full py-2 px-4 rounded-xl justify-between items-center bg-[#d5fcc5]">
                              <div className="w-full flex flex-col h-full gap-2.5 px-1">
                                <h3 className="text-lg float-start font-semibold">
                                  {j.title.slice(0, 20) + "..."}
                                </h3>
                              </div>
                              <div className="flex gap-2 items-center">
                                <Image
                                  src="/f2.png"
                                  alt="logo"
                                  width={5000}
                                  height={5000}
                                  className="w-8 h-8"
                                />
                                <div className="flex w-full justify-between items-center">
                                  <div>
                                    <p
                                      className={`${hanken.className} text-base`}
                                    >
                                      {job && job.name}
                                    </p>
                                    <p className={` text-sm `}>
                                      {job && job.companyName}
                                    </p>
                                  </div>
                                  <div className="flex gap-4 items-center text-red bg-mint-100 p-1 px-1.5 rounded-lg">
                                    <Timer className="w-6 h-6" />
                                    <div className="text-sm">
                                      <p>Time Left to Deliver</p>
                                      <p>{j.delivery}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )
                      )
                  )}
              </div>
            )}
          </div>
          <div className="flex-1 w-8/12 h-screen">
            <div className="w-full bg-mint-200 p-2 rounded-xl ">
              <div className="flex flex-col h-[80vh]">
                <div className="overflow-y-auto flex-grow">
                  {messages.map((message: any) => (
                    <div
                      className={`flex justify-${
                        message.address !== "bot" ? "end" : "start"
                      } mb-2`}
                    >
                      {message.address === address.address ? (
                        <div>
                          <p>You</p>
                          <div className="w-fit max-w-md pt-2.5 pr-3 pb-1.5 rounded-lg bg-grad-soft flex items-start gap-0.5 text-lg">
                            <Image
                              src={`/f13.png`}
                              alt="bot"
                              width={1000}
                              height={1000}
                              className="h-fit w-fit"
                            />
                            {message.text}
                          </div>
                        </div>
                      ) : (
                        <div className="w-fit max-w-md pt-2.5 pr-3 pb-1.5 rounded-lg bg-mint-300 flex items-start gap-0.5 text-lg">
                          <Image
                            src="/f11.png"
                            alt="bot"
                            width={1000}
                            height={1000}
                            className="h-fit w-fit"
                          />
                          {message.text}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center p-4">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-grow border rounded-lg p-2 mr-2 bg-mint-300 border-none text-dark-800-30"
                  />
                  <button
                    onClick={() => sendMessage()}
                    className="bg-grad-magic text-white p-2 rounded-full"
                  >
                    <Send size={18} fill="#fff" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
