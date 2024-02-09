"use client";
import { MessageCircleMore } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Link from "next/link";

type address = string | undefined | null;

export default function Navbar() {
  const [current, setCurrent] = useState(
    `text-mint-100 bg-dark-800 px-3 py-1.5 rounded-full`
  );

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
  return (
    <div className="max-w-screen-3xl w-11/12 m-auto py-4 flex justify-between border-b-[3px] border-dark-800">
      <div className="flex items-center gap-4">
        <Image src={"/logo.svg"} alt="logo" width={120} height={120} />
        <span className={`${current}`}>Jobs Open</span>
        <span className={`${current}`}>Jobs to Review</span>
        <span className={`${current}`}>Post a Job</span>
      </div>
      <div className="flex gap-4">
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
      </div>
    </div>
  );
}
