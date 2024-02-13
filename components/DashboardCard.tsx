import { ListChecks, MessageCircleMore, Timer, UploadCloud } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";

export default function DashboardCard() {
  return (
    <div className="w-full flex py-2 px-4 rounded-xl justify-between items-center bg-[#d5fcc5]">
      <div className="w-1/6 flex flex-col ">
        <Image
          src="/f2.png"
          alt="logo"
          width={5000}
          height={5000}
          className="w-10"
        />
        <p className="text-md font-semibold">Name</p>
        <p className="text-sm">Company</p>
      </div>

      <div className="w-full flex flex-col justify-between h-full gap-2.5 px-1">
        <h3 className="text-lg float-start font-semibold">
          Develop a DeFi Dashboard for Hamster Coins
        </h3>
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
              <p>02D: 03H: 04M</p>
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
  );
}
