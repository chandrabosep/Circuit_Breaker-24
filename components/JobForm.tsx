"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { Calendar } from "@/components/ui/calendar";
import { Landmark } from "lucide-react";
import axios from "axios";
import {
  type UseWriteContractReturnType,
  useAccount,
  useWriteContract,
} from "wagmi";
import { useRouter } from "next/navigation";
import EmployerReview from "./EmployerReview";
import { contractABI } from "@/config/contract";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2),
  category: z.string().min(2).max(50),
  tasks: z.string().min(2),
  delivery: z.string().min(2).max(50),
  reviewDate: z.string().min(2).max(50),
  budget: z.string().min(2).max(50),
});
export default function JobForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      tasks: "",
      delivery: "",
      reviewDate: "",
      budget: "",
    },
  });

  const address = useAccount();

  const router = useRouter();

  const [isEmployer, setIsEmployer] = useState();

  const [Fdate, setFDate] = React.useState<Date | any>(new Date());
  const [Rdate, setRDate] = React.useState<Date | any>(new Date());

  const [Title, setTitle] = React.useState("");
  const [Description, setDescription] = React.useState("");
  const [tasks, setTasks] = React.useState("");

  const [Budget, setBudget] = React.useState("");
  const [FSubmit, setFSubmit] = React.useState<string | any>("");
  const [RSubmit, setRSubmit] = React.useState<string | any>("");

  // const { data, writeContract } = useWriteContract({
  //   address: "0x09c7d95e266ef661416632610cfe77C3AED28892",
  //   abi: contractABI,
  //   functionName: "depositAndSupply",
  //   args: [address.address, 10000000, 8],
  // });

  // console.log(data);

  useEffect(() => {
    async function getEmployer() {
      try {
        const employer = await axios.get(
          "/api/getEmployer?address=" + `${address.address}`
        );
        setIsEmployer(employer.data.employers.id.toString());
      } catch (err) {
        console.log(err);
      }
    }
    getEmployer();
  }, [Title, Description, Budget, FSubmit, RSubmit]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios
        .post("/api/addJob", {
          title: values.title,
          description: values.description,
          category: values.category,
          tasks: values.tasks,
          delivery: values.delivery,
          reviewDate: values.reviewDate,
          budget: values.budget,
          address: `${address.address}`,
        })
        .then(() => {
          router.push("/dashboard?user=employer");
        });
    } catch (err) {
      console.log(err);
    }
  }

  const [toggle, setToggle] = useState("");

  return (
    <div>
      {" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4">
            <h1 className="flex gap-4 text-xl text-green-500 border-[#A5D930] font-semibold border-b-4 pb-3">
              <p className="h-8 w-8 rounded-full bg-grad-magic text-center">
                1
              </p>
              Headline for your Job post
            </h1>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-11/12 m-auto">
                  <FormLabel className="text-base font-semibold">
                    Add a catchy name for your Job Post
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Develop a Defi DashBoard for hamster coins"
                      {...field}
                      onChangeCapture={(e: any) => setTitle(e.target.value)}
                      className="text-dark-800-30 bg-transparent border-dark-800-30"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-11/12 m-auto">
              <h4 className="text-lg font-bold">Example titles:</h4>
              {[
                "Build a responsive dApp to trade Pokemonsta cards.",
                "Design an UI for a cooking social media.",
                "Create a video ad for YouClip Shorts.",
              ].map((e) => (
                <div>
                  <li className="m-0 p-0">{e}</li>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="flex gap-4 text-xl text-green-500 border-[#A5D930] font-semibold border-b-4 pb-3">
              <p className="h-8 w-8 rounded-full bg-grad-magic text-center">
                2
              </p>
              Describefor your Job post
            </h1>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-11/12 m-auto">
                  <FormLabel className="text-base font-semibold">
                    Add a description for your Job post.
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your Job description"
                      {...field}
                      onChangeCapture={(e: any) =>
                        setDescription(e.target.value)
                      }
                      className="text-dark-800-30 bg-transparent border-dark-800-30"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-11/12 m-auto">
              <h4 className="text-lg font-bold">Example Description:</h4>

              <p className="m-0 p-0">
                {`“Looking for an experienced Freelance that can deliver in a
          timely manner a clean and well designed Dashboard, to manage,
          swap and keep tracks of multiple Hamster Coins, we are a team of
          VCs looking to find long term collaborations. Messages are open
          on the global chat”`}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="flex gap-4 text-xl text-green-500 border-[#A5D930] font-semibold border-b-4 pb-3">
              <p className="h-8 w-8 rounded-full bg-grad-magic text-center">
                3
              </p>
              Choose your Job Category
            </h1>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => {
                return (
                  <FormItem className="w-11/12 m-auto">
                    <FormControl {...field}>
                      <ToggleGroup
                        type="multiple"
                        className="flex gap-6 w-8/12 py-4 m-auto flex-wrap"
                      >
                        {[
                          {
                            title: "Admin & Customer Support",
                            value: "customer",
                          },
                          { title: "Sales & Marketing", value: "sales" },
                          { title: "Design & Creative", value: "design" },
                          { title: "AI services", value: "ai" },
                          { title: "Writing & Translation", value: "writing" },
                          { title: "Development & IT", value: "development" },
                        ].map(({ title, value }) => (
                          <ToggleGroupItem
                            {...field}
                            key={value}
                            value={value}
                            aria-label="Toggle"
                            onClick={() => {
                              setToggle(value);
                              field.onChange(value);
                            }}
                          >
                            <p
                              className={`py-2 w-fit px-6 border  rounded-full ${
                                toggle === value
                                  ? "bg-grad-magic border-none"
                                  : "bg-transparent border-dark-800"
                              }`}
                            >
                              {title}
                            </p>
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="flex gap-4 text-xl text-green-500 border-[#A5D930] font-semibold border-b-4 pb-3">
              <p className="h-8 w-8 rounded-full bg-grad-magic text-center">
                4
              </p>
              Describe Tasks
            </h1>
            <p className="w-11/12 m-auto">
              *The freelancer Job will be reviewed based on these tasks. You can
              add as much as you want, keep it straight and clear.
            </p>
            <FormField
              control={form.control}
              name="tasks"
              render={({ field }) => (
                <FormItem className="w-11/12 m-auto">
                  <FormLabel className="text-base font-semibold">
                    Describe the tasks or milestones that makes part of the job{" "}
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <Input
                        placeholder="e.g. Historical for the Hamster Coins swaps"
                        {...field}
                        onChangeCapture={(e: any) => setTasks(e.target.value)}
                        className="text-dark-800-30 bg-transparent border-dark-800-30"
                      />
                      {/* <Button className="px-3 py-1 text-green-500 bg-grad-magic rounded-full shadow-md">
                        Add Task
                      </Button> */}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-11/12 m-auto">
              <h4 className="text-lg font-bold">Example tasks:</h4>
              {[
                "The dashboard should include a graphic on the PnL’s.",
                "It should be yellow and black.",
                "It must include animations of Hamsters.",
              ].map((e) => (
                <div>
                  <li className="m-0 p-0">{e}</li>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="flex gap-4 text-xl text-green-500 border-[#A5D930] font-semibold border-b-4 pb-3">
              <p className="h-8 w-8 rounded-full bg-grad-magic text-center">
                5
              </p>
              Specify Delivery Date
            </h1>
            <FormField
              control={form.control}
              name="delivery"
              render={({ field }) => (
                <FormItem className="w-11/12 m-auto flex">
                  <FormLabel className="text-base w-full ">
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold">
                        Specify the dates the freelancer must deliver the job.
                      </p>
                      <div>
                        <p>To keep in mind:</p>
                        {[
                          "Delivery limit time is 23:59 the chosen date.",
                          "After delivery the freelance job will be reviewed by a group of specialists. (You will choose review limit date on the next step).",
                        ].map((e) => (
                          <li className="m-0 p-0 font-normal w-11/12">{e}</li>
                        ))}
                      </div>
                    </div>
                  </FormLabel>
                  <FormControl className="w-fit">
                    <Calendar
                      {...field}
                      mode="single"
                      selected={Fdate}
                      onSelect={(date) => {
                        setFDate(date);
                        field.onChange(date?.toDateString().toString());
                        setFSubmit(date?.toDateString().toString());
                      }}
                      className="rounded-md border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="flex gap-4 text-xl text-green-500 border-[#A5D930] font-semibold border-b-4 pb-3">
              <p className="h-8 w-8 rounded-full bg-grad-magic text-center">
                6
              </p>
              Specify Review Limit Date
            </h1>
            <FormField
              control={form.control}
              name="reviewDate"
              render={({ field }) => (
                <FormItem className="w-11/12 m-auto flex">
                  <FormLabel className="text-base w-full ">
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold">
                        Specify the dates the specialists should review the
                        freelance Job.
                      </p>
                      <div>
                        <p>To keep in mind:</p>
                        {[
                          "Maximum review limit time is 23:59 the chosen date.",
                          "The reviewers will assess if all the tasks were met for the specific job.",
                          "You can chat with the specialist in the review time.",
                          "The final decision will be made by the reviewers.",
                          "All reviewers are anonym and don’t know the freelance nor the employers.",
                          "   Reviewers are admitted based on their professional achievements. ",
                        ].map((e) => (
                          <li className="m-0 p-0 font-normal w-11/12">{e}</li>
                        ))}
                      </div>
                    </div>
                  </FormLabel>
                  <FormControl className="w-fit">
                    <Calendar
                      {...field}
                      mode="single"
                      selected={Rdate}
                      onSelect={(date) => {
                        setRDate(date);
                        field.onChange(date?.toDateString()?.toString());
                        setRSubmit(date?.toDateString().toString());
                      }}
                      className="rounded-md border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-4 pb-6">
            <h1 className="flex gap-4 text-xl text-green-500 border-[#A5D930] font-semibold border-b-4 pb-3">
              <p className="h-8 w-8 rounded-full bg-grad-magic text-center">
                7
              </p>
              Add the project Budget
            </h1>
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem className="w-11/12 m-auto flex">
                  <FormLabel className="text-base w-full ">
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold">
                        The project Budget will be put on escrow.
                      </p>
                      <div>
                        <p>To keep in mind:</p>
                        {[
                          "The escrowed budget will be kept on an smart contract and will receive interest on it.",
                          "If the reviewers assess that the job was successfully met the money will be released to the Freelancer.",
                          "If the reviewers assess that the freelance failed to deliver the Job the money will be sent back to you.",
                          "The interests received on the escrowed money will be deposited to the reviewers as a payment for their commitment.",
                        ].map((e) => (
                          <li className="m-0 p-0 font-normal w-11/12">{e}</li>
                        ))}
                      </div>
                    </div>
                  </FormLabel>
                  <FormControl className="w-fit">
                    <div className="bg-dark-800 px-3 pt-3 rounded-lg flex flex-col gap-3">
                      <p className="text-[#A5D930] font-semibold text-lg text-center">
                        Specify Budget
                      </p>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type Amount"
                          {...field}
                          onChangeCapture={(e: any) =>
                            setBudget(e.target.value)
                          }
                          className="text-dark-800-30 bg-mint-100 border-dark-800-30"
                        />
                        <p className="text-xl font-semibold text-[#A5D930]">
                          DAI
                        </p>
                      </div>
                      <p className="text-base text-center text-[#A5D930]">
                        1 DAI Token = 1 US Dollar
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-4 pb-8">
            <h1 className="flex gap-4 text-xl text-dark-800 rounded-full bg-grad-magic p-3 font-semibold">
              <p className="h-8 w-8 rounded-full bg-dark-800 text-white text-center">
                8
              </p>
              Review Job Offer and Deposit Escrowed Money
            </h1>
            <EmployerReview
              Title={Title}
              Description={Description}
              RSubmit={RSubmit}
              FSubmit={FSubmit}
              Budget={Budget}
              tasks={tasks}
            />
            <div className="w-full flex">
              <div className="w-1/2 flex flex-col gap-3">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Landmark className="w-6 h-6" />
                  Project Budget
                </h2>
                <p className="p-2.5 px-4 rounded-xl w-fit bg-dark-800 text-[#A5D930] text-2xl font-semibold">
                  {Budget ? Budget : 0} DAI
                </p>
              </div>
              <div className="w-1/2 flex flex-col gap-3 justify-end">
                <Button
                  onClick={() => {
                    // writeContract();
                  }}
                  type="submit"
                  className="py-3 px-4 text-green-500 bg-grad-magic rounded-full shadow-md text-2xl font-semibold"
                >
                  Deposit Budget and Approve Job
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
