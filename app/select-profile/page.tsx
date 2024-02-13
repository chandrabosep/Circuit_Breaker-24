import React from "react";
import { Hanken_Grotesk } from "next/font/google";
import Profiles from "@/components/Profiles";

const hanken: any = Hanken_Grotesk({
  subsets: ["latin"],
  weight: "600",
});
export default function page() {
  return (
    <div className="w-9/12 m-auto py-10 flex flex-col gap-8">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1
          className={`${hanken.className}  text-5xl  bg-clip-text bg-text-grad-magic text-transparent`}
        >
          The platform for HEROES
        </h1>
        <p className="text-xl font-medium">Choose your Hero Role</p>
      </div>
      <Profiles btn={true} />
    </div>
  );
}
