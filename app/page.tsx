import HomepageCards from "@/components/HomepageCards";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-10">
      <Image
        src="/hero.png"
        alt="hero"
        width={5000}
        height={5000}
        className="object-cover  h-screen flare contrast-50 absolute -z-10"
      />
      <div className="w-full h-screen flex flex-col justify-center items-center gap-12">
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          <Image
            src={"/logo.svg"}
            alt="hero"
            width={5000}
            height={5000}
            className="w-4/12"
          />
          <p className="text-2xl font-bold">
            Find work, review jobs or hire talent.
          </p>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <p className="text-lg py-4 font-bold ">
            Anonymous, secure and always free to use
          </p>
          <Button className="flex items-center w-fit gap-1 px-3 py-1 ring-1 ring-white text-green-500 bg-grad-magic rounded-full shadow-md">
            <Sparkles className="w-5 h-5" strokeWidth={1.5} />
            Join the HEROES
          </Button>
        </div>
      </div>
      <div className="w-10/12 m-auto flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center">
          Choose your HERO role
        </h1>
        <div className="flex justify-between gap-3">
          {[
            {
              title: "Reviewer",
              content1: "Earn reviewing freelancers jobs.",
              content2: "Connect with like minded people.",
              img: "/reviewer.jpg",
            },
            {
              title: "Freelance",
              content1:
                "Trustless and secure payments for your delivered jobs.",
              content2: "Get instant feedback from experts.",
              img: "/freelancer.jpg",
            },
            {
              title: "Reviewer",
              content1: "Hire the best talent, get jobs securely delivered.",
              content2: "Get jobs reviewed by experts.",
              img: "/Employer.jpg",
            },
          ].map(({ title, content1, content2, img }) => (
            <div className="w-4/12 bg-grad-magic rounded-3xl py-3 px-1 ">
              <p className="text-2xl font-medium text-center py-2">{title}</p>
              <div className="bg-mint-200 flex flex-col justify-between h-[90%] w-[99%] m-auto rounded-3xl pt-4">
                <div className="w-10/12 mx-auto flex flex-col justify-between h-full mb-0 pb-0 gap-8">
                  <div>
                    <li>{content1}</li>
                    <li>{content2}</li>
                  </div>
                  <Image
                    src={img}
                    alt="hero"
                    width={5000}
                    height={5000}
                    className="fit rounded-t-full w-8/12  mx-auto h-64 opacity-50 "
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-10/12 m-auto flex flex-col gap-8">
        <h2 className="text-4xl font-bold text-center py-2">
          Find the perfect talent for every project
        </h2>
        <div className="flex w-11/12 flex-wrap justify-evenly gap-y-4">
          {[
            "Admin & Customer Support",
            "Sales & Marketing",
            "Design & Creative",
            "AI services",
            "Writing & Translation",
            "Development & IT",
          ].map((role) => (
            <p className="text-lg font-medium text-center w-fit rounded-full px-8 py-2 bg-grad-magic">
              {role}
            </p>
          ))}
        </div>
      </div>
      <HomepageCards />
    </div>
  );
}
