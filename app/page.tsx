import HomepageCards from "@/components/HomepageCards";
import Profiles from "@/components/Profiles";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
          <Link href={"/select-profile"}>
            <Button className="flex items-center w-fit gap-1 px-3 py-1 ring-1 ring-white text-green-500 bg-grad-magic rounded-full shadow-md">
              <Sparkles className="w-5 h-5" strokeWidth={1.5} />
              Join the HEROES
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-10/12 m-auto flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center">
          Choose your HERO role
        </h1>
        <Profiles btn={false} />
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
