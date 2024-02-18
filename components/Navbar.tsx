"use client";
import { MessageCircleMore, Sparkle, Sparkles } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useStore } from "@/context/store";

type address = string | undefined | null;

export default function Navbar() {
  const [current, setCurrent] = useState(
    `text-mint-100 bg-dark-800 px-3 py-1.5 rounded-full`
  );
  const path = usePathname();
  const {
    Reviewer,
    Freelancer,
    Employer,
    updateReviewer,
    updateFreelancer,
    updateEmployer,
  } = useStore();

  const {
    isConnected,
    address,
  }: { isConnected: boolean; address: address | null | undefined } =
    useAccount();
  const { open } = useWeb3Modal();
  function extractLetters() {
    if (!address) {
      return "";
    }

    const firstFour = address.substring(0, 4);
    const lastSix = address.substring(Math.max(0, address.length - 6));

    return `${firstFour}...${lastSix}`;
  }

  console.log(path);
  const NavbarLogic = ({ role }: { role: string }) => {
    if (role === "reviewer") {
      return (
        <>
          {[
            {
              name: "My Chat",
              id: "/chat",
              link: "/chat?user=reviewer",
            },
            {
              name: "Dashboard",
              id: "/dashboard",
              link: "/dashboard?user=reviewer",
            },
            {
              name: "Jobs to Review",
              id: "/jobs",
              link: "/jobs?user=reviewer",
            },
          ].map((item) => (
            <Link
              className={
                item.id === path
                  ? current
                  : `text-dark-800  px-3 py-1.5 rounded-full`
              }
              href={item.link}
            >
              {item.name}
            </Link>
          ))}
        </>
      );
    } else if (role === "freelancer") {
      return (
        <>
          {[
            {
              name: "My Chat",
              id: "/chat",
              link: "/chat?user=freelancer",
            },
            {
              name: "Dashboard",
              id: "/dashboard",

              link: "/dashboard?user=freelancer",
            },
            {
              name: "Jobs Open",
              link: "/jobs?user=freelancer",
              id: "/jobs",
            },
          ].map((item) => (
            <Link
              className={
                item.id === path
                  ? current
                  : `text-dark-800 px-3 py-1.5 rounded-full`
              }
              href={item.link}
            >
              {item.name}
            </Link>
          ))}
        </>
      );
    } else {
      return (
        <>
          {[
            {
              name: "My Chat",
              link: "/chat?user=employer",
            },
            {
              name: "Dashboard",
              link: "/dashboard?user=employer",
            },
            {
              name: "Post a Job",
              link: "/post-job?user=employer",
            },
          ].map((item, index) => (
            <Link
              key={index}
              className={`${current} text-dark-800 px-3 py-1.5 rounded-full`}
              href={item.link}
            >
              {item.name}
            </Link>
          ))}
        </>
      );
    }
  };

  return (
    <div className="max-w-screen-3xl w-11/12 m-auto py-4 flex justify-between border-b-[3px] border-dark-800">
      <div className="flex items-center gap-4">
        <Link href={"/"}>
          <Image src={"/logo.svg"} alt="logo" width={120} height={120} />
        </Link>
        {Reviewer || Employer || Freelancer ? (
          <NavbarLogic
            role={
              Reviewer
                ? "reviewer"
                : Employer
                ? "employer"
                : Freelancer
                ? "freelancer"
                : ""
            }
          />
        ) : (
          ""
        )}
      </div>
      <div className="flex gap-4">
        {path === "/" ? (
          <Button
            onClick={() => open()}
            className="w3m-account-button text-md text-green-500 px-5 gap-2"
          >
            <Image src={"/contract.svg"} alt="logo" width={18} height={18} />
            {isConnected ? extractLetters() : "connect Wallet"}
          </Button>
        ) : (
          <>
            <Link
              href={"/global-chat"}
              className="flex items-center gap-1 px-3 py-1 text-green-500 bg-grad-magic rounded-full shadow-md"
            >
              <MessageCircleMore className="w-5 h-5" /> Chat
            </Link>
            <Button
              onClick={() => open()}
              className="w3m-account-button text-md text-green-500 px-5 gap-2"
            >
              <Image src={"/contract.svg"} alt="logo" width={18} height={18} />
              {isConnected ? extractLetters() : "connect Wallet"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
