"use client";
import React from "react";
import { Hanken_Grotesk } from "next/font/google";

const hanken: any = Hanken_Grotesk({
  subsets: ["latin"],
  weight: "800",
});

const hanken_semibold: any = Hanken_Grotesk({
  subsets: ["latin"],
  weight: "600",
});

export default function JobCards() {
  return (
    <div className="w-full border border-green-500 px-3 py-2 rounded-2xl">
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
        <p className={`${`line-clamp-2`} text-wrap`}>
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
      </div>
    </div>
  );
}
