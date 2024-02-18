"use client";
import React, { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Textarea } from "./ui/textarea";
import { Sparkles } from "lucide-react";
import { useAccount } from "wagmi";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Identity } from "@semaphore-protocol/identity";
import { addMemberByApiKey } from "@/components/addMemberByApiKey/route";
import { useStore } from "@/context/store";
const { getGroup, getMembersGroup } = require("../utils/bandadaApi");
const { generateProof, verifyProof } = require("@semaphore-protocol/proof");
const { Group } = require("@semaphore-protocol/group");
const {
  encodeBytes32String,
  toBigInt,
  decodeBytes32String,
  toBeHex,
} = require("ethers");
const supabase = require("../utils/supabaseClient");
const { getRoot } = require("../utils/useSemaphore");

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  description: z.string().min(6, {
    message: "Description is to short.",
  }),
});

export default function EmployerModal({
  title,
  icon,
  isReviewer,
}: {
  title: string;
  icon: React.ReactNode;
  isReviewer: boolean;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      description: "",
    },
  });

  const { Reviewer, Freelancer, updateReviewer, updateFreelancer } = useStore();

  const address = useAccount();
  const router = useRouter();
  const apiUrl = isReviewer ? "/api/addReviewer" : "/api/addFreelancer";

  const groupId = "10728579483530049873745301668919";
  const groupApiKey = "ab2518a1-19d8-4e99-b2e9-0c3658b60304";

  async function addMemberToGlobalChat() {
    const identity = new Identity(address.address);
    console.log(identity.toString());

    const commitment = identity.commitment;
    console.log("commitment is:", commitment);
    await addMemberByApiKey(groupId, commitment, groupApiKey);
    
    const bandadaGroup = await getGroup(groupId);
    console.log("Bandada Group Info is:", bandadaGroup);
    
    const getGroupRoot = new Group(
      groupId,
      bandadaGroup.treeDepth,
      bandadaGroup.members
    );
    const groupRoot = getGroupRoot.root;
    console.log("Group Root is:", groupRoot);

    await supabase
      .from("root_history")
      .insert([{ root: groupRoot.toString() }]);

    const users = await getMembersGroup(groupId);
    const group = new Group(groupId, 16, users);
    console.log(group);
    
    // const feedback = "Hellow World";
    // const signal = toBigInt(encodeBytes32String(feedback)).toString();
    // console.log("signal is:", signal);

    // const { proof, merkleTreeRoot, nullifierHash } = await generateProof(
    //   identity,
    //   group,
    //   groupId,
    //   signal,
    //   {
    //     zkeyFilePath: "../semaphore.zkey",
    //     wasmFilePath: "../semaphore.wasm",
    //   }
    // );
    // console.log("merkleTreeRoot is:", merkleTreeRoot);

    // console.log("supabase is:", supabase);

    // const merkleTreeDepth = bandadaGroup.treeDepth;

    // const { data: currentMerkleRoot, error: errorRootHistory } = await supabase
    //   .from("root_history")
    //   .select()
    //   .order("created_at", { ascending: false })
    //   .limit(1);

    // if (merkleTreeRoot !== currentMerkleRoot[0].root) {
    //   // compare merkle tree roots
    //   const { data: dataMerkleTreeRoot, error: errorMerkleTreeRoot } =
    //     await supabase.from("root_history").select().eq("root", merkleTreeRoot);

    //   console.log("dataMerkleTreeRoot", dataMerkleTreeRoot);

    //   const merkleTreeRootDuration = group.fingerprintDuration;
    // }

    // const { data: nullifier, error: errorNullifierHash } = await supabase
    //   .from("nullifier_hash")
    //   .select("nullifier")
    //   .eq("nullifier", nullifierHash);

    // const isVerified = await verifyProof(
    //   {
    //     merkleTreeRoot,
    //     nullifierHash,
    //     externalNullifier: groupId,
    //     signal: signal,
    //     proof,
    //   },
    //   merkleTreeDepth
    // );

    // if (!isVerified) {
    //   const errorLog = "The proof was not verified successfully";
    //   console.error(errorLog);
    //   return;
    // }

    // const { error: errorNullifier } = await supabase
    //   .from("nullifier_hash")
    //   .insert([{ nullifier: nullifierHash }]);

    // const { data: dataFeedback, error: errorFeedback } = await supabase
    //   .from("feedback")
    //   .insert([{ signal: signal }])
    //   .select()
    //   .order("created_at", { ascending: false });

    // if (errorFeedback) {
    //   console.error(errorFeedback);
    //   return;
    // }

    // if (!dataFeedback) {
    //   const errorLog = "Wrong dataFeedback";
    //   console.error(errorLog);
    //   return;
    // }

    // const { data, error } = await supabase
    //   .from("feedback")
    //   .select()
    //   .order("created_at", { ascending: false });

    // if (error) {
    //   throw error;
    // }

    // if (data) {
    //   console.log("Feedbacks:");
    //   // data.forEach((feedbackItem) => {
    //   //   const decodedFeedback = decodeBytes32String(
    //   //     toBeHex(feedbackItem.signal)
    //   //   );
    //   //   console.log(decodedFeedback);
    //   // });
    // }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { username, description } = values;
    try {
      await axios
        .post(apiUrl, {
          address: address.address,
          name: username,
          description: description,
        })
        .then(() => {
          addMemberToGlobalChat();

          {
            isReviewer
              ? (updateReviewer(true), router.push("/jobs?user=reviewer"))
              : (updateFreelancer(true), router.push("/jobs?user=freelancer"));
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="w-9/12 mx-auto justify-center flex items-center absolute bottom-4  px-3 py-1 text-green-500 bg-grad-magic rounded-full shadow-md">
          {icon}Be a {title}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="flex flex-col gap-6">
            <AlertDialogTitle className="text-2xl font-semibold text-center py-2 bg-grad-magic rounded-full">
              Welcome HERO!
            </AlertDialogTitle>
            <div className="flex gap-10 ">
              <div className="w-1/3 py-24 h-fit border-4 text-gray-400 border-gray-400 round border-dashed px-8 ">
                <Input id="picture" type="file" className="text-gray-400" />
              </div>
              <div className="w-2/3 flex flex-col">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            How do you want other Heroes to call you?
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Roaring Kitty"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Add a description for your Profile
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Looking for great feline minds, that are top notch at their jobs"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="float-right items-center flex">
                      <AlertDialogCancel className="px-6 py-1 font-semibold text-green-500 bg-grad-magic rounded-full shadow-md">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction>
                        <Button
                          type="submit"
                          className="px-6 py-1 font-semibold text-green-500 bg-grad-magic rounded-full shadow-md"
                        >
                          <Sparkles className="w-5 h-5 mr-2" />
                          Get started
                        </Button>
                      </AlertDialogAction>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
