"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { useStore } from "@/context/store";
import { useAccount } from "wagmi";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function HomePageBtn() {
  const [data, setData] = React.useState<any>();
  const [employer, setEmployer] = React.useState<any>();
  const [eAddress, setEAddress] = React.useState<String>("");
  const [reviewer, setReviewer] = React.useState<any>();
  const address = useAccount();
  const {
    Reviewer,
    Freelancer,
    Employer,
    updateReviewer,
    updateFreelancer,
    updateEmployer,
  } = useStore();

  const searchParams = useSearchParams();
  const user = searchParams.get("user");

  console.log(address);
  useEffect(() => {
    async function fetchReviewerJobs() {
      try {
        const response = await axios.get(
          "/api/fetchReviewers?reviewerAddress=" + address
        );
        const reviewerData = response.data;
        setReviewer(reviewerData.reviewer.jobs[0]);
      } catch (err) {
        console.error("Error fetching reviewer jobs:", err);
      }
    }
    fetchReviewerJobs();
  }, []);
  useEffect(() => {
    async function getJobs() {
      console.log(reviewer && reviewer[0]);

      try {
        if (user === "employer") {
          const jobs = await axios.get(
            "/api/fetchJobs?employerAddress=" + `${address}`
          );
          updateEmployer(true);
          setData(jobs.data);
        } else if (user === "freelancer") {
          const jobs = await axios
            .get("/api/fetchJobs/fetchFreelancerJobs?address=" + `${address}`)
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
              updateFreelancer(true);
              setEmployer(details.data);
            });
        } else if (user === "reviewer") {
          if (reviewer) {
            await axios
              .get("/api/fetchJobs/fetchReviewerJobs?jobId=" + `${reviewer}`)

              .then((res) => {
                updateReviewer(true);
                setData(res.data);
              });
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    getJobs();
  }, [user, address, reviewer]);

  useEffect(() => {}, [eAddress, employer]);

  let href;
  let e;
  if (Employer) {
    href = "/dashboard?user=employer";
    e = "Employer Dashboard";
  } else if (Reviewer) {
    href = "/jobs?user=reviewer";
    e = "Open Jobs to Review";
  } else if (Freelancer) {
    href = "/jobs?user=freelancer";
    e = "Open Jobs";
  } else {
    href = "/select-profile";
    e = "Join Heroes";
  }
  return (
    <Link href={href}>
      <Button className="flex items-center w-fit gap-1 px-3 py-1 ring-1 ring-white text-green-500 bg-grad-magic rounded-full shadow-md">
        <Sparkles className="w-5 h-5" strokeWidth={1.5} />
        {e}
      </Button>
    </Link>
  );
}
