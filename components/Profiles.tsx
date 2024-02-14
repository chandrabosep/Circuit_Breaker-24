"use client";
import Image from "next/image";
import React from "react";
import { Briefcase, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import EmployerModal from "./EmployerModal";

export default function Profiles({ btn }: { btn: boolean }) {
  return (
    <div>
      <div className="flex justify-evenly gap-3">
        {[
          {
            title: "Reviewer",
            content1: "Earn reviewing freelancers jobs.",
            content2: "Connect with like minded people.",
            img: "/reviewer.jpg",
            icon: (
              <Image
                src={"/eyes.svg"}
                alt="eyes"
                className="w-5 h-5 mr-2"
                height={5000}
                width={5000}
              />
            ),
          },
          {
            title: "Freelance",
            content1: "Trustless and secure payments for your delivered jobs.",
            content2: "Get instant feedback from experts.",
            img: "/freelancer.jpg",
            icon: <Wand2 className="w-5 h-5 mr-2" strokeWidth={1.5} />,
          },
          {
            title: "Employer",
            content1: "Hire the best talent, get jobs securely delivered.",
            content2: "Get jobs reviewed by experts.",
            img: "/Employer.jpg",
            icon: <Briefcase className="w-5 h-5 mr-2" strokeWidth={1.5} />,
          },
        ].map(({ title, content1, content2, img, icon }) => (
          <div
            className={`w-4/12 max-w-[350px] ${
              title === "Freelance" ? "bg-grad-magic" : "bg-[#d8ffc4a2]"
            }  rounded-3xl py-3 px-1 `}
          >
            <p className="text-2xl font-medium text-center py-2">{title}</p>
            <div className="bg-mint-200 flex flex-col justify-between h-[90%] w-[99%] m-auto rounded-3xl pt-4">
              <div className="w-10/12 mx-auto flex flex-col justify-between h-full mb-0 pb-0 gap-8">
                <ul className="list-disc">
                  <li>{content1}</li>
                  <li>{content2}</li>
                </ul>
                <div className="relative">
                  <Image
                    src={img}
                    alt="hero"
                    width={5000}
                    height={5000}
                    className="fit rounded-t-full w-8/12  mx-auto h-64 opacity-50 "
                  />
                  {btn && (
                    <div className="w-9/12 mx-auto ">
                      {title != "Employer" ? (
                        <Button className="w-9/12 mx-auto flex items-center absolute bottom-4  px-3 py-1 text-green-500 bg-grad-magic rounded-full shadow-md">
                          {icon}Be a {title}
                        </Button>
                      ) : (
                        <EmployerModal title={title} icon={icon} />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
