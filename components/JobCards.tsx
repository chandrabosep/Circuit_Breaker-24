"use client";
import React, { useState } from "react";
import { Hanken_Grotesk } from "next/font/google";
import { Button } from "./ui/button";
import {
  CalendarDays,
  Check,
  ChevronDownIcon,
  ChevronUpIcon,
  Globe2,
  Users2,
} from "lucide-react";

const hanken: any = Hanken_Grotesk({
  subsets: ["latin"],
  weight: "800",
});

const hanken_semibold: any = Hanken_Grotesk({
  subsets: ["latin"],
  weight: "600",
});

export default function JobCards() {
  const [reveal, setReveal] = useState(false);

  return (
    <div className="w-full border border-green-500 px-3 py-4 my-4 rounded-2xl">
      <div className="flex justify-between">
        <h1 className={`${hanken_semibold.className} text-xl`}>
          Mobile App Design - UI/UX Specialist
        </h1>
        <div className="flex gap-4">
          <p>
            Created on{" "}
            <span className={`${hanken.className}`}>Feb, 2 / 2024</span>
          </p>
          <div className="flex flex-col p-1.5 rounded-lg bg-mint-200 text-sm">
            <p>Time Left to Apply</p>
            <span>02D: 03H: 04M</span>
          </div>
        </div>
      </div>
      <div className="py-4">
        <p
          className={`${reveal ? `line-clamp-none` : `line-clamp-2`} text-wrap`}
        >
          {`          Looking for an experienced UX/UI designer to design a stunning
          e-Commerce platform.This platform will be designed as a PWA app
          meaning it will render on regular desktops as well as smart devices
          (phones/tablets).
          You must have created similar projects in the past
          to be considered.when replying to this post please confirm that you
          are available on a full-time basis for this project.We are looking for
          talented individuals to join our growing team.
  `}
        </p>
        {reveal ? (
          <div className="py-2">
            <h4
              className={`${hanken_semibold.className} text-xl text-green-500`}
            >
              8 Job Tasks
            </h4>
            <div className="grid grid-cols-4 gap-3 pt-3">
              {[
                "Create a user dashboard",
                "Create landing page",
                "Create all icons",
                "Create store builder",
                "Create Marketplace",
                "Design Checkout Modal",
                "Design User Creator",
                "Design User/Merchant chat",
              ].map((task) => (
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
            <p>Feb, 2 / 2024</p>
          </div>
          <div className="flex gap-1.5 items-center bg-mint-200 px-2.5 py-1 rounded-lg">
            <Users2 className="w-5 h-5" />
            <span className={`${hanken.className}`}>
              Freelancers intrested:
            </span>
            <p>5</p>
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
          <Button className="text-green-500 px-6 text-base bg-grad-magic rounded-full shadow-md">
            Apply
          </Button>
        </div>
      ) : null}
    </div>
  );
}
