"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import JobCards from "./JobCards";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Jobs() {
  const searchParams = useSearchParams();

  const user = searchParams.get("user");


  return (
    <div>
      <div className="w-full m-auto flex gap-4 items-center text-lg">
        <p className="w-1/4 px-4 py-2 border-b-4 border-lime-400">Job Types</p>
        <p className="w-full px-4 py-2 border-b-4 border-lime-600">
          Available Jobs
        </p>
      </div>
      <Tabs defaultValue="dev" className="w-full flex gap-4">
        <TabsList className="flex flex-col bg-none w-1/4">
          {[
            { trigger: "dev", content: "Development & IT" },
            { trigger: "design", content: "Design & Creative" },
            {
              trigger: "ai",
              content: "AI services",
            },
            {
              trigger: "sales",
              content: "Sales & Marketing",
            },
            {
              trigger: "support",
              content: "Admin & Customer Support",
            },
            {
              trigger: "writing",
              content: "Writing & Translation",
            },
          ].map(({ trigger, content }) => (
            <TabsTrigger value={trigger} className="flex gap-3">
              {" "}
              <Image
                src={`/${trigger}.svg`}
                alt="logo"
                width={20}
                height={20}
              />{" "}
              {content}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="dev">
          <JobCards  user={user}/>
        </TabsContent>
        <TabsContent value="design">
          <JobCards  user={user}/>
        </TabsContent>
        <TabsContent value="ai">
          <JobCards  user={user}/>
        </TabsContent>
        <TabsContent value="sales">
          <JobCards  user={user}/>
        </TabsContent>
        <TabsContent value="support">
          <JobCards  user={user}/>
        </TabsContent>
        <TabsContent value="writing">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
