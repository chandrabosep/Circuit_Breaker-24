import React from "react";
import { Hanken_Grotesk } from "next/font/google";
import GlobalChat from "@/components/GlobalChat";

const hanken: any = Hanken_Grotesk({
  subsets: ["latin"],
  weight: "800",
});

export default function page() {
  return (
    <div className="w-11/12 m-auto py-6">
      <h1 className={`${hanken.className} text-3xl`}>
        Zero to Hero Global Chat
      </h1>
      <GlobalChat />
    </div>
  );
}
