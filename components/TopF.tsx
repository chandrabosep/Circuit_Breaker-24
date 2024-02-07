import React from "react";
import { Hanken_Grotesk } from "next/font/google";
import Image from "next/image";

const hanken: any = Hanken_Grotesk({
  subsets: ["latin"],
  weight: "900",
});
export default function TopF() {
  return (
    <div className="py-4">
      <div className="h-2"></div>

      <div className="relative w-full">
        <h1
          className={`${hanken.className} text-5xl absolute z-10 bg-clip-text bg-text-grad-magic text-transparent`}
        >
          Top Freelancers
        </h1>
        <h1
          className={`${hanken.className} text-5xl absolute -left-[2.5px] top-[3px] z-0`}
        >
          Top Freelancers
        </h1>
      </div>
      <div className="h-14"></div>

      <div className="mt-10 w-full bg-grad-soft py-6 rounded-3xl">
        <div className="grid grid-cols-3 gap-4 w-11/12 m-auto">
          {[
            {
              address: "0xfD8B5...c4621",
              collected: "2500",
              submitted: "15",
              img: "/f1.png",
            },
            {
              address: "0xbA3D5...de61f",
              collected: "1500",
              submitted: "10",
              img: "/f2.png",
            },
            {
              address: "0x71AdE...7F0A0",
              collected: "850",
              submitted: "7",
              img: "/f3.png",
            },
          ].map((item) => (
            <div className="flex gap-4 relative w-full">
              <Image
                src={item.img}
                alt="logo"
                width={2000}
                height={2000}
                className="absolute bottom-0 left-0 w-[40%]"
              />
              <div className="w-[40%] h-full"></div>
              <div className="flex flex-col w-1/2 items-start ">
                <p className={`${hanken.className} text-lg`}>{item.address}</p>
                <p>Collect this Month</p>
                <p className={`${hanken.className} text-2xl`}>
                  {item.collected} DAI
                </p>
                <p>Submitted Jobs</p>
                <p className={`${hanken.className} text-2xl`}>
                  {item.submitted}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
