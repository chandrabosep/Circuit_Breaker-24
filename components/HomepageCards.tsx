import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

export default function HomepageCards() {
  return (
    <>
      <div className="w-9/12 m-auto flex flex-col gap-6 ">
        <h2 className="text-4xl font-bold text-center py-2">
          How to go from Zero to Hero?{" "}
        </h2>
        <div className="w-11/12 mx-auto border-4 flex flex-col border-[#a9fc65] bg-mint-200 rounded-3xl">
          <div className="w-full border-grad-magic flex flex-wrap gap-y-4">
            <div className="w-4/12 mx-auto m-auto ">
              <Image
                src={"/step1.png"}
                alt="hero"
                width={5000}
                height={5000}
                className="w-56 shadow-lg shadow-black h-60 round  mx-auto"
              />
            </div>
            <div className="flex flex-col w-7/12 py-8 gap-6  ">
              <div className="flex flex-col w-11/12">
                <h3 className="text-2xl font-bold">Heroes Join the Plaftorm</h3>
                <div className="flex flex-col py-4">
                  {[
                    "Freelancers and Reviewers get verified with GitHub commits.",
                    " Employer signs and start creating jobs.",
                    "   All roles are anonymous and join a global decentralized chat.",
                  ].map((e) => (
                    <li className="text-lg list-disc	">{e}</li>
                  ))}
                </div>
              </div>
              <Button className="flex items-center mr-4 self-end font-semibold w-fit gap-1 px-3 py-1 text-green-500 bg-grad-magic rounded-full shadow-md">
                <Sparkles className="w-6 h-6" strokeWidth={1.5} />
                Join the HEROES
              </Button>
            </div>
          </div>
        </div>
        {[
          {
            title: "Employer Post a Job",
            index: 2,
            list: [
              "Budget gets escrowed and sent to AAVE to collect interests.",
              "Job gets posted and freelancers show their interest.",
              "Employer choose the preferred freelancer.",
            ],
            image: "/step2.png",
          },
          {
            title: "Freelance Gets Hired",
            subTitle:
              "“Need a dev legend to build an awesome dApp, my budget is 2500 DAI”",
            list: [
              "Join an anonymous group chat with the employer to manage the job tasks.",
              "Delivers the job when completed all the tasks required by the employer.",
              "Their delivered job gets reviewed by a group of experts in the field.",
            ],
            image: "/step3.png",
          },
          {
            title: "Reviewers Assess Jobs",
            list: [
              " Reviewers join a group of experts that will assess the project based on the required tasks.",
              "Their decision is pivotal on the payment, they are the key piece to let know both employers and freelancers if they job was successfully achived.",
            ],
            image: "/step4.png",
          },
          {
            title: "Everyone is Happy",
            list: [
              "    Reviewers check that the job was successfully achieved.",
              "   Escrowed money from the employer goes directly to Freelancer wallet.",
              "Interests earned while escrowed goes to the reviewers for their commitment on assesing the job.",
            ],
            image: "/step5.png",
          },
        ].map(({ title, index, subTitle, list, image }) => (
          <div className="w-11/12 mx-auto flex flex-col bg-mint-200 rounded-3xl">
            <div className="w-full flex flex-wrap gap-y-4">
              <div className="w-4/12 m-auto ">
                {index === 2 ? (
                  <Image
                    src={image}
                    alt={image}
                    width={5000}
                    height={5000}
                    className="w-56 shadow-lg shadow-black h-60 mx-auto my-4 round"
                  />
                ) : (
                  <Image
                    src={image}
                    alt={image}
                    width={5000}
                    height={5000}
                    className="w-56 shadow-lg shadow-black h-60 mx-auto round "
                  />
                )}
              </div>
              <div className="flex flex-col w-7/12 py-8 gap-6  ">
                <div className="flex flex-col w-11/12">
                  <h3 className="text-2xl font-bold">{title}</h3>

                  {subTitle && <p className="text-base pt-4 ">{subTitle}</p>}

                  <ol className="flex flex-col py-4">
                    {list.map((e) => (
                      <li className="text-lg list-disc">{e}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
